'use strict';

const form = document.querySelector('form');
const photoContainer = document.querySelector('.photoContainer');
const fragment = document.createDocumentFragment();

const clearContainer = () => {
    while (photoContainer.hasChildNodes()) {
        photoContainer.removeChild(photoContainer.lastChild);
    }
}

window.onload = () => {
    ScrollReveal().reveal('.box', {
        delay: 400
    });
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.querySelector('.input');
    const query = `https://api.pexels.com/v1/search?query=${input.value}&per_page=30`;
    const apiKey = '563492ad6f9170000100000161dafe4a1eac42ac92998fd9c6afa656';

    fetch(query, {
            headers: {
                Authorization: `${apiKey}`
            }
        })
        .then(response => response.json())
        .then(response => {
            const photos = response.photos;

            if (!photos.length) {
                clearContainer();

                const errorInfo = document.createElement('div');
                errorInfo.className = 'alert';
                errorInfo.innerHTML = `We didn't found what you've expected :(`;

                photoContainer.appendChild(errorInfo);
                ScrollReveal().reveal('.alert', {
                    delay: 300
                });
            } else {
                photos.forEach(photo => {
                    const newPhoto = document.createElement('img');
                    newPhoto.className = 'photo';
                    newPhoto.src = photo.src.square;

                    fragment.appendChild(newPhoto);
                })

                clearContainer();

                photoContainer.appendChild(fragment)
                ScrollReveal().reveal('.photo', {
                    interval: 300
                });
            }
            input.value = '';
        });
});