import axios from "axios";

class TypeService {
    static fetchTypeByURL(url){
        return axios.get(url)
    }
}

export default TypeService;