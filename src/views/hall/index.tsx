import React, { useEffect } from 'react';
import FooterController from './FooterController';
import styles from './index.module.scss';
import Rooms from './Rooms';
import HallService from '@/service/HallService';

export default () => {

    useEffect(() => {
        HallService.open();

        return () => {
            HallService.close();
        }
    });

    return (
        <div className={styles.hall}>
            <div className={styles.top}>
                <FooterController />
            </div>
            <div className={styles.content}>
                <Rooms />
            </div>
        </div>
    )
};