import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  })  
  @ApiResponse({ status: 201, description: 'Category created successfully.', type: Category })
  async createCategory(
    @Body('name') name: string,
    @Req() req: any,
  ): Promise<Category> {
    return this.categoryService.createCategory(name, req.user._id); 
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Returns a list of categories.', type: [Category] })
  async getAllCategories(@Req() req: any): Promise<Category[]> {
    return this.categoryService.getAllCategories(req.user._id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific category by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Returns the category.', type: Category })
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Category ID' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'Returns the updated category.', type: Category })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateData: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Category ID' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully.' })
  async deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}