import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { SourceService } from './source.service';
import { Source } from './schemas/source.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('sources')
@Controller('sources')
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new source' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Source created successfully.', type: Source })
  async createSource(
    @Body('name') name: string,
    @Req() req: any, 
  ): Promise<Source> {
    return this.sourceService.createSource(name, req.user._id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all sources' })
  @ApiResponse({ status: 200, description: 'Returns a list of sources.', type: [Source] })
  async getAllSources(@Req() req: any): Promise<Source[]> {
    return this.sourceService.getAllSources(req.user._id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific source by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Source ID' })
  @ApiResponse({ status: 200, description: 'Returns the source.', type: Source })
  async getSourceById(@Param('id') id: string): Promise<Source> {
    return this.sourceService.getSourceById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update a source by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Source ID' })
  @ApiBody({ type: String })
  @ApiResponse({ status: 200, description: 'Returns the updated source.', type: Source })
  async updateSource(
    @Param('id') id: string,
    @Body() updateData: Partial<Source>,
  ): Promise<Source> {
    return this.sourceService.updateSource(id, updateData);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a source by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Source ID' })
  @ApiResponse({ status: 204, description: 'Source deleted successfully.' })
  async deleteSource(@Param('id') id: string): Promise<void> {
    return this.sourceService.deleteSource(id);
  }
}
