window.addEventListener("DOMContentLoaded", (event) => {
  let typeSplit = new SplitType("[text-split]", {
    types: "words, chars",
    tagName: "span",
  });

  function createScrollTrigger2(element, tl) {
    ScrollTrigger.create({
      trigger: element,
      markers: true, // Enable markers for debugging
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });
  }

  document.querySelectorAll(".words-slide-up").forEach((element) => {
    let tl = gsap.timeline({ paused: true });
    tl.from(element.querySelectorAll(".char"), {
      opacity: 0,
      yPercent: 100,
      duration: 0.5,
      ease: "back.out(2)",
      stagger: { amount: 0.5 },
    });
    createScrollTrigger2(element, tl); // Pass native DOM element
  });

  // Make text visible after DOM load
  gsap.set("[text-split]", { opacity: 1 });
});
