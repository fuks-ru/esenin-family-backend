import { ApiProperty } from '@nestjs/swagger';

export class PosterResponse {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public pub!: string;

  @ApiProperty()
  public date!: string;

  @ApiProperty()
  public description?: string;

  @ApiProperty()
  public image!: string;
}
