document.addEventListener("DOMContentLoaded", () => {
    const SCROLL_KEY = "geoScrollY";

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", () => {
            localStorage.setItem(SCROLL_KEY, window.scrollY);
        });
    });

    document.querySelectorAll(".pagination a").forEach(link => {
        link.addEventListener("click", () => {
            localStorage.setItem(SCROLL_KEY, window.scrollY);
        });
    });

    const savedScroll = localStorage.getItem(SCROLL_KEY);
    if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll));
        localStorage.removeItem(SCROLL_KEY);
    }
});