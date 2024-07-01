import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ServerInstanceService } from './server-instance.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Infrastructure')
@Controller('servers/:projectId')
export class ServersController {
  constructor(private serverInstance: ServerInstanceService) {}

  @Get()
  async getAll(@Param('organizationId', ParseUUIDPipe) projectId: string) {
    return this.serverInstance.findAllByProject(projectId);
  }
}
