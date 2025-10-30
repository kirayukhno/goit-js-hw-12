import axios from 'axios';
import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

axios.defaults.baseURL = "https://pixabay.com/api/";
axios.defaults.params = {
    key: "52836672-a9b4603c312b0d6cca2d3ae03",
    q: "",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 15,
}
export const getImagesByQuery = async (query, page) => {
    try {
        const response = await axios.get("", {
            params: {
                q: query,
                page: page,
            },
        });
        if (!response.data || !response.data.hits) {
            iziToast.error({
                message: "Something went wrong with Pixabay API.",
                position: "topRight",
                backgroundColor: "#EF4040",
                progressBarColor: "#B51B1B",
                messageColor: "#fff",
                close: true,
                maxWidth: 432,
            });
            throw new Error("Invalid response");
        }
        return {
            hits: response.data.hits,
            totalHits: response.data.totalHits,
        };
    } catch (error) {
        console.log("Error from Pixabay API: ", error.message);
        iziToast.error({
        message: "Failed to fetch images from Pixabay. Please try again later!",
        position: "topRight",
        backgroundColor: "#EF4040",
        progressBarColor: "#B51B1B",
        messageColor: "#fff",
        close: true,
        maxWidth: 432,
        });
        throw error;
    }
};