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

  const carousel = document.querySelector(".carousel .row");
  const prevButtons = document.querySelectorAll(".carousel-button.left");
  const nextButtons = document.querySelectorAll(".carousel-button.right");
  const currentPositions = document.querySelectorAll(".position .current");
  const totalPositions = document.querySelectorAll(".position .all");
  
  const memberWidth = document.querySelector(".member").offsetWidth;
  const carouselWidth = document.querySelector(".carousel").offsetWidth;
  const gap = parseInt(getComputedStyle(carousel).gap);
  const membersPerView = Math.floor((carouselWidth + gap) / (memberWidth + gap));
  const totalMembers = document.querySelectorAll(".carousel .member").length;
  
  let currentIndex = 0;
  
  totalPositions.forEach(position => position.textContent = totalMembers);
  
  function updateCarousel() {
      const offset = -(currentIndex * (memberWidth + gap));
      carousel.style.transform = `translateX(${offset}px)`;
  
      const endIndex = Math.min(currentIndex + membersPerView, totalMembers);
      currentPositions.forEach(position => position.textContent = endIndex);
  
      prevButtons.forEach(button => button.disabled = currentIndex === 0);
      nextButtons.forEach(button => button.disabled = endIndex >= totalMembers);
  }
  
  function showNextRow() {
      if (currentIndex + membersPerView < totalMembers) {
          currentIndex += membersPerView;
      } else {
          currentIndex = 0; // Reset to first position
      }
      updateCarousel();
  }
  
  function showPrevRow() {
      if (currentIndex > 0) {
          currentIndex -= membersPerView;
          if (currentIndex < 0) currentIndex = 0; // Make sure it doesn't go negative
          updateCarousel();
      }
  }
  
  nextButtons.forEach(button => button.addEventListener("click", showNextRow));
  prevButtons.forEach(button => button.addEventListener("click", showPrevRow));
  
  updateCarousel(); // Инициализация
  
  // Обновляем отображение при изменении размера окна
  window.addEventListener('resize', function () {
      const newMemberWidth = document.querySelector(".member").offsetWidth;
      const newCarouselWidth = document.querySelector(".carousel").offsetWidth;
      const newGap = parseInt(getComputedStyle(carousel).gap);
      const newMembersPerView = Math.floor((newCarouselWidth + newGap) / (newMemberWidth + newGap));
      const offset = -(currentIndex * (newMemberWidth + newGap));
  
      carousel.style.transition = 'none'; // Отключаем анимацию
      carousel.style.transform = `translateX(${offset}px)`;
      setTimeout(() => {
          carousel.style.transition = ''; // Включаем анимацию
      }, 0);
  
      updateCarousel();
  });
  
  // Автоматическое перемещение вправо каждые 4 секунды
  setInterval(showNextRow, 4000);
  






  
});
