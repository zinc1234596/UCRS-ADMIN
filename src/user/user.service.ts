import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoRepository } from 'typeorm';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const res = await this.userRepository.save(createUserDto);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  }
}
