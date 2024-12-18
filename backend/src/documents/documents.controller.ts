import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ClerkAuthGuard } from 'src/clerk/clerk.guard';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(ClerkAuthGuard)
  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @UseGuards(ClerkAuthGuard)
  @Get()
  async findAll() {
    return this.documentsService.findAll();
  }

  @UseGuards(ClerkAuthGuard)
  @Get('users')
  async findAllUsers() {
    console.log('Finding all users');
    return this.documentsService.findAllUsers();
  }

  @UseGuards(ClerkAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @UseGuards(ClerkAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @UseGuards(ClerkAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.documentsService.delete(id);
  }
}
