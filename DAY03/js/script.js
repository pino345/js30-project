// dark mode
const root = document.documentElement;
const themeSwitch = document.querySelector('#theme-switch');

function modeUpdate() {
    if (themeSwitch.checked == true) {
        root.style.setProperty(`--background-color`, 'black');
        root.style.setProperty(`--color`, 'white');
    } else {
        root.style.setProperty(`--background-color`, 'white');
        root.style.setProperty(`--color`, 'black');
    }
}

// handle option
const inputs = document.querySelectorAll('div > input')

function handleUpdate() { 
    const suffix = this.dataset.sizing || '';
    root.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mouseover', handleUpdate));

// option style
const fontSize =document.querySelector('#font-size');
const letterSpacing = document.querySelector('#letter-spacing');
const blur = document.querySelector('#blur');
let fValue = document.querySelector('.font-size-now');
let lValue = document.querySelector('.letter-spacing-now');
let bValue = document.querySelector('.blur-now');

function init(f, l ,b) {
    fValue.innerHTML = f + "rem";
    lValue.innerHTML = l + "px";
    bValue.innerHTML = b + "px";
}

function showSizef(f) {
    fValue.innerHTML = f + "rem"
}

function showSizel(l) {
    lValue.innerHTML = l + "px"
}

function showSize(b) {
    bValue.innerHTML = b + "px"
}

function updateRangel (l) {
    let percent = b * 50
    root.style.setProperty('--l-range', percent + "%")
}

function updateRange (b) {
    let percent = b * 50
    root.style.setProperty('--b-range', percent + "%")
}

init(fontSize.value, letterSpacing.value, blur.value);

fontSize.addEventListener('input', () => {
    showSizef(fontSize.value)
})

letterSpacing.addEventListener('input', () => {
    showSizel(letterSpacing.value);
})

blur.addEventListener('input', () => {
    showSize(blur.value);
    updateRange(blur.value);
})
