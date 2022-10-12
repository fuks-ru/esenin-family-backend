import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public, Roles } from '@fuks-ru/auth-module';

import { Pub } from 'backend/Pub/entities/Pub';
import { PubService } from 'backend/Pub/services/PubService';
import { PubUpdateRequest } from 'backend/Pub/dto/PubUpdateRequest';

@ApiTags('pub')
@Controller('pub')
export class PubController {
  public constructor(private readonly pubService: PubService) {}

  @Get('/')
  @ApiOperation({
    operationId: 'pubList',
  })
  @ApiOkResponse({
    type: Pub,
    isArray: true,
  })
  @Public()
  public list(): Promise<Pub[]> {
    return this.pubService.getAll();
  }

  @Get('/:id')
  @ApiOperation({
    operationId: 'pubGet',
  })
  @ApiOkResponse({
    type: Pub,
  })
  @Public()
  public get(@Param('id') id: string): Promise<Pub> {
    return this.pubService.getById(id);
  }

  @Patch('/:id')
  @ApiOperation({
    operationId: 'pubUpdate',
  })
  @ApiOkResponse({
    type: Pub,
  })
  @Roles('moderator', 'admin')
  public update(
    @Body() body: PubUpdateRequest,
    @Param('id') id: string,
  ): Promise<Pub> {
    return this.pubService.update({
      ...body,
      id,
    });
  }

  @ApiOperation({
    operationId: 'pubAdd',
  })
  @ApiOkResponse({
    type: Pub,
  })
  @Post('/')
  @Roles('moderator', 'admin')
  public add(@Body() body: Pub): Promise<Pub> {
    return this.pubService.add(body);
  }

  @ApiOperation({
    operationId: 'pubDelete',
  })
  @Delete('/:id')
  @Roles('moderator', 'admin')
  public delete(@Param('id') id: string): Promise<void> {
    return this.pubService.deleteById(id);
  }
}
