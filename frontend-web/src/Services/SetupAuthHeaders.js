import axios from "axios";

export function setupAuthHeaderForNetworkCalls(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return axios.defaults.headers.common["Authorization"];
    }
    delete axios.defaults.headers.common["Authorization"];
}
