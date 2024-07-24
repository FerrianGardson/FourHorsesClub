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

  const carousel = document.querySelector(".carousel");
  const row = document.querySelector(".carousel .row");
  const prevButton = document.querySelectorAll(".carousel-button.left");
  const nextButton = document.querySelectorAll(".carousel-button.right");
  const currentPosition = document.querySelector(".position .current");
  const totalPosition = document.querySelector(".position .all");

  
  let currentIndex = 0;

  function updateCarousel() {
    const containerWidth = carousel.offsetWidth;
    const memberWidth = row.querySelector(".member").offsetWidth;
    const visibleCount = Math.floor(containerWidth / memberWidth);
    const totalMembers = row.children.length;

    const totalRows = Math.ceil(totalMembers / visibleCount);
    const offset = -currentIndex * containerWidth;

    row.style.transition = "transform 0.5s ease-in-out";
    row.style.transform = `translateX(${offset}px)`;

    // Обновляем счётчик
    const startIndex = currentIndex * visibleCount + 1;
    const endIndex = Math.min(startIndex + visibleCount - 1, totalMembers);

    currentPosition.textContent = `${endIndex}`;
    totalPosition.textContent = totalMembers;

    updateButtons();
  }

  function updateButtons() {
    const containerWidth = carousel.offsetWidth;
    const memberWidth = row.querySelector(".member").offsetWidth;
    const visibleCount = Math.floor(containerWidth / memberWidth);
    const totalMembers = row.children.length;

    const totalRows = Math.ceil(totalMembers / visibleCount);

    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= totalRows - 1;
  }

  function showNextRow() {
    const containerWidth = carousel.offsetWidth;
    const memberWidth = row.querySelector(".member").offsetWidth;
    const visibleCount = Math.floor(containerWidth / memberWidth);
    const totalMembers = row.children.length;

    const totalRows = Math.ceil(totalMembers / visibleCount);

    if (currentIndex < totalRows - 1) {
      currentIndex++;
      updateCarousel();
    }
  }

  function showPrevRow() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  nextButton.addEventListener("click", showNextRow);
  prevButton.addEventListener("click", showPrevRow);

  window.addEventListener("resize", updateCarousel); // Обновляем карусель при изменении размера окна

  updateCarousel(); // Инициализация карусели


});
