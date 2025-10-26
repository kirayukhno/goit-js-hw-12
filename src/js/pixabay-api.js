import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.params = {
    key: "52836672-a9b4603c312b0d6cca2d3ae03",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 21,
}
export const getImagesByQuery = query => {
    return axios
        .get("", { params: { q: query } })
        .then(response => response.data.hits)
};