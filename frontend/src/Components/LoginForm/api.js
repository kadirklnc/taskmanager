import axios from 'axios';

export function signIn(body){
    return axios.post("/api/test/user",body);
}

