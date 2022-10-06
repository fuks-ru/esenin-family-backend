import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Entity('pubs')
export class Pub {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  @IsUUID()
  public id!: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty({
    message: 'Название не должно быть пустым.',
  })
  public name!: string;

  @Column()
  @ApiProperty()
  @IsNotEmpty({
    message: 'Лого не должно быть пустым.',
  })
  public logo!: string;
}
