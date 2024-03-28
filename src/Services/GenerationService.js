import axios from "axios";

class GenerationService{
    static fetchGeneration(){
        return axios.get("https://pokeapi.co/api/v2/generation")
    }
}

export default GenerationService;