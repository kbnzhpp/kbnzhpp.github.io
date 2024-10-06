var max_img = 9

function Random() {
    let i = 1
    for (let j = 1; j < max_img; j++) {
        var x = Math.random()
        if (x < 0.47) {
            i++
        }
    }
    return i 
}   

document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('#button1')
    const photo = document.querySelector('.photo')
    const showleha = document.querySelector('.showleha')
    const rarity = document.querySelector('#rarity')
    if (button1) {
        button1.addEventListener('click', (event) => {
            event.preventDefault() // prevent update of page
            showleha.style.opacity = 0
            button1.setAttribute('disabled', '')
            

            // do a lil delay to apply animation
            setTimeout(() => {
                let rare = Random()
                var final_img = "imgs/" + rare + '.jpg'
                photo.setAttribute('src', final_img)
                ranks = ['Обычный', 'Обычный', 'Редкий', 'Редкий', 'Редкий', 'Редкий', 'Эпический', 'Эпический', 'Легендарный']
                ranks_colors = ['#c2c2c2', '#c2c2c2', '#00f7ff', '#00f7ff', '#00f7ff', '#00f7ff', '#c918ff', '#c918ff', '#ffc400']
                ranks_glow = ['#ce4ff5', '#ffd448']
                rarity.style.color = ranks_colors[rare-1]
                photo.style.borderColor = ranks_colors[rare-1]
                if (rare >= 6) {
                    rarity.style.textShadow = "-1px -1px #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff";
                } else {
                    rarity.style.textShadow = "";
                }
                rarity.innerHTML = ranks[rare-1]
                showleha.style.opacity = 1 // turn on animation again
                button1.removeAttribute('disabled', '')
            }, 1000); // 1000 ms delay
        });
    }
})