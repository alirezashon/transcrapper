// src/websocket/websocket.gateway.ts

import {
  WebSocketGateway as GatewayDecorator,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@GatewayDecorator() 
export class MyWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private onlineUsersCount = 0;
  private maxScrapingConnections = 10;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');

    this.onlineUsersCount++;

    if (this.onlineUsersCount <= this.maxScrapingConnections) {
      client.on('startScraping', (data) => {
        console.log('Start scraping:', data);
        // Implement your scraping logic here

        // Example: Send a message back to the client
        client.emit('scrapingStatus', { status: 'Scraping in progress' });
      });
    } else {
      client.emit('maxScrapingConnectionsReached', {
        message: 'Maximum scraping connections reached',
      });
    }
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
    this.onlineUsersCount--;
  }
}
