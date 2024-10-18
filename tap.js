// Random function
var max_img = 9

function Random() {
    let i = 1
    for (let j = 1; j < max_img; j++) {
        var x = Math.random()
        if (x <= 0.5) {
            i++
        }
    }
    return i 
}   

// Open collection
function open_bar() {
    document.getElementById("collection-images").style.width = "100%";
    document.getElementById("arrow-right").style.display = "none";
}

// Close collection
function close_bar() {
    document.getElementById("collection-images").style.width = "0";
    document.getElementById("arrow-right").style.display = "block";
}

// Random fill and change of photos
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
                ranks = ['Легендарный', 'Эпический', 'Редкий', 'Обычный', 'Обычный', 'Обычный', 'Редкий', 'Эпический', 'Легендарный']
                ranks_colors = ['#ffc400', '#c918ff', '#00f7ff', '#c2c2c2', '#c2c2c2', '#c2c2c2', '#00f7ff', '#c918ff', '#ffc400']
                rarity.style.color = ranks_colors[rare-1]
                photo.style.borderColor = ranks_colors[rare-1]
                rarity.innerHTML = ranks[rare-1]
                showleha.style.opacity = 1 // turn on animation again
                button1.removeAttribute('disabled', '')
            }, 1000); // 1000 ms delay
        });
    }
})

// Unlock of ultra-legend card

document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('#button1')
    const button_ultra = document.querySelector('#button-ultra')
    count = 0
    button1.addEventListener('click', () => {
        count += 1
        if (count >= 100) {
            button_ultra.style.animation = "shake 1.2s infinite"
        }
    });
    
    button_ultra.addEventListener('click', () => {
        if (count < 100) {
            alert('Ты должен получить Алексея как минимум 100 раз')
        }
    });
    
    
});