import axios from 'axios';

// simple API interface
class API_interface {

    // get
    static async GET(URI) {
        try {
            const response = await axios.get(`${URI}`);
            return response;
        }
        catch (error) {
            return error.response;
        }
        
    }

    // post
    static async POST(URI, data) {
        try {
            const response = await axios.post(`${URI}`, data);
            return response;
        }
        catch (error) {
            return error.response;
        }
        
    }

    // put
    static async PUT(URI, data) {
        try {
            const response = await axios.put(`${URI}`, data);
            return response;
                
        }
        catch (error) {
            return error.response;
        }
        
    }

    // delete
    static async DELETE(URI) {
        try {
            const response = await axios.delete(`${URI}`);
            return response;
                
        }
        catch (error) {
            return error.response;
        }
        
    }
}

export default API_interface;