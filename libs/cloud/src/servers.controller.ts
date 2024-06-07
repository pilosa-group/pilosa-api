import { Controller, Get, Param } from '@nestjs/common';
import { ServerInstanceService } from './server-instance.service';
import { Project } from '@app/project/entities/project.entity';

type GetAllParams = {
  projectId: Project['id'];
};

@Controller('servers/:projectId')
export class ServersController {
  constructor(private serverInstance: ServerInstanceService) {}

  @Get()
  async getAll(@Param() { projectId }: GetAllParams) {
    return this.serverInstance.findAllByProject(projectId);
  }
}
