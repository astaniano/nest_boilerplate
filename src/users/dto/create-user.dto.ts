import { ApiProperty } from "@nestjs/swagger";

export class createUserDto {
    @ApiProperty({example: 'any@tttttt.com', description: 'email'})
    readonly email: string;
    @ApiProperty({example: '12345678', description: 'password'})
    readonly password: string;
}
