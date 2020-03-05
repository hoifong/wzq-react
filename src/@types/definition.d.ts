declare module "rc-form" {
    interface GetFiledPropsOption {
        initialValue?: any
        rules?: Object[]
        trigger?: string
        valuePropName?: string
    }

    interface FormProps {
        form: {
            getFieldProps: (name: string, option?: GetFiledPropsOption) => any
            getFieldDecorator: (name: string, option?: GetFiledPropsOption) => (node: React.Node) => React.Node
            getFieldsValue: (fieldNames?: string[]) => Object
            getFieldValue: (fieldName: string) => any
            validateFields: (fieldNames: string[], options: Object, callback: (errors, values) => void) => void
        }
    }
    export function createForm<T = any>(option?: Object) : (WrappedComponent: React.ComponentClass<T&FormProps>) => React.ComponentClass<any>
}