// Media changes
document.addEventListener('DOMContentLoaded', () => {
    const arrow_right = document.querySelector('.arrow-right img')
    const arrow_left = document.querySelector('.arrow-left img')
    const ultra_legend_card = document.querySelector('.ultra-legend-card')
    function handleMediaChange(e) {
        if (e.matches) {
            arrow_left.height = 45
            arrow_left.width = 45
            arrow_right.height = 45
            arrow_right.width = 45
            ultra_legend_card.setAttribute('src', 'imgs/ultra_legend_mobile.jpg')
        } else {
            arrow_left.height = 60
            arrow_left.width = 60
            arrow_right.height = 60
            arrow_right.width = 60
            ultra_legend_card.setAttribute('src', 'imgs/ultra_legend.jpg')
        }
    }

    const mediaQuery = window.matchMedia('(max-width: 630px)');
    mediaQuery.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQuery);
});

// Random generator
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
    document.getElementById("collection-images").style.width = "100%";
    document.getElementById("arrow-right").style.display = "none";
    document.getElementById("arrow-left").style.display = "block";
    collection.style.borderRadius = "10px";
    collection.style.border = "2px solid #272727";
    collection.style.backgroundColor = "#1b1b1b";
    collection.style.transition = '0.3s ease-out'
}

// Close collection
function close_bar() {
    const collection = document.getElementById("collection-images");
    document.getElementById("collection-images").style.width = "0";
    
    
    setTimeout(() => {
        document.getElementById("arrow-left").style.display = "none";
        document.getElementById("arrow-right").style.display = "block";
    }, 300);
    collection.style.borderRadius = "";
    collection.style.border = "";
    collection.style.backgroundColor = "";
    collection.style.transition = '0.3s ease-in'
}

//Return to the back after open ultra legend
function back() {
    const main = document.querySelectorAll('.main *:not(.ultra-legend-opened):not(.ultra-legend-opened .ultra-legend)')
    const back_button = document.querySelector(".back-button");
    const button_ultra = document.querySelector('#button-ultra')
    const ultra_legend = document.querySelector(".ultra-legend");
    const ultra_div = document.querySelector(".ultra-legend-opened");

    ultra_legend.classList.add('hidden-opacity');
    back_button.style.opacity = '0'
    setTimeout(() => {
        main.forEach(elem => {
            elem.classList.remove('hidden-display');
        })
        ultra_div.removeChild(back_button); 
        setTimeout(() => {
            main.forEach(elem => {
                elem.classList.remove('hidden-opacity');
            })
            ultra_legend.classList.add('hidden-display');
            back_button.style.display = 'none'
            button_ultra.removeAttribute("disabled", '')
        }, 600);
    }, 600);
}

// Easter egg
function easter_egg() {
    const photo = document.querySelector('.photo')
    const collection_images = document.querySelectorAll('.collection-image')
    const button = document.querySelector('.random-butt')

    let cnt = 0
    photo.addEventListener('click', () => {
        cnt+=1
        console.log(cnt)
        photo.removeAttribute('onclick', 'easter_egg()')
        if (cnt === 10) {
            document.body.style.backgroundImage = 'url("imgs/velchik.jpg")'
            button.setAttribute('disabled', '')
            photo.style.opacity = "0"
            collection_images.forEach(elem => {
                elem.setAttribute('src', 'imgs/velchik.jpg')
            })
            setTimeout(() => {
                photo.setAttribute('src', 'imgs/velchik.jpg')
                photo.style.opacity = '1'
            }, 1000);
        } 
    })
}

// Random fill and change of photos
document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('#button1')
    const photo = document.querySelector('.photo')
    const showleha = document.querySelector('.showleha')
    const rarity = document.querySelector('#rarity')

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
    })

// Unlock of ultra-legend card
document.addEventListener('DOMContentLoaded', () => {
    const button1 = document.querySelector('#button1')
    const button_ultra = document.querySelector('#button-ultra')
    const photo = document.querySelector(".ultra-legend")
    const ultra_div = document.querySelector('.ultra-legend-opened')
    const main = document.querySelectorAll('.main *:not(.ultra-legend-opened):not(.ultra-legend-opened *)')
    const caption_number = document.querySelector('.count-cards')
    const caption = document.querySelector('.ultra-legend-button-text')

    count = 0

    button1.addEventListener('click', () => {
        count += 1
        if (count >= 100) {
            button_ultra.style.animation = "shake 1.2s infinite"
            caption.innerHTML = 'Ультра легенда открыта!'
        } else {
            caption_number.innerHTML = 100-count
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

                const button = document.createElement('button');
                button.className = 'back-button hidden-opacity hidden-display';
                button.innerText = 'Вернуться назад';
                button.onclick = () => back();

                ultra_div.appendChild(button);
                setTimeout(() => {
                    photo.classList.remove('hidden-opacity');  
                    button.classList.remove('hidden-display')
                    // Create back button
                    
                    setTimeout(() => {
                        button.classList.remove('hidden-opacity');
                    }, 1000);
                }, 600);
            }, 600);
        }
    });
});
