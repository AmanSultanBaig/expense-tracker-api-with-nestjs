import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ExpenseModule } from './expense/expense.module';
import { CategoryModule } from './category/category.module';
import { SourceModule } from './source/source.module';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
