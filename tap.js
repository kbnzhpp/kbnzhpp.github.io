var max_img = 7

function Random() {
    return Math.floor(Math.random() * (max_img - 1) + 1)
}

document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#button1')
    const photo = document.querySelector('.photo')
    const showleha = document.querySelector('.showleha')
    if (button) {
        button.addEventListener('click', (event) => {
            event.preventDefault() // prevent update of page
            showleha.style.opacity = 0
            // do a lil delay to apply animation
            setTimeout(() => {
                var final_img = "imgs/" + Random() + '.jpg'
                photo.setAttribute('src', final_img)
                showleha.style.opacity = 1 // turn off animation again
            }, 1000); // 1000 ms delay
        });
    }
})