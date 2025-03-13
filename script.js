document.addEventListener('DOMContentLoaded', () => {
  // Get all icon wrappers
  const wrappers = [
    document.getElementById('wrapper-triangle'),
    document.getElementById('wrapper-circle'),
    document.getElementById('wrapper-x'),
    document.getElementById('wrapper-square')
  ];
  
  // Get all SVG icons
  const icons = [
    document.getElementById('triangle'),
    document.getElementById('circle'),
    document.getElementById('x'),
    document.getElementById('square')
  ];
      
  // Configure animation
  const radius = 50; // Radius of the circular path
  const iconDuration = 1.5; // Duration for one icon's appearance
  const completeCycleDuration = iconDuration * wrappers.length; // Full cycle through all icons
      
  // Create a master timeline
  const masterTimeline = gsap.timeline({
    repeat: -1
  });
      
  // Hide all icons initially
  gsap.set(wrappers, { opacity: 0, scale: 0.5 });
      
  // Create individual animations for each icon
  wrappers.forEach((wrapper, index) => {
    const iconTimeline = gsap.timeline();
          
    // Fade in and scale up
    iconTimeline.to(wrapper, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
          
    // Create a circular path
    iconTimeline.to(wrapper, {
      duration: iconDuration - 0.6, // Leave time for fade in/out
      motionPath: {
        path: function() {
          return [{x: radius, y: 0}, {x: 0, y: radius}, {x: -radius, y: 0}, {x: 0, y: -radius}, {x: radius, y: 0}];
        },
        type: "cubic",
        curviness: 1.8,
        autoRotate: false
      },
      ease: "power1.inOut"
    }, 0.3); // Start after fade in
          
    // Different animations for different icons
    if (index === 0) { // For triangle (index 0)
      // Flip animation for triangle
      iconTimeline.to(icons[index], {
        scaleX: -1,
        repeat: 1,
        yoyo: true,
        transformOrigin: "center center",
        duration: (iconDuration - 0.6) / 2,
        ease: "power1.inOut"
      }, 0.3);
    } else if (index === 1) { // For circle
      // Squash and stretch animation synchronized with bounce
      // Create a timeline specifically for the circle's squash and stretch
      const circleElasticTimeline = gsap.timeline({
        repeat: 1, // Repeat once to match with bounce (which happens 3 times, but we have 4 animations)
        yoyo: true
      });
      
      circleElasticTimeline
        .to(icons[index], { 
          scaleX: 1.3, 
          scaleY: 0.7,
          duration: 0.2,
          ease: "power1.inOut" 
        })
        .to(icons[index], { 
          scaleX: 0.7, 
          scaleY: 1.3, 
          duration: 0.2,
          ease: "power1.inOut" 
        });
      
      // Add the elastic timeline to the main icon timeline, starting at the same time as the bounce
      iconTimeline.add(circleElasticTimeline, 0.3);
      
    } else if (index === 3) { // For square (index 3)
      // Pulsing effect for square
      iconTimeline.to(icons[index], { 
        scale: 1.2, 
        repeat: 3, 
        yoyo: true, 
        transformOrigin: "center center", 
        duration: (iconDuration - 0.6) / 3, 
        ease: "sine.inOut" 
      }, 0.3);
    } else {
      // Original rotation for X icon
      iconTimeline.to(icons[index], {
        rotation: 360,
        transformOrigin: "center center",
        duration: iconDuration - 0.6,
        ease: "none"
      }, 0.3);
    }
          
    // Add small bounce effect
    iconTimeline.to(wrapper, {
      y: '+=5',
      repeat: 3,
      yoyo: true,
      duration: 0.2,
      ease: "power1.inOut"
    }, 0.3);
          
    // Fade out and scale down at the end
    iconTimeline.to(wrapper, {
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      ease: "power2.in"
    }, iconDuration - 0.3);
          
    // Add this icon's timeline to the master timeline
    masterTimeline.add(iconTimeline, index * iconDuration);
  });
});