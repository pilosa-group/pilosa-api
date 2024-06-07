import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import esbuild from 'esbuild';
import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';
import { Public } from '@app/auth/decorators/public.decorator';
import { Response } from 'express';

const readFile = util.promisify(fs.readFile);

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
      platform: 'browser',
      outfile: snippetOut,
      define: {
        SNIPPET_API_ENDPOINT: `'${process.env.SNIPPET_BEACON_API_URL}'`,
        BATCH_REPORT_WAIT_TIME_IN_MS: '500',
      },
    });

    const snippetContents = await readFile(snippetOut, 'utf8');

    return res
      .setHeader('Content-Type', 'text/javascript')
      .setHeader('Cache-Control', `public, max-age=60`)
      .setHeader('Timing-Allow-Origin', '*')
      .status(HttpStatus.OK)
      .send(snippetContents);
  }
}
