// backend/src/documents/documents.controller.ts

import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }

  // Add update and delete endpoints as needed
}
