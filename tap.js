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
    const collection = document.getElementById("collection-images");
    document.getElementById("collection-images").style.width = "95%";
    document.getElementById("arrow-right").style.display = "none";
    document.getElementById("arrow-left").style.display = "block";
    collection.style.borderRadius = "10px";
    collection.style.border = "2px solid #272727";
    collection.style.backgroundColor = "#1b1b1b";
}

// Close collection
function close_bar() {
    const collection = document.getElementById("collection-images");
    document.getElementById("collection-images").style.width = "0";
    document.getElementById("arrow-right").style.display = "block";
    document.getElementById("arrow-left").style.display = "none";
    collection.style.borderRadius = "";
    collection.style.border = "";
    collection.style.backgroundColor = "";
}

//Return to the back after open ultra legend
function back() {
    const main = document.querySelectorAll('.main *:not(.ultra-legend-opened):not(.ultra-legend-opened .ultra-legend)')
    const back_button = document.querySelector(".back-button");
    const button_ultra = document.querySelector('#button-ultra')
    const ultra_legend = document.querySelector(".ultra-legend");
    const ultra_div = document.querySelector(".ultra-legend-opened");
    ultra_legend.classList.add('hidden-opacity');
    setTimeout(() => {
        
        main.forEach(elem => {
            elem.classList.remove('hidden-display');
        })
        back_button.style.opacity = '0'
        setTimeout(() => {
            main.forEach(elem => {
                elem.classList.remove('hidden-opacity');
            })
            ultra_legend.classList.add('hidden-display');
            back_button.style.display = 'none'
            button_ultra.removeAttribute("disabled", '')
            ultra_div.removeChild(back_button); 
        }, 600);
    }, 600);
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
    const photo = document.querySelector(".ultra-legend")
    const ultra_div = document.querySelector('.ultra-legend-opened')
    const main = document.querySelectorAll('.main *:not(.ultra-legend-opened):not(.ultra-legend-opened *)')

    count = 0

    button1.addEventListener('click', () => {
        count += 50
        if (count >= 100) {
            button_ultra.style.animation = "shake 1.2s infinite"
        }
    });
    
    button_ultra.addEventListener('click', () => {
        if (count < 100) {
            button_ultra.style.animation = "refuse 0.5s"
            setTimeout ( () => {
                button_ultra.style.animation = "none"
            }, 500)
        } else {
            button_ultra.setAttribute("disabled", "")
            main.forEach(element => {
                element.classList.add("hidden-opacity");
            });
            setTimeout(() => {
                main.forEach(element => {
                    element.classList.add("hidden-display");
                });
                photo.classList.remove('hidden-display')
                setTimeout(() => {
                    photo.classList.remove('hidden-opacity');  

                    // Create back button
                    const button = document.createElement('button');
                    button.className = 'back-button';
                    button.innerText = 'Вернуться назад';
                    button.onclick = () => back();
                    ultra_div.appendChild(button);
                    setTimeout(() => {
                        button.style.opacity = "1";
                    }, 1000);
                }, 600);
            }, 600);
        }
    });
});