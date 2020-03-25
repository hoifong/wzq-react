import * as io from 'socket.io-client';
import { Player, Point } from '@/types/models';

export type GameEvents = 'start'|'wait'|'join'|'quit'|'move'|'over'

export class RoomService {
    private url: string = 'ws://localhost:8000/ws/room/';
    private socket: SocketIOClient.Socket;

    constructor(roomId: string) {

        this.socket = io.connect(this.url + roomId, {
            autoConnect: false
        });
    }

    onPlayerJoin(handler: (player: Player) => void) {
        this.socket.on('join', handler);
    }

    onRoomWait(handler: () => void) {
        this.socket.on('wait', handler);
    }

    onGameStart(handler: () => void) {
        this.socket.on('start', handler);
    }

    onPlayerQuit(handler: (player: Player) => void) {
        this.socket.on('quit', handler);
    }

    onGameMove(handler: (moveTo: Point) => void) {
        this.socket.on('move', handler);
    } 

    onGameOver(handler: (player: Player) => void) {
        this.socket.on('over', handler);
    }

    open() {
        if (this.socket.disconnected){
            this.socket.open();
        }
    }

    close() {
        if (this.socket.connected) {
            this.socket.close();
        }
    }
}