// import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';

export class GrantRoleDto {
  // @ApiProperty({example: 'any@tttttt.com', description: 'email'})
  @IsString({ message: 'must be a string' })
  readonly value: string;
  // @ApiProperty({example: '12345678', description: 'password'})
  @IsNumber({}, { message: 'must be a number' })
  readonly userId: number;
}
