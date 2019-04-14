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

//option
const inputs = document.querySelectorAll('div > input')

function handleUpdate() { 
    const suffix = this.dataset.sizing || '';
    root.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mouseover', handleUpdate));

