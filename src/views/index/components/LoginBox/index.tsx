import React, { useState } from 'react';
import cns from 'classnames';
import { createForm } from 'rc-form';
import { FormProps } from '@/types/common';
import styles from './index.module.scss';
import { ReactComponent as Loading } from '@/svg/loading.svg';
import { postLogin, getUsernameExist, postRegister } from '@/service';
import Payload from '@/types/interface/payload';
import { switchMap, map } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

/**
 * 登录注册表单
 */
class LoginForm extends React.Component<FormProps> {

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { form, onSubmit } = this.props;
        onSubmit && onSubmit(form.getFieldsValue());
    }

    isValidInput = () => {
        const {form} = this.props;

        const username = form.getFieldValue('username');
        const password = form.getFieldValue('password');

        return username && password;
    }

    render() {
        const { form } = this.props;
        return (
            <form onSubmit={this.handleSubmit} className={styles.stepPage}>
                <h2 className={styles.title}>登录·注册</h2>
                <input
                    className={styles.formItem}
                    placeholder='请输入用户名'
                    {
                        ...form.getFieldProps('username', {
                            initialValue: ''
                        })
                    }
                    />
                <input
                    className={styles.formItem}
                    placeholder='请输入密码'
                    type='password'
                    {
                        ...form.getFieldProps('password', {
                            initialValue: ''
                        })
                    }
                    />
                <button disabled={!this.isValidInput()} className={styles.formItem} type='submit' >进入游戏</button>
            </form>
        )
    }
}

const LoginFormWrap = createForm()(LoginForm);

/**
 * 确认密码表单
 */

class ConfirmForm extends React.Component<FormProps & {onCancel?: () => void}> {
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { form, onSubmit } = this.props;

        onSubmit && onSubmit(form.getFieldsValue());
    }
    render() {
        const { form, onCancel } = this.props;

        return (
            <form onSubmit={this.handleSubmit} className={styles.stepPage}>
                <h2 className={styles.title}>确认密码</h2>
                <input className={styles.formItem} {...form.getFieldProps('password', {initialValue: ''})} />
                <button className={styles.formItem} type='submit'>进入游戏</button>
                <button onClick={onCancel} type='button' className={styles.tip}>遇到问题？返回</button>
            </form>
        )
    }
}

const ConfirmFormWrap = createForm()(ConfirmForm);

const LoadingPage: React.FC = () => (
    <div className={ cns(styles.stepPage, styles.loading)}>
        <Loading height='50px' className='spin' />
    </div>
)

interface IProps {
    onLoginSuccess: () => void
}

const Container: React.FC<IProps> = ({ onLoginSuccess }) => {

    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState<Payload.PostLogin|null>(null);

    //  登录
    const handleLoginSubmit = (form: Payload.PostLogin) => {
        setLoading(true);
        getUsernameExist(form.username)
            .pipe(
                switchMap(value => {
                    if (!value.success) throw(value.msg);
                    if (value.data) {
                        //  用户名已存在
                        return postLogin(form);
                    }

                    if (window.confirm('用户名不存在，是否注册为新用户')) {
                        setLoginForm(form);
                        setStep(1);
                    }
                    setLoading(false);
                    return EMPTY;
                }),
                map(value => {
                    if (value.success) {
                        //  登录成功
                        window.alert('登录成功');
                        onLoginSuccess();
                    } else {
                        //  登录失败
                        window.alert('登录失败:'+value.msg);
                        setLoading(false);
                    }
                    return EMPTY;
                })
            )
        .subscribe();
    }

    //  确认密码
    const handleConfirmSubmit = (form: {password: string}) => {
        if (loginForm && form.password === loginForm.password) {
            setLoading(true);
            postRegister(loginForm)
                .pipe(
                    switchMap(value => {
                        if (value.success) {
                            alert('注册成功');
                            onLoginSuccess();
                        } else {
                            alert('注册失败');
                            setLoading(false);
                        }
                        return EMPTY;
                    })
                )
                .subscribe();
        } else {
            alert('两次密码输入不同');
        }
    }

    const handleConfirmCancel = () => {
        setStep(0);
    }

    return (
        <div className={styles.container} >
            <div className={styles.content} style={{transform: 'translateX(-'+ step*200 +'px)'}}>
                <LoginFormWrap onSubmit={handleLoginSubmit} />
                <ConfirmFormWrap onCancel={handleConfirmCancel} onSubmit={handleConfirmSubmit}/>
            </div>
            { loading && <LoadingPage /> }
        </div>
    );
}

export default Container;