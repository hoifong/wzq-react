import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Room, Player, HallState } from '@/types/models';
import HallService from '@/service/HallService';
import { throttleTime } from 'rxjs/operators';
import Avatar from '@/components/Avatar';

interface RoomItemProps {
    room: Room
    blackSide?: Player
    whiteSide?: Player
}

const RoomItem: React.FC<RoomItemProps> = ({blackSide, whiteSide}) => {

    return (
        <div title='点击进入房间' className={styles.roomItem}>
            <div className={styles.blackSide} >
                <Avatar url={blackSide?.pic} text={blackSide?.name || '无玩家'} edgeColor='white' />
            </div>
            <div className={styles.whiteSide}>
                <Avatar url={whiteSide?.pic} text={whiteSide?.name || '无玩家'} />
            </div>
        </div>
    )
}

interface RoomsProps {
    rooms: Room[],
    players: Player[]
}

const Rooms: React.FC<RoomsProps> = ({rooms, players}) => {

    return (
        <div className={styles.roomsContainer}>
            {
                rooms.map(item => (
                    <RoomItem
                        key={item.id}
                        room={item}
                        blackSide={players.find(p => p.name === item.blackSide)}
                        whiteSide={players.find(p => p.name === item.whiteSide)} />
                ))
            }
        </div>
    )
}

export default () => {
    const [data, setData] = useState<HallState>({
        players: [],
        games: []
    });

    useEffect(() => {
        const $rooms = HallService.pipe(
            throttleTime(500)
        ).subscribe(state => {
            setData(state);
        });

        return () => {
            $rooms.unsubscribe();
        };
    });

    return (
        <Rooms rooms={data.games} players={data.players} />
    )
};