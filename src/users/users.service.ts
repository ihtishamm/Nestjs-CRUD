/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '1122',
    },
    {
      userId: 2,
      username: 'maria',
      password: '1122',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
