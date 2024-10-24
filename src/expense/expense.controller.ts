import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './schemas/expense.schema';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/category/schemas/category.schema';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        categoryId: { type: 'string' },
        sourceId: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })  
  @ApiResponse({ status: 201, description: 'Expense created successfully.' })
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

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllExpenses(@Req() req: any): Promise<Expense[]> {
    const userId = req.user._id;
    return this.expenseService.getAllExpenses(userId);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getExpenseById(@Param('id') id: string): Promise<Expense> {
    return this.expenseService.getExpenseById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body() updateData: Partial<Expense>
  ): Promise<Expense> {
    return this.expenseService.updateExpense(id, updateData);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteExpense(@Param('id') id: string): Promise<void> {
    return this.expenseService.deleteExpense(id);
  }
}
