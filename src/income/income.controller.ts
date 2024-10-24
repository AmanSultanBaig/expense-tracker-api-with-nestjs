import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req } from '@nestjs/common';
import { IncomeService } from './income.service';
import { Income } from './schemas/income.schema';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new income' })
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
  @ApiResponse({ status: 201, description: 'Income created successfully.' })
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

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllIncomes(@Req() req: any): Promise<Income[]> {
    const userId = req.user._id;
    return this.incomeService.getAllIncomes(userId);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getIncomeById(@Param('id') id: string): Promise<Income> {
    return this.incomeService.getIncomeById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async updateIncome(
    @Param('id') id: string,
    @Body() updateData: Partial<Income>
  ): Promise<Income> {
    return this.incomeService.updateIncome(id, updateData);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteIncome(@Param('id') id: string): Promise<void> {
    return this.incomeService.deleteIncome(id);
  }
}
