import { Module } from '@nestjs/common';
import { PaginatorService } from './paginator.service';
import { TransformerService } from '@app/api/transformer.service';

@Module({
  providers: [PaginatorService, TransformerService],
  exports: [PaginatorService, TransformerService],
})
export class ApiModule {}
