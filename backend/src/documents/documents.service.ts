// backend/src/documents/documents.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollabDocument, DocumentDocument } from './schemas/document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';
import { clerkClient } from '@clerk/express';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(CollabDocument.name)
    private documentModel: Model<DocumentDocument>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<CollabDocument> {
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async findAll(): Promise<CollabDocument[]> {
    const documents = await this.documentModel
      .find()
      .populate('collaborators')
      .populate('owner')
      .exec();

    for (const doc of documents) {
      try {
        const user = await clerkClient.users.getUser(doc.owner);
        console.log(doc.owner);
        console.log(user.emailAddresses);

        // Attach user data to the document
        doc.user = user;
      } catch (error) {
        console.error(`Error fetching user for document ${doc._id}:`, error);
      }
    }

    return documents;
  }

  async findOne(id: string): Promise<CollabDocument> {
    const document = await this.documentModel
      .findById(id)
      .populate('collaborators')
      .populate('owner')
      .exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  // Implement update and delete methods as needed
}
