import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { ExpenseService } from './expense.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Expense } from './schemas/expense.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

//   @UseGuards(JwtAuthGuard)
  @Post()
  async createExpense(
    @Body('amount') amount: number,
    @Body('categoryId') categoryId: any,
    @Body('sourceId') sourceId: any,
    @Body('description') description: string,
    @Req() req: any
  ): Promise<Expense> {
    const userId = req.user._id;
    return this.expenseService.createExpense(amount, categoryId, sourceId, description, userId);
  }

//   @UseGuards(JwtAuthGuard)
  @Get()
  async getAllExpenses(@Req() req: any): Promise<Expense[]> {
    const userId = req.user._id;
    return this.expenseService.getAllExpenses(userId);
  }

//   @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getExpenseById(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.getExpenseById(id);
  }

//   @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body() updateData: Partial<Expense>
  ): Promise<Expense> {
    return this.expenseService.updateExpense(id, updateData);
  }

//   @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteExpense(@Param('id') id: string): Promise<void> {
    return this.expenseService.deleteExpense(id);
  }
}