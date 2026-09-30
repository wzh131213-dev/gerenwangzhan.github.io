document.addEventListener("DOMContentLoaded", function () {
    const title = document.getElementById("easterEggTitle");
    const audio = document.getElementById("duolingoAudio");
    const modal = document.getElementById("easterEggModal");
    const modalContent = document.getElementById("modalContent");
    const openDuolingoBtn = document.getElementById("openDuolingoBtn");
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

    // 点击“打开多邻国打卡”按钮的逻辑
    if (openDuolingoBtn) {
        openDuolingoBtn.addEventListener("click", function () {
            // 弹出是否确认打开的系统提示
            const confirmOpen = window.confirm("是否要打开设备中的多邻国进行打卡？");
            if (confirmOpen) {
                // 尝试通过 URL Scheme 唤起多邻国 App
                // 注：不同平台多邻国 Scheme 可能为 duolingo://，若未安装或不支持会自动 fallback
                window.location.href = "duolingo://";

                // 设置一个备用方案：如果 1.5 秒后页面还在，说明可能没安装 App，可引导至多邻国官网
                setTimeout(() => {
                    // 如果用户没有被成功拉起 App，可以跳转到多邻国网页端
                    // window.location.href = "https://www.duolingo.com";
                }, 1500);
            }
            closeEasterEgg();
        });
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
