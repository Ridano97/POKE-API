import axios from "axios";

class VersionService {
  static fetchVersions(url) {
    return axios.get(url);
  }

  static getVersionByID(id){
    return axios.get("https://pokeapi.co/api/v2/version-group/" + id)
  }
}

export default VersionService;
