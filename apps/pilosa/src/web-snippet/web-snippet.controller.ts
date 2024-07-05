import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import esbuild from 'esbuild';
import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { Public } from '@app/auth/decorators/public.decorator';
import { Response } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';

const readFile = util.promisify(fs.readFile);

/**
 * These parts are removed from the minified snippet to make it even smaller,
 * unfortunately, esbuild does not have a way to remove these parts during the build process.
 */
const partsToRemove = [
  '"use strict";',
  'var v=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports);',
  'var A=v(S=>{Object.defineProperty(S,"__esModule",{value:!0});',
  '});A();',
];

@ApiExcludeController()
@Controller('sloth.js')
export class WebSnippetController {
  @Get()
  @Public()
  @Header('Content-Type', 'text/javascript')
  async snippet(@Res() res: Response) {
    const currentDir = path.resolve(__dirname);
    const snippetPath = path.resolve(currentDir, 'web-snippet-injectable.js');
    const snippetOut = path.resolve(
      currentDir,
      'web-snippet-injectable-minified.js',
    );

    await esbuild.build({
      entryPoints: [snippetPath],
      minify: true,
      allowOverwrite: true,
      format: 'iife',
      platform: 'browser',
      outfile: snippetOut,
      define: {
        SNIPPET_API_ENDPOINT: `'${process.env.SNIPPET_BEACON_API_URL}'`,
        BATCH_REPORT_WAIT_TIME_IN_MS: '2000',
      },
    });

    let snippetContents = await readFile(snippetOut, 'utf8');

    for (const part of partsToRemove) {
      snippetContents = snippetContents.replace(part, '');
    }

    return res
      .setHeader('Content-Type', 'text/javascript')
      .setHeader('Cache-Control', `public, max-age=60`)
      .setHeader('Timing-Allow-Origin', '*')
      .setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
      .status(HttpStatus.OK)
      .send(snippetContents);
  }
}
