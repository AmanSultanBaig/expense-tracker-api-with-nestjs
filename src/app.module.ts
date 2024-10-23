import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';
import { SourceModule } from './source/source.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
          format: winston.format.json(),
        }),
        new winston.transports.File({
          filename: 'combined.log',
          format: winston.format.json(),
        }),
      ],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    ExpenseModule,
    CategoryModule,
    SourceModule,
    IncomeModule,
    AuthModule,
  ],
})
export class AppModule {}
