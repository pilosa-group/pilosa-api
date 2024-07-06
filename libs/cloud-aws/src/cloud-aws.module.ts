import { Module } from '@nestjs/common';

import { CloudAwsService } from './cloud-aws.service';

@Module({
  providers: [CloudAwsService],
})
export class CloudAwsModule {}
