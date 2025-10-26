import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const searchInput = document.querySelector('input[name="search-text"]');

form.addEventListener("submit", onSubmit);
function onSubmit(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
        iziToast.error({
            message: "Enter a valid keyword!",
            position: "topRight",
            backgroundColor: "#EF4040",
            progressBarColor: "#B51B1B",
            messageColor: "#fff",
            close: true,
            maxWidth: 432,
            });
        return;
    }
    clearGallery();
    showLoader();
    getImagesByQuery(query)
        .then(images => {
            if (images.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                    backgroundColor: "#EF4040",
                    progressBarColor: "#B51B1B",
                    messageColor: "#fff",
                    close: true,
                    maxWidth: 432,
                });
                return;
            }
            createGallery(images);
        })
        .catch(error => {
            console.log(error);
            iziToast.error({
                message: "Something went wrong. Please try again later!",
                position: "topRight",
                backgroundColor: "#EF4040",
                progressBarColor: "#B51B1B",
                messageColor: "#fff",
                close: true,
                maxWidth: 432,
            });
        })
        .finally(() => {
            hideLoader();
            form.reset();
        });
}