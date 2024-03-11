// Свободная тренировка
document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input_text');
    const originalText = document.querySelector('.txt');
    let startTime;

    // Постоянный фокус на вводе
    inputText.onblur = function() {
        inputText.focus()
    }
  
    // Запрещение вставки текста
    inputText.onpaste = function(event) {
        event.preventDefault();
    }
      
    // Начало печатания
    inputText.addEventListener('input', function() {
        // Старт таймера
        if (!startTime) {
            startTime = new Date(); 
        }
        // Валидация инпута и проверка на правильность введенного символа
        const enteredText = inputText.value;
        const originalChars = originalText.querySelectorAll('span');
        let counter = 0;
        let counterAll = 0;
  
        for (let i = 0; i < originalChars.length; i++) {
            const originalChar = originalChars[i].textContent;
            const enteredChar = enteredText[i];
  
            if (!enteredChar) {
                originalChars[i].style.color = "rgb(128, 128, 128)";
            } else if (originalChar === enteredChar) {
                originalChars[i].style.color = "rgb(255, 255, 255)";
            counter++;
            } else {
            originalChars[i].style.color = "rgb(228, 44, 60)";
            }
            counterAll++;
        }
  
        // Отображение статистики на ввод
        if (enteredText.length >= originalText.getElementsByTagName('span').length) {
            const endTime = new Date();
            if (startTime && endTime >= startTime) {
                const timeDiff = (endTime - startTime) / 1000; // Разница времени в секундах
                const timeDisplay = `<p style="color: white;">${timeDiff.toFixed(0)} секунд</p>`; // Затраченное время
                const wpm = `<p style="color: white;">${((60 / timeDiff) * 50).toFixed(0)} слов в минуту</p>`; // Слов в минуту
                let percentage = ''
                if (counter > 0) {
                    percentage = `<p style="color: white;">${((counter/counterAll)*100).toFixed(0)}%</p>` // Проценты
                } else {
                    percentage = `<p style="color: white;">0%</p>`
                }

                // Скрываем ненужное и выводим данные на экран
                inputText.value = '';
                inputText.disabled = true;
                originalText.style.opacity = '0';
                document.getElementById('cursor').style.display = 'none';
  
                // Сами данные вводим в блоки
                document.querySelector('.time').innerHTML = timeDisplay
                document.querySelector('.wpm').innerHTML = wpm;
                document.querySelector('.percentage').innerHTML = percentage;  
  
                // Анимация показа
                setTimeout(() => {
                    document.querySelector('.results').style.height = originalText.offsetHeight + 'px';
                    originalText.style.display = 'none';
  
                    setTimeout(() => {
                        document.querySelector('.time').style.display = 'block';
                        document.querySelector('.wpm').style.display = 'block';
                        document.querySelector('.percentage').style.display = 'block';
  
                        setTimeout (() => {
                            document.querySelector('.time').style.opacity = '1';
                        }, 400);
  
                        setTimeout (() => {
                            document.querySelector('.wpm').style.opacity = '1';
                        }, 600);
  
                        setTimeout (() => {
                            document.querySelector('.percentage').style.opacity = '1'
                        }, 800);
  
                    }, 100);
  
                }, 1000);
            }
        }
    
        // Курсор
        const cursor = document.querySelector('.cursor');
        // Изменяем ему анимацию при начале ввода текста
        cursor.style.position = 'block';
        if (inputText.value.length !== 0) {
            cursor.style.animation = 'none'; // Отключаем анимацию мигания
        } else {
            cursor.style.animation = 'blink 1s infinite'; // Включаем анимацию мигания
        }
  
        // Перемещение курсора
        inputText.addEventListener('keydown', function(event) {

            //Backspace
            if (event.key === 'Backspace') {
                const cursor = document.querySelector('.cursor');
                if (enteredText.length > 0) {
                    const neededChar = 'char' + (enteredText.length - 1);
                    const cursorPosition = document.getElementById(neededChar).getBoundingClientRect();
                    cursor.style.left = cursorPosition.left + 'px';
                    cursor.style.top = cursorPosition.top + 'px';
                } 
            }
        });

        // Просто печатание
        const neededChar = 'char' + (enteredText.length - 1);
        const cursorPosition = document.getElementById(neededChar).getBoundingClientRect();
        cursor.style.left = cursorPosition.right + 'px';
        cursor.style.top = cursorPosition.top + 'px';

        //Баг с курсором при изменении размера окна
        window.addEventListener('resize', function() {
            cursor.style.display = 'none';
            const neededChar = 'char' + (enteredText.length - 1);
            const cursorPosition = document.getElementById(neededChar).getBoundingClientRect();
            cursor.style.left = cursorPosition.right + 'px';
            cursor.style.top = cursorPosition.top + 'px';
            setTimeout(() => {
                cursor.style.display = 'block';
            }, 1000);
        });
    });
        

    // Скрытие клавиатуры в зависимоти от окна
    // Когда окно меняется
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 810) {
            document.querySelector('.keyboard').style.display = 'none'
        } else {
            document.querySelector('.keyboard').style.display = 'block';
        }
    });
    
    // Когда загружен сайт
    window.addEventListener('DOMContentLoaded', function() {
        if (window.innerWidth <= 810) {
            document.querySelector('.keyboard').style.display = 'none'
        } else {
            document.querySelector('.keyboard').style.display = 'block';
        }
    });
});
