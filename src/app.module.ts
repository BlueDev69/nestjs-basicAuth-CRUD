import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AgentAuthModule } from './agent-auth/agent-auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      // process.env.MONGODB_URL,
      `mongodb+srv://kittanat:8rGkDvgVDI6HbL1m@cluster1.cxq59.mongodb.net/test?retryWrites=true&w=majority`,
    ),
    AgentAuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
