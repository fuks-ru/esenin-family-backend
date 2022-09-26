import { ApiProperty } from '@nestjs/swagger';

export class PubUpdateRequest {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public logo!: string;
}
