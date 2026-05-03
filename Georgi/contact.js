const form = document.getElementById('contactForm');
const status = document.getElementById('status');
const message = document.getElementById('message');
status.style.display = 'none';
form.addEventListener('submit', e => {
    e.preventDefault();
    const [nameInput, emailInput] = form.querySelectorAll('input');
    const textarea = form.querySelector('textarea');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const text = textarea.value.trim();
    if (!name || !email || !text) {
        message.style.color = '#c0392b';
        message.textContent = 'Моля, попълнете всички полета.';
        return;
    }
    message.style.color = '#4caf50';
    message.textContent = `Благодарим, ${name}! Съобщението е изпратено.`;
    form.reset();
    setTimeout(() => message.textContent = '', 4000);
<<<<<<< HEAD
});
=======
});
>>>>>>> 6a18a1b03728e6364b5d126a6a9ec73b6eca23af
