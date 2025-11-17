document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", () => {
            localStorage.setItem("scrollY", window.scrollY);
        });
    });

    const paginationLinks = document.querySelectorAll(".pagination a");
    paginationLinks.forEach(link => {
        link.addEventListener("click", () => {
            localStorage.setItem("scrollY", window.scrollY);
        });
    });

    const scrollY = localStorage.getItem("scrollY");
    if (scrollY) {
        window.scrollTo(0, parseInt(scrollY));
        localStorage.removeItem("scrollY");
    }
});
