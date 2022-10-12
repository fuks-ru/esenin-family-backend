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
  @Public()
  public async list(): Promise<PosterResponse[]> {
    const posters = await this.posterService.getAll();

    return posters.map((poster) => ({
      ...poster,
      pub: poster.pub.id,
    }));
  }

  @Get('/:id')
  @ApiOperation({
    operationId: 'posterGet',
  })
  @ApiOkResponse({
    type: PosterResponse,
  })
  @Public()
  public async get(@Param('id') id: string): Promise<PosterResponse> {
    const poster = await this.posterService.getById(id);

    return {
      ...poster,
      pub: poster.pub.id,
    };
  }

  @Patch('/:id')
  @ApiOperation({
    operationId: 'posterUpdate',
  })
  @ApiOkResponse({
    type: PosterResponse,
  })
  @Roles('moderator', 'admin')
  public async update(
    @Body() body: PosterUpdateRequest,
    @Param('id') id: string,
  ): Promise<PosterResponse> {
    const poster = await this.posterService.save({
      ...body,
      pub: {
        id: body.pub,
      },
      id,
    });

    return {
      ...poster,
      pub: poster.pub.id,
    };
  }

  @ApiOperation({
    operationId: 'posterAdd',
  })
  @ApiOkResponse({
    type: PosterAddRequest,
  })
  @Post('/')
  @Roles('moderator', 'admin')
  public async add(@Body() body: PosterAddRequest): Promise<PosterResponse> {
    const poster = await this.posterService.save({
      ...body,
      pub: {
        id: body.id,
      },
    });

    return {
      ...poster,
      pub: poster.pub.id,
    };
  }

  @ApiOperation({
    operationId: 'posterDelete',
  })
  @Delete('/:id')
  @Roles('moderator', 'admin')
  public delete(@Param('id') id: string): Promise<void> {
    return this.posterService.deleteById(id);
  }
}
