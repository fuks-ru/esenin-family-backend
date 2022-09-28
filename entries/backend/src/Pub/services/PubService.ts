import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SystemErrorFactory } from '@fuks-ru/common-backend';

import { Pub } from 'backend/Pub/entities/Pub';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class PubService {
  public constructor(
    @InjectRepository(Pub) private readonly pubRepository: Repository<Pub>,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public getAll(): Promise<Pub[]> {
    return this.pubRepository.find();
  }

  public async getById(id: string): Promise<Pub> {
    const pub = await this.pubRepository.findOneBy({
      id,
    });

    if (pub) {
      return pub;
    }

    throw this.systemErrorFactory.create(
      ErrorCode.PUB_NOT_FOUND,
      'Бар не найден',
    );
  }

  public add(pub: Pub): Promise<Pub> {
    return this.pubRepository.save(pub);
  }

  public update(pub: Pub): Promise<Pub> {
    return this.pubRepository.save(pub);
  }

  public async deleteById(id: string): Promise<void> {
    await this.pubRepository.delete({
      id,
    });
  }
}
