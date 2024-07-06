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
          co: CrossOriginDomain[];
          l: PageLoaded;
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
          co: ['https://cross-origin.com'],
          l: true,
        },
      },
    },
  },
};

export class BeaconPayloadDto {
  @ApiProperty({
    allOf: [{ type: 'number' }, { type: 'number' }],
    example: bytesExample,
    maxItems: 2,
    minItems: 2,
    type: 'array',
  })
  @IsInt({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  b: [CompressedBytes, UncompressedBytes];

  @ApiProperty({
    example: byteDataExample,
    oneOf: [
      {
        additionalProperties: {
          additionalProperties: {
            additionalProperties: {
              properties: {
                b: {
                  allOf: [{ type: 'number' }, { type: 'number' }],
                  example: [7584, 91829],
                  maxItems: 2,
                  minItems: 2,
                  type: 'array',
                },
                co: {
                  items: {
                    example: ['https://cross-origin.com'],
                    type: 'string',
                  },
                  type: 'array',
                },
                l: {
                  example: true,
                  type: 'boolean',
                },
              },
              type: 'object',
            },
            type: 'object',
          },
          type: 'object',
        },
        type: 'object',
      },
    ],
    type: 'object',
  })
  @IsDefined()
  d: ByteData;

  @ApiProperty({ enum: ['d', 'l'], example: 'd', type: 'enum' })
  @IsIn(['d', 'l'])
  m: ColorScheme;

  @ApiProperty({
    allOf: [{ type: 'number' }, { type: 'number' }],
    example: viewportExample,
    maxItems: 2,
    minItems: 2,
    type: 'array',
  })
  @IsInt({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  v: Viewport;
}
