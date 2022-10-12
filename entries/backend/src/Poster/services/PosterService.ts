import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SystemErrorFactory } from '@fuks-ru/common-backend';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { Poster } from 'backend/Poster/entities/Poster';

@Injectable()
export class PosterService {
  public constructor(
    @InjectRepository(Poster)
    private readonly posterRepository: Repository<Poster>,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public getAll(): Promise<Poster[]> {
    return this.posterRepository.find({
      relations: {
        pub: true,
      },
    });
  }

  public async getById(id: string): Promise<Poster> {
    const poster = await this.posterRepository.findOneBy({
      id,
    });

    if (poster) {
      return poster;
    }

    throw this.systemErrorFactory.create(
      ErrorCode.POSTER_NOT_FOUND,
      'Афиша не найдена',
    );
  }

  public save(poster: DeepPartial<Poster>): Promise<Poster> {
    return this.posterRepository.save(poster);
  }

  public async deleteById(id: string): Promise<void> {
    await this.posterRepository.delete({
      id,
    });
  }
}
