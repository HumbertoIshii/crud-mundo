document.addEventListener("DOMContentLoaded", () => {
    const geoForms = document.querySelectorAll("#admin-city form, #admin-country form");
    geoForms.forEach(form => {
        form.addEventListener("submit", () => {
            localStorage.setItem("geoScrollY", window.scrollY);
        });
    });

    const geoPaginationLinks = document.querySelectorAll("#admin-city .pagination a, #admin-country .pagination a");
    geoPaginationLinks.forEach(link => {
        link.addEventListener("click", () => {
            localStorage.setItem("geoScrollY", window.scrollY);
        });
    });

    const savedScroll = localStorage.getItem("geoScrollY");
    if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll));
        localStorage.removeItem("geoScrollY");
    }
});
