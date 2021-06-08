import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GrantRoleDto } from './dto/grant-role.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'creation of user for authorized users=))' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'grant a role' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post('/role')
  grantRole(@Body() dto: GrantRoleDto) {
    return this.usersService.grantRole(dto);
  }

  @ApiOperation({ summary: 'ban a user' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
