import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { IncomeService } from './income.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Income } from './schemas/income.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

//   @UseGuards(JwtAuthGuard)
  @Post()
  async createIncome(
    @Body('amount') amount: number,
    @Body('categoryId') categoryId: any,
    @Body('sourceId') sourceId: any,
    @Body('description') description: string,
    @Req() req: any
  ): Promise<Income> {
    const userId = req.user._id;
    return this.incomeService.createIncome(amount, categoryId, sourceId, description, userId);
  }

//   @UseGuards(JwtAuthGuard)
  @Get()
  async getAllIncomes(@Req() req: any): Promise<Income[]> {
    const userId = req.user._id;
    return this.incomeService.getAllIncomes(userId);
  }

//   @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getIncomeById(@Param('id') id: string): Promise<Income> {
    return this.incomeService.getIncomeById(id);
  }

//   @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateIncome(
    @Param('id') id: string,
    @Body() updateData: Partial<Income>
  ): Promise<Income> {
    return this.incomeService.updateIncome(id, updateData);
  }

//   @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteIncome(@Param('id') id: string): Promise<void> {
    return this.incomeService.deleteIncome(id);
  }
}