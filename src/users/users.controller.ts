import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET ALL USERS
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Users retrieved successfully',
  })
  @Get()
  getUsers(): { success: boolean; data: User[] } {
    return {
      success: true,
      data: this.usersService.findAll(),
    };
  }

  // GET USER BY ID
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): {
    success: boolean;
    data: User;
  } {
    return {
      success: true,
      data: this.usersService.findOne(id),
    };
  }

  // CREATE USER
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): {
    success: boolean;
    data: User;
  } {
    return {
      success: true,
      data: this.usersService.create(createUserDto.name),
    };
  }

  // UPDATE USER
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): { success: boolean; data: User } {
    return {
      success: true,
      data: this.usersService.update(id, updateUserDto),
    };
  }

  // DELETE USER
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): {
    success: boolean;
    message: string;
  } {
    const result = this.usersService.delete(id);

    return {
      success: true,
      message: result.message,
    };
  }
}
