import axios from "axios";

const instance = axios.create({
    baseURL:'https://zany-disco-75jrjgvv7vg3xrrq-5001.app.github.dev/clone-5be04/us-central1/api/'//API CLOUD FUCTION URL
})

export default instance;