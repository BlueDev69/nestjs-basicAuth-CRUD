import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import * as mongoose from 'mongoose';
import {
  IAgentLogin,
  IAgentRegister,
  RoleAccount,
} from './agent-auth.interface';

import validator from 'validator';
import { Settings } from 'http2';
export const AgentAuthSchema = new mongoose.Schema(
  {
    first_name: {
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

    image: {
      type: String,
    },

    position: {
      type: String,
    },

    role: {
      type: String,
    },

    mac: {
      type: String,
    },

    created: {
      type: Date,
      default: Date.now,
    },

    updated: {
      type: Date,
      default: Date.now,
    },
  },
  { toObject: { virtuals: true } },
);

export class AgentAuthLoginModel implements IAgentLogin {
  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  // mac:
}

export class AgentAuthRegisterModel implements IAgentRegister {
  @ApiProperty({ type: String, description: 'firstName' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ type: String, description: 'lastName' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ type: String, description: 'phone' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ type: String, description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: String, description: 'position' })
  position?: string;
  @ApiProperty({ type: String, description: 'image' })
  @IsEmpty()
  image: string;
  @ApiProperty({ type: String, description: 'role' })
  role?: RoleAccount;
  @ApiProperty({ type: String, description: 'created' })
  created?: Date;
  @ApiProperty({ type: String, description: 'updated' })
  updated?: Date;
}

export class AgentModel implements IAgentRegister {
  first_name: string;
  last_name: string;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  mac: string;
}
