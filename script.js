// GSAP https://unpkg.com/gsap@3/dist/gsap.min.js

// Initial entry animations
const tl = gsap.timeline();

// Triangle animation
tl.fromTo("#triangle", {
  y: -70,
  scale: 0.4,
  opacity: 0
}, {
  y: 0,
  scale: 1,
  opacity: 1,
  duration: 1,
  ease: "elastic.out(1, 0.5)"
});

// Circle animation
tl.fromTo("#circle", {
  scale: 0.4,
  opacity: 0
}, {
  scale: 1,
  opacity: 1,
  duration: 0.8,
  ease: "back.out(1.7)"
}, "-=0.6");

// X animation with path drawing
tl.fromTo("#x", {
  rotation: -360,
  scale: 0.4,
  opacity: 0
}, {
  rotation: 0,
  scale: 1,
  opacity: 1,
  duration: 0.8,
  ease: "power2.out"
}, "-=0.6");

// Square animation with morphing effect
tl.fromTo("#square", {
  y: 80,
  opacity: 0,
  scale: 0.7
}, {
  y: 0,
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: "back.out(1.4)"
}, "-=0.6");

// Liquid effect on icons
function createLiquidEffect(icon) {
  for (let i = 0; i < 5; i++) {
    const droplet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    droplet.setAttribute("class", "droplet");
    icon.appendChild(droplet);

    gsap.set(droplet, {
      attr: {
        cx: gsap.utils.random(8, 16),
        cy: 24,
        r: gsap.utils.random(1, 2)
      },
      opacity: 0
    });

    gsap.timeline({ repeat: -1, repeatDelay: gsap.utils.random(2, 4) })
      .to(droplet, {
        attr: { cy: gsap.utils.random(-30, -50), r: gsap.utils.random(3, 5) },
        opacity: 1,
        duration: gsap.utils.random(3, 5),
        ease: "power1.out"
      })
      .to(droplet, {
        attr: { r: 0 },
        opacity: 0,
        duration: 0.5
      });
  }
}

gsap.utils.toArray("svg").forEach(icon => createLiquidEffect(icon));

// rotating box effect
const boxContainer = document.createElement('div');
boxContainer.setAttribute('id', 'allBoxes');
document.body.appendChild(boxContainer);

for (let i = 0; i < 10; i++) {
  const box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  gsap.set(box, {
    attr: {
      width: 20,
      height: 20,
      x: i * 24,
      y: 100,
      fill: "#00f"
    }
  });
  boxContainer.appendChild(box);
}

let boxTl = gsap.timeline({ repeat: -1 });
boxTl.to("#allBoxes rect", {
  transformOrigin: "107% 50%",
  rotation: gsap.utils.wrap([180, -180]),
  stagger: {
    each: 0.14
  }
}).to("#allBoxes", {
  x: -112,
  duration: boxTl.recent().duration(),
  ease: "linear"
}, 0);

// hover effects with GSAP
const icons = document.querySelectorAll('svg');
const colors = {
  triangle: "#00ff00",
  circle: "#ff0000",
  x: "#00ffff",
  square: "#ff00ff"
};

icons.forEach(icon => {
  const id = icon.id;
  const color = colors[id];

  const hoverTl = gsap.timeline({ paused: true });

  hoverTl.to(icon, {
    scale: 1.3,
    y: -10,
    stroke: color,
    duration: 0.3,
    ease: "back.out(1.7)",
    filter: `drop-shadow(0px 0px 20px ${color}) drop-shadow(0px 0px 40px ${color})`
  });

  icon.addEventListener("mouseenter", () => hoverTl.play());
  icon.addEventListener("mouseleave", () => hoverTl.reverse());
});

document.querySelector('.container').style.perspective = '1000px';
icons.forEach(icon => {
  icon.style.transformStyle = 'preserve-3d';
});



