import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
@Controller('api')
export class UserController {
    constructor (private readonly userService:UserService){}
  @Post('user/:id')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
      return this.userService.create(user)
  }
}
