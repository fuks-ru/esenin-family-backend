import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles, RolesGuard, AuthJwtGuard } from '@fuks-ru/auth-module';

import { PosterUpdateRequest } from 'backend/Poster/dto/PosterUpdateRequest';
import { PosterService } from 'backend/Poster/services/PosterService';
import { PosterResponse } from 'backend/Poster/dto/PosterResponse';
import { PosterAddRequest } from 'backend/Poster/dto/PosterAddRequest';

@ApiTags('poster')
@Controller('poster')
export class PosterController {
  public constructor(private readonly posterService: PosterService) {}

  @Get('/')
  @ApiOperation({
    operationId: 'posterList',
  })
  @ApiOkResponse({
    type: PosterResponse,
    isArray: true,
  })
  public list(): Promise<PosterResponse[]> {
    return this.posterService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    operationId: 'posterGet',
  })
  @ApiOkResponse({
    type: PosterResponse,
  })
  public get(@Param('id') id: string): Promise<PosterResponse> {
    return this.posterService.getById(id);
  }

  @Patch('/:id')
  @ApiOperation({
    operationId: 'posterUpdate',
  })
  @ApiOkResponse({
    type: PosterResponse,
  })
  @Roles('moderator', 'admin')
  @UseGuards(AuthJwtGuard, RolesGuard)
  public update(
    @Body() body: PosterUpdateRequest,
    @Param('id') id: string,
  ): Promise<PosterResponse> {
    return this.posterService.save({
      ...body,
      id,
    });
  }

  @ApiOperation({
    operationId: 'posterAdd',
  })
  @ApiOkResponse({
    type: PosterAddRequest,
  })
  @Post('/')
  @Roles('moderator', 'admin')
  @UseGuards(AuthJwtGuard, RolesGuard)
  public async add(@Body() body: PosterAddRequest): Promise<PosterResponse> {
    return this.posterService.save(body);
  }

  @ApiOperation({
    operationId: 'posterDelete',
  })
  @Delete('/:id')
  @Roles('moderator', 'admin')
  @UseGuards(AuthJwtGuard, RolesGuard)
  public delete(@Param('id') id: string): Promise<void> {
    return this.posterService.deleteById(id);
  }
}
