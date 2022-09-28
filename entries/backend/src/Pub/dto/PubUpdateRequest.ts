import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PubUpdateRequest {
  @ApiProperty()
  @IsString()
  public name!: string;

  @ApiProperty()
  @IsString()
  public logo!: string;
}
