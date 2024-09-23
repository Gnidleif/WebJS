const content = document.querySelector('#contact-content');
const form = document.querySelector('#contact-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = event.target.querySelector("#txtName").value;
    const email = event.target.querySelector("#txtEmail").value;

    content.innerHTML = `<h2>Hello, ${name}!</h2><p>Your message has been sent to ${email}.</p>`;
});