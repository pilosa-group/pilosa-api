import { Domain } from '@app/web-metrics/entities/domain.entity';

export class CreatePathDto {
  domain: Domain;
  path: string;
}
