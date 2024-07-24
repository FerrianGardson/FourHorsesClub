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

console.log('Карусель');

const carousel = document.querySelector(".carousel");
const rows = document.querySelector(".carousel .row");
const prevButton = document.querySelector(".carousel-button.left");
const nextButton = document.querySelector(".carousel-button.right");
const currentPosition = document.querySelector(".position .current");
const totalPosition = document.querySelector(".position .all");

let currentIndex = 0;
const members = document.querySelectorAll(".carousel .member");
const totalMembers = members.length;

function updateCarousel() {
  const containerWidth = carousel.offsetWidth;
  const memberWidth = members[0].offsetWidth;
  const visibleCount = Math.floor(containerWidth / memberWidth);
  const totalRows = Math.ceil(totalMembers / visibleCount);

  const offset = -currentIndex * (memberWidth * visibleCount);
  carousel.style.transition = "transform 0.5s ease-in-out";
  carousel.style.transform = `translateX(${offset}px)`;
  
  currentPosition.textContent = Math.ceil((currentIndex + 1) / visibleCount);
  totalPosition.textContent = totalRows;

  // Обновляем состояние кнопок
  updateButtons();
}

function updateButtons() {
  const containerWidth = carousel.offsetWidth;
  const memberWidth = members[0].offsetWidth;
  const visibleCount = Math.floor(containerWidth / memberWidth);
  const totalRows = Math.ceil(totalMembers / visibleCount);

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex >= totalRows - 1;
}

function showNextRow() {
  const containerWidth = carousel.offsetWidth;
  const memberWidth = members[0].offsetWidth;
  const visibleCount = Math.floor(containerWidth / memberWidth);
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
