import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserInfoDto } from './dtos/user-info.dto';

@Injectable()
export class UsersService {
  getUserInfo(user: User): UserInfoDto {
    delete user.password;
    return user;
  }
}
