/* Align research deep links after images, fonts, and MDL finish layout. */
(function () {
    function alignResearchHeading() {
        if (!/^#research-category-[123]$/.test(location.hash)) return;
        const heading = document.getElementById(location.hash.slice(1));
        if (!heading) return;
        heading.scrollIntoView({block: 'start', behavior: 'instant'});
        const header = document.querySelector('.mdl-layout__header');
        const top = header ? Math.max(0, header.getBoundingClientRect().bottom) + 24 : 24;
        const adjustment = heading.getBoundingClientRect().top - top;
        let scroller = heading.parentElement;
        while (scroller && scroller !== document.body) {
            if (/(auto|scroll)/.test(getComputedStyle(scroller).overflowY) && scroller.scrollHeight > scroller.clientHeight) break;
            scroller = scroller.parentElement;
        }
        if (scroller && scroller !== document.body) scroller.scrollTop += adjustment;
        else window.scrollBy({top: adjustment, behavior: 'instant'});
    }
    function scheduleAlignment() {
        requestAnimationFrame(function () { requestAnimationFrame(alignResearchHeading); });
    }
    window.addEventListener('load', function () {
        if (document.fonts) document.fonts.ready.then(scheduleAlignment);
        else scheduleAlignment();
    });
    window.addEventListener('hashchange', scheduleAlignment);
})();