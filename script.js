document.addEventListener("DOMContentLoaded", function () {
    const root = document.documentElement; // Получаем корневой элемент
    const maxPosY = 1000;
    const speed = 0.25; // Скорость изменения
    let posY = 0;

    function animateBackgroundPosition() {
        posY -= speed;
        if (posY > maxPosY) {
            posY = 0; // Сбросить позицию при достижении максимального значения
        }

        // Обновляем переменную CSS --background-position в :root
        root.style.setProperty('--background-position', `0px ${posY}px`);

        requestAnimationFrame(animateBackgroundPosition);
    }

    animateBackgroundPosition();
});
