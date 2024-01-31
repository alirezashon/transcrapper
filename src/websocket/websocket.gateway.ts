import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger(' Socketalistasiti');
  afterInit(server: any) {
    this.logger.log('inaliziazed');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      'web socket gheyre connect mibashad lotgfan ba osdoem admin tamas hasel farmaiid',
      client.id,
    );
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('client connected', client.id);
    console.log(client)
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): WsResponse<string> {
       this.logger.log('client connected', text);
 // client.emit('message', text)
    return { event: `msg to client is `, data: text };
  }
}

// // src/websocket/websocket.gateway.ts

// import {
//   WebSocketGateway as GatewayDecorator,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
// } from '@nestjs/websockets';
// import { Server } from 'socket.io';

// @GatewayDecorator() // Rename the decorator to avoid conflict
// export class MyWebSocketGateway
//   implements OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;

//   private onlineUsersCount = 0;
//   private maxScrapingConnections = 10;

//   handleConnection(client: any, ...args: any[]) {
//     console.log('Client connected');

//     this.onlineUsersCount++;

//     if (this.onlineUsersCount <= this.maxScrapingConnections) {
//       client.on('startScraping', (data) => {
//         console.log('Start scraping:', data);
//         // Implement your scraping logic here

//         // Example: Send a message back to the client
//         client.emit('scrapingStatus', { status: 'Scraping in progress' });
//       });
//     } else {
//       client.emit('maxScrapingConnectionsReached', {
//         message: 'Maximum scraping connections reached',
//       });
//     }
//   }

//   handleDisconnect(client: any) {
//     console.log('Client disconnected');
//     this.onlineUsersCount--;
//   }
// }
