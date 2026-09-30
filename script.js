document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("easterEggTitle");
    const audio = document.getElementById("duolingoAudio");
    const modal = document.getElementById("easterEggModal");
    const modalContent = document.getElementById("modalContent");
    const closeModalBtn = document.getElementById("closeModalBtn");

    let clickCount = 0;
    let clickTimer = null;

    if (title) {
        title.addEventListener("click", function () {
            clickCount++;
            
            // 点击时标题微动反馈
            title.style.transform = `scale(${1 + clickCount * 0.03})`;
            setTimeout(() => {
                title.style.transform = "scale(1)";
            }, 150);

            // 连续点击 5 次触发彩蛋
            if (clickCount >= 5) {
                triggerEasterEgg();
                clickCount = 0;
            }

            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 800);
        });
    }

    function triggerEasterEgg() {
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => {
                console.log("音频播放被浏览器拦截或文件未找到:", e);
            });
        }
        if (modal && modalContent) {
            modal.classList.remove("opacity-0", "pointer-events-none");
            modalContent.classList.remove("scale-90");
            modalContent.classList.add("scale-100");
        }
    }

    function closeEasterEgg() {
        if (modal && modalContent) {
            modal.classList.add("opacity-0", "pointer-events-none");
            modalContent.classList.remove("scale-100");
            modalContent.classList.add("scale-90");
        }
        if (audio) {
            audio.pause();
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", closeEasterEgg);
    }
    
    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeEasterEgg();
            }
        });
    }
});
