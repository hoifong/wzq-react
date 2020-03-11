import React from 'react';
import styles from './index.module.scss';
import { BlackSide, WhiteSide } from './components/PlayerSide';
import Board from './components/Board';
import { Room, Player } from '@/types/models';

const testData: Room = {
    id: '',
    host: '',
    roomState: 0,
    whiteSide: 'hhh',
    blackSide: 'hh',
    whiteSteps: [
        {x: 1, y: 2}
    ],
    blackSteps: [
        {x: 3, y: 4}
    ],
    startTime: '',
    config: {
        boardSize: 15,
        firstMove: 1,
        maxTimeout: 3000
    }
}

const testPlayer: Player = {
    name: 'hhh',
    level: 1,
    pic: '',
    id: '',
    createTime: 11111
}

const RoomContainer: React.FC = props => {

    return (
        <div className={styles.roomPage}>
            <div className={styles.container}>
                <BlackSide />
                <Board data={testData} player={testPlayer} />
                <WhiteSide />
            </div>
            <div className={styles.footer}>

            </div>
        </div>
    )
}

export default RoomContainer;