import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Rajan' },
    { id: 2, name: 'Amit' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(name: string) {
    const newUser = {
      id: Date.now(),
      name,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, name: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.name = name;
    return user;
  }

  delete(id: number) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = this.users[index];
    this.users.splice(index, 1);

    return {
      message: 'User deleted successfully',
      deletedUser,
    };
  }
}
