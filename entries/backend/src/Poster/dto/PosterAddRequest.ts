import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class PosterAddRequest {
  @ApiProperty()
  @IsUUID()
  public id!: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Название не должно быть пустым.',
  })
  public name!: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Выберите бар.',
  })
  public pub!: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Выберите дату.',
  })
  public date!: string;

  @ApiProperty()
  @IsOptional()
  public description?: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Изображение не должно быть пустым.',
  })
  public image!: string;
}
