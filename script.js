document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToVideo");
  const videoSection = document.getElementById("video-romantis");
  const pages = document.querySelectorAll(".page");
  let currentPage = 0;

  const flipSound = new Audio("audio/flip.mp3");
  // ❄️ Efek Salju Putih ❄️
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.textContent ="✻";
    snowflake.classList.add("snowflake");
    snowflake.style.position = "fixed";
    snowflake.style.top = "-10px";
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
    snowflake.style.opacity = Math.random();
    snowflake.style.color = "white";
    snowflake.style.zIndex = 999;
    snowflake.style.pointerEvents = "none";
    snowflake.style.animation = `fall ${Math.random() * 5 + 5}s linear`;

    document.body.appendChild(snowflake);

    // Hapus setelah animasi selesai
    setTimeout(() => {
      snowflake.remove();
    }, 10000);
  }

  setInterval(createSnowflake, 200);

  // Tambahkan animasi CSS lewat JS
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);


    // === TAMBAHAN TOMBOL DARK MODE DI POJOK KANAN ATAS ===
  const toggleButton = document.createElement("button");
  toggleButton.id = "toggleDarkMode";
  toggleButton.textContent = "☀️"; // default terang
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    toggleButton.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "☀️";
  });


  // Fungsi animasi mengetik
  function typeText(element, text, speed = 100, callback) {
    element.textContent = '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        element.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
        if (callback) callback();
      }
    }, speed);
  }

  const loveTexts = [
    "jadi kekasihku saja.",
    "katakan cinta💖.",
    "hati ini meminta.",
    "kau lebih dari teman berbagi.",
    "jadi kekasih ku saja.",
    "cinta katakan cinta💖.",
    "hati ini meminta .",
    "kau lebih dari teman berbagi 💖"
    
    
  ];

  // Fungsi untuk buka halaman ke indeks tertentu dengan looping dan reset teks halaman lain
  function openPage(index) {
    if (index >= pages.length) {
      index = 0; // Loop balik ke halaman pertama
    } else if (index < 0) {
      index = pages.length - 1; // Kalau perlu support ke belakang juga
    }

    // Balikkan halaman dan reset teks semua halaman dulu
    pages.forEach((page, i) => {
      if (i < index) {
        page.classList.add("flipped");
      } else {
        page.classList.remove("flipped");
      }

      // Reset teks semua halaman (hapus teks sementara)
      const loveTextElem = page.querySelector(".love-text");
      if (loveTextElem) loveTextElem.textContent = '';
    });

    currentPage = index;

    // Animasi teks mengetik di halaman yang aktif
    const loveTextElem = pages[index].querySelector(".love-text");
    if (loveTextElem) {
      typeText(loveTextElem, loveTexts[index], 80);
    }
  }

  // Pas load pertama langsung buka halaman pertama dengan animasi teks
  openPage(0);

// === Play musik saat foto pertama diklik ===
const bgMusic = document.getElementById("bg-music");
let musicStarted = false;

document.querySelector(".book").addEventListener("click", function () {
  if (!musicStarted) {
    bgMusic.play().catch(e => {
      console.log("Auto-play ditolak, user harus interaksi dulu.");
    });
    musicStarted = true;
  }
});


  // Tombol scroll ke video
  scrollBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    videoSection.scrollIntoView({ behavior: "smooth" });
  });

  // Klik body (kecuali tombol) untuk flip maju/balik halaman dengan looping
  document.body.addEventListener("click", function (e) {
    if (scrollBtn.contains(e.target)) return; // jangan proses klik tombol
    if (toggleButton.contains(e.target)) return; // jangan proses klik tombol dark mode

    if (e.shiftKey) {
      // Kalau tekan shift + klik: balik halaman
      openPage(currentPage - 1);
      flipSound.currentTime = 0;
      flipSound.play();
    } else {
      // Klik biasa: maju halaman dengan looping
      openPage(currentPage + 1);
      flipSound.currentTime = 0;
      flipSound.play();
    }
  });

  // Intersection Observer untuk animasi video
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  observer.observe(videoSection);
});