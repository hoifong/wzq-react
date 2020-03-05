import React from 'react';
import styles from './index.module.scss';
import Avatar from '@/components/Avatar';
import { postCreateRoom } from '@/service';

const FooterController: React.FC = props => {

    const createRoom = () => {
        postCreateRoom().subscribe();
    }

    return (
        <div className={styles.container}>
            <Avatar />
            <div>
                <button>随机匹配</button>
                <button>人机训练</button>
                <button onClick={createRoom}>创建房间</button>
                <button>退出</button>
            </div>
        </div>
    );
}

export default FooterController;