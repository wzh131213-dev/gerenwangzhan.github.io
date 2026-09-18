document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".reveal");

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach(reveal => {
            const boxTop = reveal.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                reveal.classList.add("active");
            }
        });
    }

    // 初始检查与滚动监听
    window.addEventListener("scroll", checkReveal);
    checkReveal();
});
