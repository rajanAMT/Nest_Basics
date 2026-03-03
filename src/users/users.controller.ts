import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  createUser(@Body('name') name: string) {
    return this.usersService.create(name);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body('name') name: string) {
    return this.usersService.update(Number(id), name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }
}
