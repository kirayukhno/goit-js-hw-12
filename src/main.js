import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton,} from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const searchInput = document.querySelector('input[name="search-text"]');
const submitButton = form.querySelector('button[type="submit"]');
const loadMoreBtn = document.querySelector(".load-more-btn");

let currentQuery = "";
let currentPage = 1;
let totalHits = 0;

hideLoadMoreButton();
form.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener("click", onLoadMore);
async function onSubmit(event) {
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
    currentQuery = query;
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    submitButton.disabled = true;
    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        if (data.hits.length === 0) {
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
        totalHits = data.totalHits;
        createGallery(data.hits);
        if (currentPage * 15 < totalHits) {
            showLoadMoreButton();
        }
        else {
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                backgroundColor: "#EF4040",
                progressBarColor: "#B51B1B",
                messageColor: "#fff",
                close: true,
                maxWidth: 432,
            });
        }
    } catch(error) {
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
    } finally {
        hideLoader();
        submitButton.disabled = false;
        form.reset();
    }
}

async function onLoadMore() {
    currentPage += 1;
    showLoader();
    loadMoreBtn.disabled = true;
    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);
        if (currentPage * 15 >= totalHits) {
            hideLoadMoreButton();
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
                backgroundColor: "#EF4040",
                progressBarColor: "#B51B1B",
                messageColor: "#fff",
                close: true,
                maxWidth: 432,
            });
        }
    } catch (error) {
        console.log(error);
        iziToast.error({
            message: "Something went wrong with loading. Please try again later!",
            position: "topRight",
            backgroundColor: "#EF4040",
            progressBarColor: "#B51B1B",
            messageColor: "#fff",
            close: true,
            maxWidth: 432,
        });
    } finally {
        hideLoader();
        loadMoreBtn.disabled = false;
        smoothScroll();
    }
}

function smoothScroll() {
    const card = document.querySelector(".gallery-item");
    if (card) {
        window.scrollBy({
            top: (card.getBoundingClientRect().height * 2),
            left: 0,
            behavior: "smooth",
        });        
    }
}