import React from 'react';
import cls from 'classnames';
import styles from './styles.module.scss';

const Page: React.FC<React.HTMLProps<HTMLDivElement>> = ({children, className, ...res}) => (
    <div className={cls(styles.page, className)} {...res} >
        { children }
    </div>
)

export default Page;