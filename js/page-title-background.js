/* End inner-page backgrounds just below the page title. Home does not load this. */
(function () {
    const title = document.querySelector(".main-content h1");
    const background = document.querySelector(".bg-struct");
    if (!title || !background) return;
    function alignBackground() {
        const top = background.getBoundingClientRect().top;
        background.style.height = Math.max(0, title.getBoundingClientRect().bottom - top + 24) + "px";
    }
    alignBackground();
    window.addEventListener("resize", alignBackground);
    window.addEventListener("load", alignBackground);
    if (document.fonts) document.fonts.ready.then(alignBackground);
    if (window.ResizeObserver) {
        const observer = new ResizeObserver(alignBackground);
        observer.observe(title);
    }
})();
