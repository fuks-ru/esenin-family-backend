import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Pub } from 'backend/Pub/entities/Pub';
import { dateTimeType } from 'backend/constants';

@Entity('posters')
export class Poster {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @ManyToOne(() => Pub, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'pubId' })
  public pub!: Pub;

  @Column()
  public pubId!: string;

  // https://github.com/typeorm/typeorm/issues/5820
  @Column({
    type: dateTimeType,
    transformer: {
      from: (value?: string | Date): string | undefined => {
        if (!value || typeof value === 'string') {
          return undefined;
        }

        return value.toISOString();
      },
      to: (value?: string): string | Date | undefined => {
        if (!value || dateTimeType === 'datetime') {
          return value;
        }

        return new Date(value);
      },
    },
  })
  public date!: string;

  @Column()
  public description?: string;

  @Column()
  public image!: string;
}
