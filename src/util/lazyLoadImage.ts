declare global {
    interface Window {
        vcommentImageIntersectionObserver: IntersectionObserver;
    }
}

export const lazyLoadImage = () => {
    const loadImg = (it: HTMLImageElement) => {
        const testImage = document.createElement("img");
        testImage.src = it.getAttribute("data-src");
        testImage.addEventListener("load", () => {
            if (!it.getAttribute("style") && !it.getAttribute("class") &&
                !it.getAttribute("width") && !it.getAttribute("height")) {
                if (testImage.naturalHeight > testImage.naturalWidth &&
                    testImage.naturalWidth / testImage.naturalHeight <
                    document.querySelector(".vditor-reset").clientWidth / (window.innerHeight - 40) &&
                    testImage.naturalHeight > (window.innerHeight - 40)) {
                    it.style.height = (window.innerHeight - 40) + "px";
                }
            }

            it.src = testImage.src;
        });
        it.removeAttribute("data-src");
    };

    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".vditor-reset img").forEach((imgElement: HTMLImageElement) => {
            if (imgElement.getAttribute("data-src")) {
                loadImg(imgElement);
            }
        });
        return false;
    }

    if (window.vcommentImageIntersectionObserver) {
        window.vcommentImageIntersectionObserver.disconnect();
        document.querySelectorAll(".vditor-reset img").forEach((imgElement) => {
            window.vcommentImageIntersectionObserver.observe(imgElement);
        });
    } else {
        window.vcommentImageIntersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entrie: IntersectionObserverEntry & { target: HTMLImageElement }) => {
                if ((typeof entrie.isIntersecting === "undefined"
                    ? entrie.intersectionRatio !== 0
                    : entrie.isIntersecting)
                    && entrie.target.getAttribute("data-src")) {
                    loadImg(entrie.target);
                }
            });
        });
        document.querySelectorAll(".vditor-reset img").forEach((imgElement) => {
            window.vcommentImageIntersectionObserver.observe(imgElement);
        });
    }
};
