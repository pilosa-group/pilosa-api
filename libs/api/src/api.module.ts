import { TransformerService } from '@app/api/transformer.service';
import { Module } from '@nestjs/common';

import { PaginatorService } from './paginator.service';

@Module({
  exports: [PaginatorService, TransformerService],
  providers: [PaginatorService, TransformerService],
})
export class ApiModule {}
