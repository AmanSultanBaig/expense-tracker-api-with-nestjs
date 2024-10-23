import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Income, IncomeDocument } from './schemas/income.schema';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name) private incomeModel: Model<IncomeDocument>,
  ) {}

  async createIncome(
    amount: number,
    categoryId: Types.ObjectId,
    sourceId: Types.ObjectId,
    description: string,
    userId: Types.ObjectId
  ): Promise<Income> {
    const income = new this.incomeModel({
      amount,
      categoryId,
      sourceId,
      description,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return income.save();
  }

  async getAllIncomes(userId: Types.ObjectId): Promise<Income[]> {
    return this.incomeModel
      .find({ userId })
      .populate('categoryId', 'name')
      .populate('sourceId', 'name')
      .exec();
  }

  async getIncomeById(id: string): Promise<Income> {
    return this.incomeModel
      .findById(id)
      .populate('categoryId', 'name')
      .populate('sourceId', 'name')
      .exec();
  }

  async updateIncome(id: string, updateData: Partial<Income>): Promise<Income> {
    const income = await this.incomeModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!income) {
      throw new NotFoundException('Income not found.');
    }
    return income;
  }

  async deleteIncome(id: string): Promise<void> {
    const result = await this.incomeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Income not found.');
    }
  }
}