import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiGatewayTimeoutResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './user.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'Get User successfully' })
  @ApiUnauthorizedResponse({ description: 'Invaild credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request Response' })
  @ApiGatewayTimeoutResponse({ description: 'Gateway Timeout' })
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Post()
  @ApiOkResponse({ description: 'create user successfully' })
  @ApiUnauthorizedResponse({ description: 'Invaild credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request Response' })
  @ApiGatewayTimeoutResponse({ description: 'Gateway Timeout' })
  @ApiBody({ type: CreateUserDto })
  async addUser(@Body() body: CreateUserDto) {
    const generatedId = await this.usersService.insertUser(body);
    return { data: generatedId };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get User by ID successfully' })
  @ApiUnauthorizedResponse({ description: 'Invaild credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request Response' })
  @ApiGatewayTimeoutResponse({ description: 'Gateway Timeout' })
  getSingleUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  @ApiBody({ type: CreateUserDto })
  async updateUser(@Param('id') userId: string, @Body() body: CreateUserDto) {
    const updateRes = await this.usersService.updateUser(userId, body);
    return { data: updateRes };
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete User by ID successfully' })
  @ApiUnauthorizedResponse({ description: 'Invaild credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request Response' })
  @ApiGatewayTimeoutResponse({ description: 'Gateway Timeout' })
  async removeProduct(@Param('id') userId: string) {
    const deleteRes = await this.usersService.deleteUser(userId);
    return deleteRes;
  }
}
