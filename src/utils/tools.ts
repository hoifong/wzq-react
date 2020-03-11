export function throttle(fn: Function, t: number) {
    let doAble = true;
    return function () {
        if (doAble) {
            fn.apply(null, arguments);
            doAble = false;
            setTimeout(() => {
                doAble = true;
            }, t);
        }
    }
}

export function debounce(fn: Function, t: number) {
    let timer: any = 0;
    return function () {
        const args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(null, args);
            timer = 0;
        }, t);
    }
}