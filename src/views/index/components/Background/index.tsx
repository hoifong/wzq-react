import React, { useEffect } from 'react';
import anime from 'animejs';
import cls from 'classnames';
import styles from './index.module.scss';

const duration = 1000;
const radius = 100;

function getCircleX(i: number) {
    const deg = i*Math.PI/5+Math.PI/10;
    return Math.sin(deg) * radius;
}

function getCircleY(i: number) {
    const deg = i*Math.PI/5+Math.PI/10;
    return Math.cos(deg) * radius;
}

const blackname = cls(styles.piece, styles.black);
const whitename = cls(styles.piece, styles.white);

function play() {

    anime({
        targets: '.' + styles.black,
        translateY: [
            {value: 0, duration, },
            {value: (_: any, i: number) => 2*getCircleY(i), duration: duration*2, },
            {value: (_: any, i: number) => getCircleY(i), duration},
            {value: 0, duration},
    
        ],
        scale: [
            {value: 1, duration: duration, },
            {value: 0.5, duration: duration*2, },
            {value: 1, duration: duration*2},
        ],
        translateX: [
            {value: 0, duration, },
            {value: (_: any, i: number) => -4*getCircleX(i) + 60, duration: duration*2, },
            {value: (_: any, i: number) => -getCircleX(i) + 30, duration},
            {value: 0, duration}
        ],
        autoplay: true,
        loop: true,
        delay: duration
    });
    
    anime({
        targets: '.' + styles.white,
        translateY: [
            {value: 0, duration, },
            {value: (_: any, i: number) => 2*getCircleY(i), duration: duration*2,},
            {value: (_: any, i: number) => getCircleY(i), duration},
            {value: 0, duration},
    
        ],
        scale: [
            {value: 1, duration: duration, },
            {value: 0.5, duration: duration*2, },
            {value: 1, duration: duration*2},
        ],
        translateX: [
            {value: 0, duration, },
            {value: (_: any, i: number) => 4*getCircleX(i) - 60, duration: duration*2, },
            {value: (_: any, i: number) => getCircleX(i) - 30, duration},
            {value: 0, duration}
        ],
        autoplay: true,
        loop: true,
        delay: duration
    });
    
    anime({
        targets: '.' + styles.container,
        rotate: [
            { value: 0, duration},
            { value: 180, duration: duration*2},
            { value: 360, duration: duration*2}
        ],
        direction: 'alternate',
        autoplay: true,
        loop: true
    });

    return destroy;
}


function destroy() {
    anime.remove('.' + styles.black);
    anime.remove('.' + styles.white);
    anime.remove('.' + styles.container);
}

export default () => {
    
    useEffect(play, []);

    return (
        <div className={styles.container}>
            <div className={blackname}></div>
            <div className={blackname}></div>
            <div className={blackname}></div>
            <div className={blackname}></div>
            <div className={blackname}></div>
            <div className={whitename}></div>
            <div className={whitename}></div>
            <div className={whitename}></div>
            <div className={whitename}></div>
            <div className={whitename}></div>
        </div>
    )
}