const primaryHeader = document.querySelector(".primaery-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener('click', () => {
    primaryNav.hasAttribute('data-visible') 
    ? navToggle.setAttribute("aria-expanded", false)
    : navToggle.setAttribute("aria-expanded", true);
    primaryNav.toggleAttribute('data-visible');
    primaryHeader.toggleAttribute('data-overlay');
});


const offers = document.querySelectorAll('.offer-container');

offers.forEach(offer => {
  const arrow = offer.querySelector('.arrow');
  let animationInterval;

  offer.addEventListener('mouseenter', () => {
    let direction = 1;
    const distance = 3;

    animationInterval = setInterval(() => {
      arrow.style.transform = `translateX(${direction * distance}px)`;
      direction *= -1;
    }, 300);
  });

  offer.addEventListener('mouseleave', () => {
    clearInterval(animationInterval);
    arrow.style.transition = 'transform 0.3s ease-in-out';
    arrow.style.transform = 'translateX(0)';
  });
});
