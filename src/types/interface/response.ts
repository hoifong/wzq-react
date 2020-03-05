namespace Response {
    export interface Body<T=any> {
        success: boolean,
        data: T,
        msg: string
    }
}

export default Response;