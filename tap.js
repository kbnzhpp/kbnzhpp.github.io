var max_img = 7
function Random() {
    return Math.floor(Math.random() * (max_img - 1) + 1)
}
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#button1')
    const showleha = document.querySelector('.showleha')
    const photo = document.querySelector('.photo')
    if (button) {
        button.addEventListener('click', (event) => {
            var final_img = "imgs/" + Random() + '.jpg'
            photo.setAttribute('src', final_img)
            showleha.setAttribute('style', 'display: block')
            event.preventDefault()
        });
    };
})

