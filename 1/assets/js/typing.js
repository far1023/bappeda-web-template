class TypingAnimation {
  constructor(element, words, options = {}) {
    this.element = element;
    this.words = words;
    this.currentWordIndex = 0;
    this.currentCharIndex = 0;
    this.isTyping = true;
    this.isDeleting = false;

    // Configuration options
    this.typeSpeed = options.typeSpeed || 150;
    this.deleteSpeed = options.deleteSpeed || 100;
    this.pauseTime = options.pauseTime || 2000;
    this.deleteDelay = options.deleteDelay || 1000;

    // Start the animation
    this.startAnimation();
  }

  startAnimation() {
    setTimeout(() => {
      this.type();
    }, 1000); // Initial delay
  }

  type() {
    const currentWord = this.words[this.currentWordIndex];

    if (this.isDeleting) {
      // Deleting characters
      this.element.textContent = currentWord.substring(
        0,
        this.currentCharIndex - 1
      );
      this.currentCharIndex--;

      // Add erasing effect class
      this.element.parentElement.classList.add("erasing-effect");
      this.element.parentElement.classList.remove("typing-effect");

      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        setTimeout(() => this.type(), this.pauseTime / 2);
      } else {
        setTimeout(() => this.type(), this.deleteSpeed);
      }
    } else {
      // Typing characters
      this.element.textContent = currentWord.substring(
        0,
        this.currentCharIndex + 1
      );
      this.currentCharIndex++;

      // Add typing effect class
      this.element.parentElement.classList.add("typing-effect");
      this.element.parentElement.classList.remove("erasing-effect");

      if (this.currentCharIndex === currentWord.length) {
        // Word complete, pause then start deleting
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.pauseTime);
      } else {
        setTimeout(() => this.type(), this.typeSpeed);
      }
    }
  }

  // Method to restart animation
  restart() {
    this.currentWordIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.element.textContent = "";
    this.startAnimation();
  }
}

// Initialize the typing animation when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const typedWordElement = document.getElementById("typedWord");

  // Array of positive words to cycle through
  const positiveWords = [
    "Gemilang",
    "Berkembang",
    "Maju",
    "Sejahtera",
    "Berdaya",
    "Bersinar",
    "Bertumbuh",
    "Mandiri",
    "Inovatif",
    "Harmonis",
    "Dinamis",
    "Berdikari",
  ];

  // Create typing animation instance
  window.typingAnimation = new TypingAnimation(
    typedWordElement,
    positiveWords,
    {
      typeSpeed: 120,
      deleteSpeed: 80,
      pauseTime: 2500,
      deleteDelay: 1000,
    }
  );
});

// Function to restart animation (called by button)
function restartAnimation() {
  if (window.typingAnimation) {
    window.typingAnimation.restart();
  }

  // Add button click effect
  const button = event.target;
  button.style.transform = "scale(0.95)";
  setTimeout(() => {
    button.style.transform = "translateY(-3px)";
  }, 150);
}

// Add some interactive effects
document.addEventListener("mousemove", function (e) {
  const sparkles = document.querySelectorAll(".sparkle");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  sparkles.forEach((sparkle, index) => {
    const speed = (index + 1) * 0.5;
    const x = mouseX * speed;
    const y = mouseY * speed;

    sparkle.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });
});

// Add scroll effect if needed
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  const heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.style.transform = `translateY(${rate}px)`;
  }
});
