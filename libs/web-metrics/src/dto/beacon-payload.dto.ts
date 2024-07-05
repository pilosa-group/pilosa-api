import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDefined,
  IsIn,
  IsInt,
} from 'class-validator';

export type InitiatorType = string;
export type IsCompressed = boolean;
export type Domain = string;
export type CrossOriginDomain = string;
export type Path = string;
export type NumberOfBytes = number;
export type FileExtension = string;
export type Dark = 'd';
export type Light = 'l';
export type ColorScheme = Dark | Light;
export type CompressedBytes = NumberOfBytes;
export type UncompressedBytes = NumberOfBytes;
export type PageLoaded = boolean;
export type Viewport = [number, number];

export type ByteData = {
  [key: Domain]: {
    [key: Path]: {
      [key: InitiatorType]: {
        [key: FileExtension]: {
          b: [CompressedBytes, UncompressedBytes];
          l: PageLoaded;
          co: CrossOriginDomain[];
        };
      };
    };
  };
};

const bytesExample: [CompressedBytes, UncompressedBytes] = [7584, 91829];
const viewportExample: Viewport = [1920, 1080];
const byteDataExample: ByteData = {
  'example.com': {
    '/': {
      script: {
        js: {
          b: bytesExample,
          l: true,
          co: ['https://cross-origin.com'],
        },
      },
    },
  },
};

export class BeaconPayloadDto {
  @ApiProperty({ type: 'enum', enum: ['d', 'l'], example: 'd' })
  @IsIn(['d', 'l'])
  m: ColorScheme;

  @ApiProperty({
    type: 'array',
    minItems: 2,
    maxItems: 2,
    allOf: [{ type: 'number' }, { type: 'number' }],
    example: bytesExample,
  })
  @IsInt({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  b: [CompressedBytes, UncompressedBytes];

  @ApiProperty({
    type: 'array',
    minItems: 2,
    maxItems: 2,
    allOf: [{ type: 'number' }, { type: 'number' }],
    example: viewportExample,
  })
  @IsInt({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  v: Viewport;

  @ApiProperty({
    type: 'object',
    oneOf: [
      {
        type: 'object',
        additionalProperties: {
          type: 'object',
          additionalProperties: {
            type: 'object',
            additionalProperties: {
              type: 'object',
              properties: {
                b: {
                  type: 'array',
                  minItems: 2,
                  maxItems: 2,
                  allOf: [{ type: 'number' }, { type: 'number' }],
                  example: [7584, 91829],
                },
                l: {
                  type: 'boolean',
                  example: true,
                },
                co: {
                  type: 'array',
                  items: {
                    type: 'string',
                    example: ['https://cross-origin.com'],
                  },
                },
              },
            },
          },
        },
      },
    ],
    example: byteDataExample,
  })
  @IsDefined()
  d: ByteData;
}
