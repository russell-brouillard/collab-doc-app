import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CollabDocument, DocumentDocument } from './schemas/document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';
import { clerkClient, User } from '@clerk/express';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PaginatedResourceResponse } from '@clerk/backend/dist/api/resources/Deserializer';
import { UpdateCollaboratorsDto } from './dto/update-collab-document.dto';

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

  async findAll(userId: string): Promise<CollabDocument[]> {
    const documents = await this.documentModel
      .find({
        $or: [{ owner: userId }, { collaborators: userId }],
      })
      .populate('collaborators')
      .populate('owner')
      .exec();

    // Attach user information if available
    for (const doc of documents) {
      try {
        const user = await clerkClient.users.getUser(doc.owner);
        doc.user = user;
      } catch (error) {
        console.error(`Error fetching user for document ${doc._id}:`, error);
      }
    }

    return documents;
  }

  async findAllUsers(): Promise<PaginatedResourceResponse<User[]>> {
    return await clerkClient.users.getUserList();
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

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<CollabDocument> {
    const updatedDocument = await this.documentModel
      .findByIdAndUpdate(id, updateDocumentDto, { new: true })
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return updatedDocument;
  }

  async delete(id: string): Promise<void> {
    const result = await this.documentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }

  async updateCollaborators(
    id: string,
    { collaborators }: UpdateCollaboratorsDto,
  ): Promise<CollabDocument> {
    const updatedDocument = await this.documentModel
      .findByIdAndUpdate(
        id,
        { $set: { collaborators } },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return updatedDocument;
  }

  // New method to update the docName/title
  async updateDocName(id: string, docName: string): Promise<CollabDocument> {
    const updatedDocument = await this.documentModel
      .findByIdAndUpdate(
        id,
        { title: docName },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return updatedDocument;
  }
}
