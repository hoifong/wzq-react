import React from 'react';
import Page from '@/components/Page';
import LoginBox from './components/LoginBox';
import styles from './index.module.scss';
import { RouteComponentProps } from 'react-router-dom';

export default (props: RouteComponentProps) => {
    const handleLoginSuccess = () => {
        props.history.push('./hall');
    }
    return (
        <Page className={styles.root}>
            {/* <div>
                <Background />
            </div> */}
            <div>
                <LoginBox onLoginSuccess={handleLoginSuccess} />
            </div>
        </Page>
    );
}
