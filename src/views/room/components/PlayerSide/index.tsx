import React from 'react';
import cns from 'classnames';
import styles from './index.module.scss';

export const BlackSide: React.FC = props => {

    return (
        <div className={cns(styles.playerSide, styles.blackSide)}>

        </div>
    )
}

export const WhiteSide: React.FC = props => {

    return (
        <div className={cns(styles.playerSide, styles.whiteSide)}>

        </div>
    )
}