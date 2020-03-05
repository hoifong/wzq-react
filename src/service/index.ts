import { ajax, AjaxRequest } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
import qs, { ParsedUrlQueryInput } from 'querystring';
import { Observable } from 'rxjs/internal/Observable';
import Payload from '@/types/interface/payload';
import Response from '@/types/interface/response';

export function get<Payload extends ParsedUrlQueryInput, Response=any>(path: string, payload?: Payload, headers?: Object, options?: AjaxRequest): Observable<Response> {
    const url = path + '?' + qs.stringify(payload);

    return ajax({
        method: 'GET',
        url, headers,
        ...options
    }).pipe(
        map(response => response.response)
    );
}

export function post<Payload extends Object, Response=any>(path: string, payload?: Payload, headers?: Object, options?: AjaxRequest): Observable<Response> {
    return ajax({
        url: path,
        method: 'POST',
        body: payload,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        timeout: 5000,
        ...options
    }).pipe(
        map(response => response.response)
    );
}

/**
 * 查询用户名是否存在
 * @param username 用户名
 */
export const getUsernameExist = (username: string) => {
    return get<never, Response.Body>('/api/userexist/' + username);
}

/**
 * 登录
 * @param payload 
 */
export const postLogin = (payload: Payload.PostLogin) => {
    return post<Payload.PostLogin, Response.Body>('/api/login', payload);
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return get<never, Response.Body>('/api/getUserInfo');
}

/**
 * 登出
 * @param payload 
 */
export const postLogout = () => {
    return post<never, Response.Body>('/api/logout');
}

/**
 * 注册
 * @param payload 
 */
export const postRegister = (payload: Payload.PostRegister) => {
    return post<Payload.PostRegister, Response.Body>('/api/register', payload);
}

/**
 * 创建房间
 */
export const postCreateRoom = () => {
    return post<never, Response.Body>('/api/createRoom');
}