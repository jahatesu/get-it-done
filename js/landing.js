gsap.registerPlugin(ScrollTrigger);
// LANDING PAGE
const cards = gsap.utils.toArray(".card");
const lastCardIndex = cards.length - 1;

const firstCardST = ScrollTrigger.create({
  trigger: cards[1],
  start: "center center"
});

const lastCardST = ScrollTrigger.create({
  trigger: cards[cards.length - 1],
  start: "center center"
});

cards.forEach((card, index) => {
  const scale = index === lastCardIndex ? 1 : 0.5;
  const scaleDown = gsap.to(card, {
    scale: scale,
  });

  ScrollTrigger.create({
    trigger: card,
    start: "top top",
    end: () => lastCardST.start,
    pin: true,
    pinSpacing: false,
    scrub: 0.5,
    ease: "none",
    animation: scaleDown,
    toggleActions: "restart none none reverse"
  });
});