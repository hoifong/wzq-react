import * as io from 'socket.io-client';
import { Subject } from 'rxjs';
import { HallState } from '@/types/models';

export class HallService extends Subject<HallState> {
    private url: string = 'ws://localhost:8000/ws/hall';
    private socket: SocketIOClient.Socket;

    constructor() {
        super();
        //  init
        this.socket = io.connect(this.url, {
            autoConnect: false
        });
        this.socket.on('update', (data: HallState) => {
            this.next(data);
        });
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

export default new HallService();