import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class PosterUpdateRequest {
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
  @Optional()
  public description?: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Изображение не должно быть пустым.',
  })
  public image!: string;
}
