const deleteDiv = document.querySelector(".grid-container div:last-child");
const numScreen = document.querySelector(".numberScreen");
const delKey = document.querySelector(".deleteKey");

function deleteKey(eventKey) {
    if (eventKey.keyCode == 8) {
        numScreen.removeChild(numScreen.lastChild);
        delKey.classList.add('deleteOn');
    }
}

function removeTransition(eventKey) {
    // if (eventKey.propertyName !== 'transform') return;
    eventKey.target.classList.remove('playing');
    eventKey.target.classList.remove('deleteOn');
}

function playSound(eventKey) {
    const audio = document.querySelector(`audio[data-key="${eventKey.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${eventKey.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();

    
    numScreen.innerHTML += `<span>${eventKey.key}</span>`;
}

function countNumber() {
    if (numScreen.childElementCount == 0) {
        deleteDiv.classList.add('none');
    } else {
        deleteDiv.classList.remove('none'); 
    }
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

window.addEventListener('keydown', countNumber);

window.addEventListener('keydown', deleteKey);
