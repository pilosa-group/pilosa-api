import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsResolver } from '@app/project/graphql/resolvers/projects.resolver';
import { Project } from '@app/project/entities/project.entity';

@Module({
  providers: [ProjectService, ProjectsResolver],
  exports: [ProjectService],
  imports: [TypeOrmModule.forFeature([Project])],
})
export class ProjectModule {}
