document.addEventListener("DOMContentLoaded", () => {
  // Create canvas element
  const canvas = document.createElement("canvas");
  canvas.id = "fireflyCanvas";
  
  // Add canvas to the DOM
  document.body.prepend(canvas);
  
  // Get 2D context for drawing
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions to match window
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Style canvas for proper positioning
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";
  canvas.style.opacity = "0.7";
  canvas.style.transition = "opacity 0.5s ease";

  // Firefly settings
  let fireflies = [];
  const fireflyCount = Math.min(150, Math.floor(width * height / 10000)); // Responsive count
  const colorVariations = [
    { r: 255, g: 255, b: 200 }, // Warm yellow
    { r: 200, g: 255, b: 255 }, // Light blue
    { r: 255, g: 220, b: 255 }, // Light pink
    { r: 220, g: 255, b: 220 }  // Light green
  ];

  // Helper function for random numbers
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Create a single firefly with random properties
  function createFirefly() {
    const colorVariation = colorVariations[Math.floor(Math.random() * colorVariations.length)];
    return {
      x: random(0, width),
      y: random(0, height),
      radius: random(0.8, 2.5),
      alpha: random(0.2, 0.9),
      dx: random(-0.5, 0.5),
      dy: random(-0.5, 0.5),
      pulseSpeed: random(0.01, 0.05),
      pulseDirection: 1,
      maxAlpha: random(0.7, 0.9),
      minAlpha: random(0.1, 0.3),
      color: colorVariation,
      angleX: random(0, Math.PI * 2),
      angleY: random(0, Math.PI * 2),
      angleSpeed: random(0.005, 0.02)
    };
  }

  // Initialize fireflies
  for (let i = 0; i < fireflyCount; i++) {
    fireflies.push(createFirefly());
  }

  // Function to draw fireflies on canvas
  function drawFireflies() {
    // Clear previous frame
    ctx.clearRect(0, 0, width, height);
    
    // Draw each firefly
    for (let i = 0; i < fireflyCount; i++) {
      const f = fireflies[i];
      
      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 3);
      gradient.addColorStop(0, `rgba(${f.color.r}, ${f.color.g}, ${f.color.b}, ${f.alpha})`);
      gradient.addColorStop(1, `rgba(${f.color.r}, ${f.color.g}, ${f.color.b}, 0)`);
      
      // Draw glowing firefly
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw core of firefly
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${f.color.r}, ${f.color.g}, ${f.color.b}, ${f.alpha + 0.1})`;
      ctx.fill();

      // Update position with slight sine wave motion
      f.x += f.dx + Math.sin(f.angleX) * 0.2;
      f.y += f.dy + Math.sin(f.angleY) * 0.2;
      f.angleX += f.angleSpeed;
      f.angleY += f.angleSpeed;

      // Pulse alpha for twinkling effect
      f.alpha += f.pulseSpeed * f.pulseDirection;
      if (f.alpha >= f.maxAlpha || f.alpha <= f.minAlpha) {
        f.pulseDirection *= -1;
      }
      
      // Reset firefly if it goes out of bounds
      if (f.x < -50 || f.x > width + 50 || f.y < -50 || f.y > height + 50) {
        fireflies[i] = createFirefly();
        
        // Randomly choose an edge to start from
        const edge = Math.floor(random(0, 4));
        switch(edge) {
          case 0: // Top
            fireflies[i].x = random(0, width);
            fireflies[i].y = -10;
            break;
          case 1: // Right
            fireflies[i].x = width + 10;
            fireflies[i].y = random(0, height);
            break;
          case 2: // Bottom
            fireflies[i].x = random(0, width);
            fireflies[i].y = height + 10;
            break;
          case 3: // Left
            fireflies[i].x = -10;
            fireflies[i].y = random(0, height);
            break;
        }
      }
    }

    // Continue animation
    requestAnimationFrame(drawFireflies);
  }

  // Start animation
  drawFireflies();

  // Adjust canvas on window resize
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });
    // Add opacity based on scroll position to make fireflies more subtle when content is in focus
  window.addEventListener("scroll", () => {
    const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const opacity = Math.max(0.3, 0.7 - scrollRatio * 0.4);
    canvas.style.opacity = opacity.toString();
    
    // Enhance firefly effect when viewing success stories section
    const successSection = document.getElementById("success-stories");
    if (successSection) {
      const rect = successSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInView) {
        // Slightly increase firefly brightness when viewing success stories
        canvas.style.opacity = Math.min(0.9, parseFloat(canvas.style.opacity) + 0.2).toString();
      }
    }
  });
  // Adjust opacity based on scroll position to make fireflies more subtle when content is in focus
  window.addEventListener("scroll", () => {
    const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const opacity = Math.max(0.3, 0.7 - scrollRatio * 0.4);
    canvas.style.opacity = opacity.toString();
  });
});