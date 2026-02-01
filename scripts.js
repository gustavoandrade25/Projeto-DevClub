const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');
const list = document.querySelector('.list');

let active = 0;
const total = items.length;
let timer;

function update(direction) {
    const currentItem = document.querySelector('.item.active');
    const currentDot = document.querySelector('.dot.active');
    if (currentItem) currentItem.classList.remove('active');
    if (currentDot) currentDot.classList.remove('active');

    if (direction > 0) {
        active = active + 1;
        if (active === total) active = 0;
    } else if (direction < 0) {
        active = active - 1;
        if (active < 0) active = total - 1;
    } else if (typeof direction === 'number' && direction >= 0) {
        // quando chamado com índice (ex.: update(2))
        active = direction % total;
    }

    items[active].classList.add('active');
    dots[active].classList.add('active');

    if (numberIndicator) {
        numberIndicator.textContent = String(active + 1).padStart(2, '0');
    }
}

clearInterval(timer);
timer =setInterval(() => {
        update(1);
    }, 5000);

if (prevButton) {
    prevButton.addEventListener('click', () => update(-1));
}

if (nextButton) {
    nextButton.addEventListener('click', () => update(1));
}

// permitir clicar diretamente nos dots
if (dots.length) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => update(index));
    });
}