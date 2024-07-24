document.addEventListener("DOMContentLoaded", function () {
    const runningLine = document.getElementById("running-line");

    if (!runningLine) {
        console.error('Element with id "running-line" not found.');
        return;
    }

    // Дублируем содержимое и добавляем клоны в конец элемента
    const clone1 = runningLine.cloneNode(true);
    const clone2 = runningLine.cloneNode(true);
    const clone3 = runningLine.cloneNode(true);

    runningLine.appendChild(clone1);
    runningLine.appendChild(clone2);
    runningLine.appendChild(clone3);

    // Определяем ширину содержимого и начальное смещение
    const contentWidth = runningLine.scrollWidth;
    const containerWidth = runningLine.offsetWidth;
    let scrollAmount = containerWidth; // Начинаем с полной ширины контейнера

    function scroll() {
        scrollAmount -= 2; // Скорость прокрутки
        // Сбросить позицию при полном уходе контента за левый край
        if (scrollAmount <= -contentWidth) {
            scrollAmount = containerWidth; // Сбросить позицию
        }
        runningLine.style.transform = `translateX(${scrollAmount}px)`;
        requestAnimationFrame(scroll);
    }

    scroll();
});
