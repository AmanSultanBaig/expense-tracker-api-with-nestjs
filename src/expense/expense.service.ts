import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense, ExpenseDocument } from './schemas/expense.schema';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<ExpenseDocument>,
  ) {}

  async createExpense(
    amount: number,
    categoryId: Types.ObjectId,
    sourceId: Types.ObjectId,
    description: string,
    userId: Types.ObjectId
  ): Promise<Expense> {
    const expense = new this.expenseModel({
      amount,
      categoryId,
      sourceId,
      description,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return expense.save();
  }

  async getAllExpenses(userId: Types.ObjectId): Promise<Expense[]> {
    return this.expenseModel
      .find({ userId })
      .populate('categoryId', 'name')
      .populate('sourceId', 'name')
      .exec();
  }

  async getExpenseById(id: string): Promise<Expense> {
    return this.expenseModel
      .findById(id)
      .populate('categoryId', 'name')
      .populate('sourceId', 'name')
      .exec();
  }

  async updateExpense(id: string, updateData: Partial<Expense>): Promise<Expense> {
    const expense = await this.expenseModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!expense) {
      throw new NotFoundException('Expense not found.');
    }
    return expense;
  }

  async deleteExpense(id: string): Promise<void> {
    const result = await this.expenseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Expense not found.');
    }
  }
}
