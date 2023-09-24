import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api-hxqgbadswa-uc.a.run.app'
})

export default instance;