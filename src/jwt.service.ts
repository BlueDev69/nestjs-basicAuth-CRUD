import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { IAccount, IAuthen } from './agent-auth/agent-auth.interface';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtService implements IAuthen {
  constructor(@InjectModel('Agent') private AgentModel: Model<IAccount>) {}
  private secretKey = process.env.SALT;

  async generateAccessToken(member: IAccount) {
    const payload = { email: member.email };
    return sign(payload, this.secretKey, { expiresIn: 60 * 60 });
  }

  // ยืนยันตัวตน
  async validateUser({ email }): Promise<IAccount> {
    try {
      return this.AgentModel.findOne({ email });
    } catch (e) {}
    return null;
  }
}

@Injectable()
export class JwtAuthenStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SALT,
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async validate(payload: { email: string }, done: Function) {
    const user = await this.jwtService.validateUser(payload);
    if (!user) {
      return done(
        new UnauthorizedException('Unauthorized please login!'),
        false,
      );
    }
    done(null, user);
  }
}
