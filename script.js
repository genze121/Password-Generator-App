const passwordInput = document.querySelector(".input-box input");
const copyIcon = document.querySelector(".input-box span");
let passwordIndicator = document.querySelector(".pass-indicator");
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const generateButton = document.querySelector(".generate-btn");

// Characters for options
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*(){}[]<>~"
};

// Generating Password
const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  // When we click on options, PassGenerator works according to options
  options.forEach(option => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `${staticPassword}`;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  // When passLength is updated, characters and passLength should also change.
  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar)
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  passwordInput.value = randomPassword;
};

// when number passLength is update, their color will change
const updatePasswordIndicator = () => {
  passwordIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePasswordIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordIndicator.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285f4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "707070";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateButton.addEventListener("click", generatePassword);
