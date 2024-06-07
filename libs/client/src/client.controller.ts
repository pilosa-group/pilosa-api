import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientsService: ClientService) {}

  @Get()
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientsService.findOne(id);

    if (!client) {
      throw new NotFoundException(`Client ${id} not found`);
    }

    return client;
  }
}
