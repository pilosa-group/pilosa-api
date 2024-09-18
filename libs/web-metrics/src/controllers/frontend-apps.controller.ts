import { TransformerService } from '@app/api/transformer.service';
import { CurrentUser } from '@app/user/decorators/current-user.decorator';
import { UserDto } from '@app/user/dto/user.dto';
import { FrontendAppDto } from '@app/web-metrics/dto/frontend-app.dto';
import { FrontendApp } from '@app/web-metrics/entities/frontend-app.entity';
import { FrontendAppService } from '@app/web-metrics/frontend-app.service';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Frontend Applications')
@Controller('frontend-apps')
export class FrontendAppsController {
  constructor(
    private frontendAppService: FrontendAppService,
    private transformerService: TransformerService,
  ) {}

  @Get(':id')
  @ApiResponse({
    description: 'Get a frontend application',
    status: 200,
    type: FrontendAppDto,
  })
  @ApiOperation({
    operationId: 'getFrontendApp',
    summary: 'Get a frontend application',
  })
  async getFrontendApp(
    @Param('id') id: string,
    @CurrentUser() user: UserDto,
  ): Promise<FrontendAppDto> {
    const frontendApp = await this.frontendAppService.findOneById(id, user);

    if (!frontendApp) {
      throw new NotFoundException();
    }

    return this.transformerService.entityToDto<FrontendApp, FrontendAppDto>(
      frontendApp,
      FrontendAppDto,
    );
  }
}
