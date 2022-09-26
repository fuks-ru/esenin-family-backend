import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pubs')
export class Pub {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id!: string;

  @Column()
  @ApiProperty()
  public name!: string;

  @Column()
  @ApiProperty()
  public logo!: string;
}
