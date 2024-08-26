document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#button1');

    if (button) {
        button.addEventListener('click', () => {
            alert("АХУЕЛА МРАЗОТА");
        });
    }
});