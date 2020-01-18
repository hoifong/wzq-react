import React from 'react';
import Background from './components/Background';
import Page from '@/components/Page';
import LoginBox from './components/LoginBox';
import styles from './index.module.scss';

export default () => (
    <Page className={styles.root}>
        <Background />
        <LoginBox />
        
    </Page>
);
