import { Public } from '@app/auth/decorators/public.decorator';
import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import esbuild from 'esbuild';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

/**
 * These parts are removed from the minified snippet to make it even smaller,
 * unfortunately, esbuild does not have a way to remove these parts during the build process.
 */
const partsToRemove = ['"use strict";'];

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
      allowOverwrite: true,
      define: {
        BATCH_REPORT_WAIT_TIME_IN_MS: '2000',
        SNIPPET_API_ENDPOINT: `'${process.env.SNIPPET_BEACON_API_URL}'`,
      },
      entryPoints: [snippetPath],
      format: 'iife',
      minify: true,
      outfile: snippetOut,
      platform: 'browser',
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
