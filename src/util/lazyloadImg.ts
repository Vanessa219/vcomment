declare global {
    interface Window {
        vcommentImageIntersectionObserver: IntersectionObserver;
    }
}

export const lazyloadImg = (id: string) => {
    const loadImg = (it: HTMLImageElement) => {
        const testImage = document.createElement("img");
        testImage.src = it.getAttribute("data-src");
        testImage.addEventListener("load", () => {
            if (!it.getAttribute("style") && !it.getAttribute("class") &&
                !it.getAttribute("width") && !it.getAttribute("height")) {
                if (testImage.naturalHeight > testImage.naturalWidth &&
                    testImage.naturalWidth / testImage.naturalHeight <
                    document.querySelector(`#comments .vditor-reset`).clientWidth / (window.innerHeight - 40) &&
                    testImage.naturalHeight > (window.innerHeight - 40)) {
                    it.style.height = (window.innerHeight - 40) + "px";
                }
            }

            it.src = testImage.src;
        });
        it.removeAttribute("data-src");
    };

    if (!("IntersectionObserver" in window)) {
        document.getElementById(id).querySelectorAll("img").forEach(function() {
            if (this.getAttribute("data-src")) {
                loadImg(this);
            }
        });
        return false;
    }

    if (window.vcommentImageIntersectionObserver) {
        window.vcommentImageIntersectionObserver.disconnect();
        document.getElementById(id).querySelectorAll("img").forEach(function() {
            window.vcommentImageIntersectionObserver.observe(this);
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
        document.getElementById(id).querySelectorAll("img").forEach((imgElement) => {
            window.vcommentImageIntersectionObserver.observe(imgElement);
        });
    }
};
