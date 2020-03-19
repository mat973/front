import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Basic ${token}`);
    }
};

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody).catch(err => console.log(err)),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    delete: (url) =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody).catch(err => console.log(err)),
};
const Points = {
    all: () =>
        requests.get('/points'),
    recalculated: (r) =>
        requests.get(`/points/recalculate?r=${r}`),
    new: (x, y, r) =>
        requests.post('/points', {x: x, y: y, r: r}),
    delete: (id) =>
        requests.delete(`/points?id=${id}`),
    deleteAll: () => {
        requests.delete('/points/deleteall');
    }
};

const Auth = {
    login: (username, password) =>
        requests.post('/users/login', { username: username, password: password }),
    register: (username, password) =>
        requests.post('/users/register', { username: username, password: password } ),
    logout: () =>
        requests.post('/users/logout'),
};

export default {
    Points,
    Auth,
    setToken: _token => { token = _token; }
};
