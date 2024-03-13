import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const client = this.clientsService.findOne(id);

    if (!client) {
      throw new NotFoundException(`Client ${id} not found`);
    }

    return client;
  }
}
