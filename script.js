document.addEventListener("DOMContentLoaded", function () {



  console.log("Движущиеся текстуры");

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
    // root.style.setProperty("--background-position", `0px ${posY}px`);

    requestAnimationFrame(animateBackgroundPosition);
  }

  console.log("Карусель");

  document.querySelectorAll('.carousel').forEach(carouselContainer => {
    const rows = carouselContainer.querySelectorAll(".row");

    rows.forEach((carousel) => {
        // Кнопки и позиционные элементы
        const prevButtons = carouselContainer.querySelectorAll(".carousel-button.left");
        const nextButtons = carouselContainer.querySelectorAll(".carousel-button.right");
        const currentPositions = carouselContainer.querySelectorAll(".position .current");
        const totalPositions = carouselContainer.querySelectorAll(".position .all");
        const numbersContainer = carouselContainer.querySelector(".position .numbers");
        const bulletsContainer = carouselContainer.querySelector(".position .bullets");

        let cardWidth = carouselContainer.querySelector(".card").offsetWidth;
        let carouselWidth = carouselContainer.offsetWidth;
        let gap = parseInt(getComputedStyle(carousel).gap) || 0;
        let cardsPerView = Math.floor((carouselWidth + gap) / (cardWidth + gap));
        const totalCards = carousel.querySelectorAll(".card").length;

        let currentIndex = 0;

        function updateCarousel() {
            const offset = -(currentIndex * (cardWidth + gap));
            carousel.style.transform = `translateX(${offset}px)`;

            const endIndex = Math.min(currentIndex + cardsPerView, totalCards);
            currentPositions.forEach(position => position.textContent = endIndex);
            totalPositions.forEach(position => position.textContent = totalCards);

            // Обновляем позиционные кружки и номера
            updateBullets();
            updateNumbers();

            prevButtons.forEach(button => button.disabled = currentIndex === 0);
            nextButtons.forEach(button => button.disabled = endIndex >= totalCards);
        }

        function updateNumbers() {
            if (numbersContainer) {
                // Обновление старого счётчика
                numbersContainer.innerHTML = '';
                const currentNumber = document.createElement('span');
                currentNumber.className = 'current';
                currentNumber.textContent = currentIndex + 1; // Начинаем с 1
                numbersContainer.appendChild(currentNumber);
                const separator = document.createElement('span');
                separator.textContent = '/';
                numbersContainer.appendChild(separator);
                const totalNumber = document.createElement('span');
                totalNumber.className = 'all';
                totalNumber.textContent = totalCards;
                numbersContainer.appendChild(totalNumber);
            }
        }

        function updateBullets() {
            if (bulletsContainer) {
                // Очистить контейнер кружков
                bulletsContainer.innerHTML = '';

                for (let i = 0; i < totalCards; i++) {
                    const bullet = document.createElement('div');
                    bullet.className = 'bullet';
                    bullet.style.width = '10px';
                    bullet.style.height = '10px';
                    bullet.style.borderRadius = '50%';
                    bullet.style.backgroundColor = i === currentIndex ? '#313131' : '#D9D9D9';
                    bullet.style.display = 'inline-block';
                    bullet.style.margin = '0 2px';
                    bullet.style.cursor = 'pointer';

                    bullet.addEventListener('click', () => {
                        currentIndex = i;
                        updateCarousel();
                    });

                    bulletsContainer.appendChild(bullet);
                }
            }
        }

        function showNextRow() {
            if (currentIndex + cardsPerView < totalCards) {
                currentIndex += cardsPerView;
            } else {
                currentIndex = 0; // Сброс к первой позиции
            }
            updateCarousel();
        }

        function showPrevRow() {
            if (currentIndex > 0) {
                currentIndex -= cardsPerView;
                if (currentIndex < 0) currentIndex = 0; // Убедиться, что не уходит в отрицательные значения
                updateCarousel();
            }
        }

        nextButtons.forEach(button => button.addEventListener("click", showNextRow));
        prevButtons.forEach(button => button.addEventListener("click", showPrevRow));

        updateCarousel(); // Инициализация

        // Обновляем отображение при изменении размера окна
        window.addEventListener('resize', function () {
            cardWidth = carouselContainer.querySelector(".card").offsetWidth;
            carouselWidth = carouselContainer.offsetWidth;
            gap = parseInt(getComputedStyle(carousel).gap) || 0;
            cardsPerView = Math.floor((carouselWidth + gap) / (cardWidth + gap));
            const offset = -(currentIndex * (cardWidth + gap));

            carousel.style.transition = 'none'; // Отключаем анимацию
            carousel.style.transform = `translateX(${offset}px)`;
            setTimeout(() => {
                carousel.style.transition = ''; // Включаем анимацию
            }, 0);

            updateCarousel();
        });

        // Автоматическое перемещение вправо каждые 4 секунды только для каруселей с классом .cycled
        if (carouselContainer.classList.contains('cycled')) {
            setInterval(showNextRow, 4000);
        }
    });
});






  
});
