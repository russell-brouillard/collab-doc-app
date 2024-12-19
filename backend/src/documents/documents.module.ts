import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentSchema } from './schemas/document.schema';
import { DocumentsGateway } from './documents.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CollabDocument', schema: DocumentSchema },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsGateway],
  exports: [DocumentsService],
})
export class DocumentsModule {}
