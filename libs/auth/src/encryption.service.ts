import { scrypt, createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { promisify } from 'util';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EncryptionConfig } from '../../../apps/project-green-nest/src/config/configuration';

const iv = randomBytes(16);
const algorithm = 'aes-256-ctr';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  async encrypt(text: string): Promise<Buffer> {
    const key = await this.getKey();

    const cipher = createCipheriv(algorithm, key, iv);

    return Buffer.concat([cipher.update(text), cipher.final()]);
  }

  async decrypt(text: Buffer) {
    const key = await this.getKey();

    const decipher = createDecipheriv(algorithm, key, iv);

    return Buffer.concat([decipher.update(text), decipher.final()]);
  }

  private async getKey() {
    const { password, salt } =
      this.configService.get<EncryptionConfig>('encryption');

    console.log({ password, salt });

    return (await promisify(scrypt)(password, salt, 32)) as Buffer;
  }
}
