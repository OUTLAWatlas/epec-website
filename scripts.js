
AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("fireflyCanvas");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  canvas.style.zIndex = "-1";

  const fireflies = Array.from({ length: 60 }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5,
    radius: Math.random() * 2 + 1,
    opacity: Math.random()
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
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
    requestAnimationFrame(animate);
  }

  animate();

  // Resize canvas on window resize
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
  });

  // Login logic
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
