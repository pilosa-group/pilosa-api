import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordHashService {
  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(text, salt);
  }

  compare(text: string, hash: string): Promise<boolean> {
    return bcrypt.compare(text, hash);
  }
}
