import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust for your frontend domain
  },
})
export class DocumentsGateway {
  @WebSocketServer()
  server: Server;

  // In-memory map of document ID to set of socket IDs (or use a room system)
  // Alternatively, rely on the built-in room feature in Socket.io

  @SubscribeMessage('joinDocument')
  handleJoinDocument(
    @MessageBody() data: { documentId: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Join a room named after the documentId
    client.join(`document_${data.documentId}`);
  }

  @SubscribeMessage('leaveDocument')
  handleLeaveDocument(
    @MessageBody() data: { documentId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`document_${data.documentId}`);
  }

  @SubscribeMessage('updateDocumentContent')
  handleUpdateContent(
    @MessageBody() data: { documentId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast the updated content to all other clients in the same document room
    client.to(`document_${data.documentId}`).emit('documentContentUpdated', {
      documentId: data.documentId,
      content: data.content,
    });
  }
}
