import { FormProps as RcFormProps } from 'rc-form';

export interface FormProps<T=any> extends RcFormProps {
    onSubmit?: (form: T) => void
    loading?: boolean
    initial?: T
}