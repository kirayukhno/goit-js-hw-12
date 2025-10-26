import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector("ul.gallery");
const loader = document.querySelector("span.loader");

const slb = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
});

export const createGallery = images => {
    gallery.insertAdjacentHTML("beforeend", images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) =>
                `
                <li class="gallery-item">
                    <a class="gallery-link" href="${largeImageURL}">
                        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                    </a>
                    <div class="gallery-item-info">
                        <p class="gallery-text"><span class="title">Likes</span>${likes}</p>
                        <p class="gallery-text"><span class="title">Views</span>${views}</p>
                        <p class="gallery-text"><span class="title">Comments</span>${comments}</p>
                        <p class="gallery-text"><span class="title">Downloads</span>${downloads}</p>
                    </div>
                </li>
                `
        ).join("")
    )
    slb.refresh();
};

export const clearGallery = () => {
    gallery.innerHTML = "";
};

export const showLoader = () => {
    loader.classList.add("is-visible");
};

export const hideLoader = () => {
    loader.classList.remove("is-visible");
};