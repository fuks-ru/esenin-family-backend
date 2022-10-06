import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PubUpdateRequest {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Название не должно быть пустым.',
  })
  public name!: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Лого не должно быть пустым.',
  })
  public logo!: string;
}
