'use strict';

const form = document.querySelector('form');
const photoContainer = document.querySelector('.photoContainer');
const fragment = document.createDocumentFragment();

const clear = () => {
    while (photoContainer.hasChildNodes()) {
        photoContainer.removeChild(photoContainer.lastChild);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = document.querySelector('.input')
    const query = `https://api.pexels.com/v1/search?query=${input.value}&per_page=12`;

    fetch(query, {
            headers: {
                'Authorization': '563492ad6f9170000100000161dafe4a1eac42ac92998fd9c6afa656'
            }
        })
        .then(response => response.json())
        .then(response => {
            const photos = response.photos;

            if (!photos.length) {
                clear();

                const errorInfo = document.createElement('div');
                errorInfo.className = 'alert';
                errorInfo.innerHTML = `We didn't found what you've expected :(`;

                photoContainer.appendChild(errorInfo);
            } else {
                photos.forEach(photo => {
                    const newPhoto = document.createElement('img');
                    newPhoto.src = photo.src.square;

                    fragment.appendChild(newPhoto);
                })

                setTimeout(() => {
                    clear();

                    photoContainer.appendChild(fragment)
                }, 600);
            }
            input.value = '';
        });
});