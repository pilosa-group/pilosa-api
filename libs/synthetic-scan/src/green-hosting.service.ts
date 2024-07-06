import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { hosting } from '@tgwf/co2';
import { Cache } from 'cache-manager';

@Injectable()
export class GreenHostingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async isGreenHost(domain: string): Promise<boolean> {
    const cachedResult = await this.cacheManager.get<boolean>(domain);

    if (cachedResult !== undefined) {
      return cachedResult;
    }

    const isGreen = (await hosting.check(domain)) as boolean;

    await this.cacheManager.set(domain, isGreen, 60 * 60 * 24);

    return isGreen;
  }
}
