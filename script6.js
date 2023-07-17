const lengthSlider = document.querySelector('.pass-length input');
const options = document.querySelectorAll('.option input');
const generateBtn = document.querySelector('.generate-btn');
const passwordInput = document.querySelector('.input-box input');
const passIndicator = document.querySelector('.pass-indicator');
const copyIcon = document.querySelector('.input-box span');

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()"
};

const generatePassword = () => {
    let staticPassword = '';
    let passLength = lengthSlider.value;
    let excludeDuplicate = false;
    let randomPassword = '';

    Array.from(options).forEach(option => {
        if (option.checked) {
            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
                staticPassword += characters[option.id];
            } else if (option.id === 'spaces') {
                staticPassword += ' ';
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword.charAt(Math.floor(Math.random() * staticPassword.length));
        if (excludeDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar === ' ') {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else {
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;
};

const updateSlider = () => {
    document.querySelector('.pass-length span').innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
};

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 15 ? "medium" : "strong";
}

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);

}

updateSlider();

lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);
copyIcon.addEventListener('click', copyPassword);
