import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Source, SourceDocument } from './schemas/source.schema';

@Injectable()
export class SourceService {
  constructor(@InjectModel(Source.name) private sourceModel: Model<SourceDocument>) {}

  async createSource(name: string, userId: Types.ObjectId): Promise<Source> {
    const source = new this.sourceModel({ name, userId });
    return source.save();
  }

  async getAllSources(userId: Types.ObjectId): Promise<Source[]> {
    return this.sourceModel.find({ userId }).exec();
  }

  async getSourceById(id: string): Promise<Source> {
    return this.sourceModel.findById(id).exec();
  }

  async updateSource(id: string, updateData: Partial<Source>): Promise<Source> {
    return this.sourceModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteSource(id: string): Promise<void> {
    await this.sourceModel.findByIdAndDelete(id).exec();
  }
}