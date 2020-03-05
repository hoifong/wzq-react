interface Item {
    url: string,
    method?: 'get'|'post',
    en?: 'json'|'form-data'
}

type keys = 'users' | 'rooms'| 'login';

const apis: {
    [key in keys]?: Item
} = {
    login: {
        url: '/api/login',
        method: 'post',

    }
}

export default apis;