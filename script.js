document.addEventListener("DOMContentLoaded", function() {
    const runningLine = document.getElementById('running-line');
    
    if (!runningLine) {
        console.error('Element with id "running-line" not found.');
        return;
    }

    const contentWidth = runningLine.scrollWidth;
    const containerWidth = runningLine.offsetWidth;
    let scrollAmount = 0;

    function scroll() {
        scrollAmount -= 1; // Скорость прокрутки
        if (-scrollAmount >= contentWidth) {
            scrollAmount = containerWidth; // Сбросить позицию при полном скролле
        }
        runningLine.style.transform = `translateX(${scrollAmount}px)`;
        requestAnimationFrame(scroll);
    }

    scroll();
});
