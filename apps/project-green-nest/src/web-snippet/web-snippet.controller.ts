import { Controller, Get, Header } from '@nestjs/common';
import esbuild from 'esbuild';
import * as util from 'util';
import * as path from 'path';
import * as fs from 'fs';

const readFile = util.promisify(fs.readFile);

@Controller('snippet.js')
export class WebSnippetController {
  @Get()
  @Header('Content-Type', 'text/javascript')
  async snippet() {
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
        BATCH_REPORT_WAIT_TIME_IN_MS: '2000',
      },
    });

    return readFile(snippetOut, 'utf8');
  }
}