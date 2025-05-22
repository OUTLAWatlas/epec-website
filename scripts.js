AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("fireflyCanvas");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  canvas.style.zIndex = "-1";

  let theme = document.body.classList.contains("theme-dark") ? "dark" : "light";

  // Fireflies for dark theme
  const fireflies = Array.from({ length: 60 }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5,
    radius: Math.random() * 2 + 1,
    opacity: Math.random()
  }));

  // Clouds for light theme
  const clouds = Array.from({ length: 5 }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * (height / 2),
    speed: Math.random() * 0.3 + 0.2,
    size: Math.random() * 40 + 60
  }));

  function drawSun() {
    const sunX = width - 100;
    const sunY = 100;
    const sunRadius = 40;

    ctx.beginPath();
    ctx.arc(sunX, sunY, sunRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 204, 0, 0.9)";
    ctx.fill();
  }

  function drawMoon() {
    const moonX = width - 100;
    const moonY = 100;
    const moonRadius = 35;

    // Glow effect
    const gradient = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonRadius * 1.5);
    gradient.addColorStop(0, "rgba(255, 255, 210, 0.8)");
    gradient.addColorStop(1, "rgba(255, 255, 210, 0)");

    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius * 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Moon body
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 210, 0.95)";
    ctx.fill();
  }

  function drawCloud(x, y, size) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.ellipse(x, y, size, size * 0.6, 0, 0, 2 * Math.PI);
    ctx.ellipse(x + size * 0.6, y, size, size * 0.6, 0, 0, 2 * Math.PI);
    ctx.ellipse(x - size * 0.6, y, size, size * 0.6, 0, 0, 2 * Math.PI);
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    if (theme === "dark") {
      drawMoon();
      for (let f of fireflies) {
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,200,${f.opacity})`;
        ctx.fill();
        f.x += f.dx;
        f.y += f.dy;
        if (f.x < 0 || f.x > width) f.dx *= -1;
        if (f.y < 0 || f.y > height) f.dy *= -1;
      }
    } else {
      drawSun();
      for (let c of clouds) {
        drawCloud(c.x, c.y, c.size);
        c.x += c.speed;
        if (c.x - c.size > width) {
          c.x = -c.size;
          c.y = Math.random() * (height / 2);
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();

  // Resize canvas
  window.addEventListener("resize", () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  // Theme toggle
  const toggleBtn = document.getElementById("darkModeToggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
    document.body.classList.toggle("theme-light");
    theme = document.body.classList.contains("theme-dark") ? "dark" : "light";
  });

  // Login form validation
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const alertBox = $("#loginAlert");

    if (!email.endsWith("@vit.edu")) {
      alertBox.html('<div class="alert alert-danger">Only @vit.edu emails allowed.</div>');
      return;
    }

    if (password.length < 6) {
      alertBox.html('<div class="alert alert-warning">Password must be at least 6 characters.</div>');
      return;
    }

    alertBox.html('<div class="alert alert-success">Login successful! Redirecting...</div>');
    setTimeout(() => window.location.href = "main.html", 1500);
  });
});
