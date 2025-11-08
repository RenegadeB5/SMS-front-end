import axios from 'axios';

class API_interface {


    static GET(URI) {
        return axios.get(`${URI}`)
            .then(response => response.data);
    }

    static POST(URI, data) {
        return axios.post(`${URI}`, data)
            .then(response => response.data);
    }

    static PUT(URI, data) {
        return axios.put(`${URI}`, data)
            .then(response => response.data);
    }

    static DELETE(URI) {
        return axios.delete(`${URI}`)
            .then(response => response.data);
    }
}

export default API_interface;