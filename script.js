document.addEventListener("DOMContentLoaded", function () {
  // console.log("Анимация шума");

  let backgroundPositionY = 0;
  document.documentElement.style.setProperty(
    "--background-position",
    `0px 0px`
  );

  function updateBackgroundPosition() {
    backgroundPositionY += 1000;
    document.documentElement.style.setProperty(
      "--background-position",
      `${backgroundPositionY}px 0px`
    );
  }

  // Немедленный первый вызов
  updateBackgroundPosition();

  // Повторный вызов каждые 10 секунд
  setInterval(updateBackgroundPosition, 10000);

  // console.log("Карусель");

  document.querySelectorAll(".carousel").forEach((carouselContainer) => {
    const rows = carouselContainer.querySelectorAll(".row");

    rows.forEach((carousel) => {
      // Кнопки и позиционные элементы
      const prevButtons = carouselContainer.querySelectorAll(
        ".carousel-button.left"
      );
      const nextButtons = carouselContainer.querySelectorAll(
        ".carousel-button.right"
      );
      const currentPositions =
        carouselContainer.querySelectorAll(".position .current");
      const totalPositions =
        carouselContainer.querySelectorAll(".position .all");
      const numbersContainer =
        carouselContainer.querySelector(".position .numbers");
      const bulletsContainer =
        carouselContainer.querySelector(".position .bullets");

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
        currentPositions.forEach(
          (position) => (position.textContent = endIndex)
        );
        totalPositions.forEach(
          (position) => (position.textContent = totalCards)
        );

        // Обновляем позиционные кружки и номера
        updateBullets();
        updateNumbers();

        prevButtons.forEach((button) => (button.disabled = currentIndex === 0));
        nextButtons.forEach(
          (button) => (button.disabled = endIndex >= totalCards)
        );
      }

      function updateNumbers() {
        if (numbersContainer) {
          // Обновление старого счётчика
          numbersContainer.innerHTML = "";
          const currentNumber = document.createElement("span");
          currentNumber.className = "current";
          currentNumber.textContent = currentIndex + 1; // Начинаем с 1
          numbersContainer.appendChild(currentNumber);
          const separator = document.createElement("span");
          separator.textContent = "/";
          numbersContainer.appendChild(separator);
          const totalNumber = document.createElement("span");
          totalNumber.className = "all";
          totalNumber.textContent = totalCards;
          numbersContainer.appendChild(totalNumber);
        }
      }

      function updateBullets() {
        if (bulletsContainer) {
          // Очистить контейнер кружков
          bulletsContainer.innerHTML = "";

          for (let i = 0; i < totalCards; i++) {
            const bullet = document.createElement("div");
            bullet.className = i === currentIndex ? "bullet active" : "bullet";

            bullet.addEventListener("click", () => {
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

      nextButtons.forEach((button) =>
        button.addEventListener("click", showNextRow)
      );
      prevButtons.forEach((button) =>
        button.addEventListener("click", showPrevRow)
      );

      updateCarousel(); // Инициализация

      // Обновляем отображение при изменении размера окна
      window.addEventListener("resize", function () {
        cardWidth = carouselContainer.querySelector(".card").offsetWidth;
        carouselWidth = carouselContainer.offsetWidth;
        gap = parseInt(getComputedStyle(carousel).gap) || 0;
        cardsPerView = Math.floor((carouselWidth + gap) / (cardWidth + gap));
        const offset = -(currentIndex * (cardWidth + gap));

        carousel.style.transition = "none"; // Отключаем анимацию
        carousel.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {
          carousel.style.transition = ""; // Включаем анимацию
        }, 0);

        updateCarousel();
      });

      // Автоматическое перемещение вправо каждые 4 секунды только для каруселей с классом .cycled
      if (carouselContainer.classList.contains("cycled")) {
        setInterval(showNextRow, 4000);
      }
    });
  });
});
