'use strict';

const form = document.querySelector('form');
const photoContainer = document.querySelector('.photoContainer');
const error = document.querySelector('.error');
const fragment = document.createDocumentFragment();

const clearContainer = (element) => {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

const revealElement = (element, delayTime, intervalTime) => {
    ScrollReveal().reveal(element, {
        delay: delayTime,
        interval: intervalTime
    })
}

const showError = (description) => {
    const errorInfo = document.createElement('div');
    errorInfo.className = 'error';
    errorInfo.innerHTML = `${description}`;
}

window.addEventListener('load', () => {
    revealElement('.box', 400, 0);
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.querySelector('.input');

    const query = `https://api.pexels.com/v1/search?query=${input.value}&per_page=30`;
    const apiKey = '563492ad6f9170000100000161dafe4a1eac42ac92998fd9c6afa656';
    const options = {
        headers: {
            Authorization: `${apiKey}`
        }
    };

    fetch(query, options)
        .then(response => response.json())
        .then(response => {
            const photos = response.photos;

            if (!photos.length) {
                clearContainer(error);
                clearContainer(photoContainer);

                showError(`We didn't found what you've expected :(`);

                form.appendChild(errorInfo);
                revealElement('.alert', 300, 0);
            } else {
                photos.forEach(photo => {
                    const newPhoto = document.createElement('img');
                    newPhoto.className = 'photo';
                    newPhoto.src = photo.src.tiny;

                    fragment.appendChild(newPhoto);
                })

                clearContainer(error);
                clearContainer(photoContainer);

                photoContainer.appendChild(fragment);
                revealElement('.photo', 0, 300);
            }
            input.value = '';
        });
});