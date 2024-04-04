import { Controller, Get, Param } from '@nestjs/common';

import { ServerInstanceService } from './server-instance.service';
import { Client } from '../clients/entities/client.entity';

type GetAllParams = {
  clientId: Client['id'];
};

@Controller('servers/:clientId')
export class ServersController {
  constructor(private serverInstance: ServerInstanceService) {}

  @Get()
  async getAll(@Param() { clientId }: GetAllParams) {
    return this.serverInstance.findAllByClient(clientId);
  }
}
