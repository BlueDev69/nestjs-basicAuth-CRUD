import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import * as mongoose from 'mongoose';

import validator from 'validator';
export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },

  last_name: {
    type: String,
    required: [true, 'Please enter your last name'],
  },

  email: {
    type: String,
    required: [true, 'Please enter your email'],
    validate: [validator.isEmail, 'Please enter valid email address'],
  },

  password: {
    type: String,
    minlength: [6, 'Your password must be at least 6 characters long'],
    required: [true, 'Please enter your password'],
  },

  phone: {
    type: String,
    required: [true, 'Please enter your phone number'],
  },
});

export class User {
  id: any;
  constructor(
    public name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public phone: string,
  ) {}
}

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'email' })
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String, description: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'last_name' })
  @IsString()
  last_name: string;

  @ApiProperty({ type: String, description: 'phone' })
  @IsString()
  phone: string;

  //   @ApiProperty({ enum: RoleEnum, default: [], isArray: true })
  //   roles: RoleEnum[] = [];

  //   @ApiProperty({ required: false, default: true })
  //   isEnabled?: boolean = true;
}

export class LoginDTO {
  @IsEmail()
  @IsString()
  @MinLength(4)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty()
  password: string;
}

export interface UserResponse {
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}
export interface AuthResponse extends UserResponse {
  token: string;
}
