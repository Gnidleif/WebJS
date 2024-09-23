const content = document.querySelector("#content");
const menu = document.querySelector("#menu");

const pages = [
    "home",
    "about",
    "contact",
];

window.addEventListener("load", async () => {
    for (const page of pages) {
        addLink(page);
    }

    const initialPage = pages[0];
    await loadPage(initialPage);
    history.replaceState({ pageName: initialPage }, "", `/#/${initialPage}`);
});

window.addEventListener("popstate", async (event) => {
    const page = event.state !== null ? event.state.pageName : "home";
    await loadPage(page);
});

function addLink(id) {
    const link = document.createElement("a");
    link.id = id;
    link.innerText = id;
    link.addEventListener("click", async (event) => {
        const page = event.target.id;
        await loadPage(page);
        history.pushState({ pageName: page }, "", `/#/${page}`);
    });

    const li = document.createElement("li");
    li.appendChild(link);
    menu.appendChild(li);
}

async function loadPage(page) {
    if (!pages.includes(page) || typeof page !== "string" || content.name === page) {
        return;
    }

    const loadTimeoutId = setTimeout(() => {
        content.innerHTML = "Loading...";
    }, 200);

    await fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            content.name = page;
            content.innerHTML = html;
        })
        .then(() => fetch(`js/${page}.js`))
        .then(response => response.text())
        .then(js => {
            if (js.length) {
                eval(js);
            }
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            clearTimeout(loadTimeoutId);
        });
}