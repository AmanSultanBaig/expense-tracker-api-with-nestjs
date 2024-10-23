import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) {}

  async createCategory(name: string, userId: Types.ObjectId): Promise<Category> {
    const category = new this.categoryModel({ name, userId });
    return category.save();
  }

  async getAllCategories(userId: Types.ObjectId): Promise<Category[]> {
    return this.categoryModel.find({ userId }).exec();
  }

  async getCategoryById(id: string): Promise<Category> {
    return this.categoryModel.findById(id).exec();
  }

  async updateCategory(id: string, updateData: Partial<Category>): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
