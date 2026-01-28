// Countdown Timer
function startCountdown() {
  const conferenceDate = new Date("December 6, 2027 00:00:00").getTime();
  const countdownSection = document.getElementById("countdown-timer"); // target by ID
  const eventhapenning = document.getElementById("event-happening"); // target by ID

  
  function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = conferenceDate - now;

    if (timeLeft <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach((id) => {
        updateDigits(id, "00");
      });

      // ✅ Hide only this section
      if (countdownSection) {
        countdownSection.classList.add("h-hide");

      }
      if (eventhapenning) {
         eventhapenning.classList.add("show");; // show
      }
      // clearInterval(timerInterval);
      return;
    }


    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    updateDigits("days", String(days).padStart(2, "0"));
    updateDigits("hours", String(hours).padStart(2, "0"));
    updateDigits("minutes", String(minutes).padStart(2, "0"));
    updateDigits("seconds", String(seconds).padStart(2, "0"));
  }

  function updateDigits(id, value) {
    const container = document.getElementById(id);
    if (!container) return;

    container.innerHTML = "";
    value.split("").forEach((digit) => {
      const div = document.createElement("div");
      div.className = "countdown-item";
      div.textContent = digit;
      container.appendChild(div);
    });
  }



  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);
}



// Smooth scrolling for links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// Count-up animation for stats section
function countUpStats() {
  const counters = document.querySelectorAll('[id$="-count"]')
  const speed = 2000 // milliseconds per increment

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
          entry.target.classList.add("counted")
          const target = Number.parseInt(entry.target.getAttribute("data-target"))
          const element = entry.target
          let current = 0

          const increment = Math.ceil(target / 50)

          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              element.textContent = target + "+"
              clearInterval(timer)
            } else {
              element.textContent = current
            }
          }, speed / 50)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => observer.observe(counter))
}

// Initialize countdown when page loads
document.addEventListener("DOMContentLoaded", () => {
  startCountdown()
  countUpStats()


  // fade-in-up Animation (JavaScript)
  // This script applies a fade-in-up animation to elements with the class 'fade-in-up'
  // when they come into view as the user scrolls down the page.
  const elements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Only trigger once
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  elements.forEach((el) => observer.observe(el));
})
