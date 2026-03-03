import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Rajan' },
    { id: 2, name: 'Amit' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(name: string): User {
    const newUser: User = {
      id: Date.now(),
      name,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, name?: string): User {
    const user = this.findOne(id);

    if (name) {
      user.name = name;
    }

    return user;
  }

  delete(id: number): { message: string } {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);

    return { message: 'User deleted successfully' };
  }
}
