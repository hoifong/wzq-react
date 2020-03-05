import React from 'react';
import cls from 'classnames';
import defaultAvatar from '@/assets/img/alienavatar.png';

import styles from './index.module.scss';

interface IProps {
    url?: string
    text?: string
    size?: 'small'|'normal'|'large'
    bgColor?: string
    edgeColor?: string
}

const Avatar: React.FC<IProps> = ({
    url,
    size='normal',
    text,
    bgColor,
    edgeColor
}) => {

    return (
        <div className={styles.container}>
            <div className={ cls(styles.avatarMask, styles[size])} style={{backgroundColor: bgColor, borderColor: edgeColor}}>
                <img alt='头像' src={url || defaultAvatar} />
            </div>
            { text && <span className={styles.text}>{ text }</span> }
        </div>
    )
}

export default Avatar;