export const detailsMenu = () => {
    document.addEventListener("click", (event) => {
        const target = event.target as Node;
        const detailsMenuElement = hasClosestByMatchTag(target, "DETAILS-MENU");
        const detailsElement = hasClosestByClassName(target, "details");
        if (detailsMenuElement) {
            detailsMenuElement.parentElement.removeAttribute("open");
        }
        if (!detailsElement) {
            document.querySelectorAll(".details").forEach((element) => {
                element.removeAttribute("open");
            });
        }
    });

    document.body.addEventListener("click", function(event) {
        for (let target = event.target; target && target !== this; target = (target as HTMLElement).parentNode) {
            if ((target as HTMLElement).matches(".details summary")) {
                document.querySelectorAll(".details").forEach((element) => {
                    element.removeAttribute("open");
                });
                break;
            }
        }
    }, false);
};

const hasClosestByMatchTag = (element: Node, nodeName: string) => {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    let e = element as HTMLElement;
    let isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-wysiwyg")) {
        if (e.nodeName === nodeName) {
            isClosest = true;
        } else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};

const hasClosestByClassName = (element: Node, className: string) => {
    if (!element) {
        return false;
    }
    if (element.nodeType === 3) {
        element = element.parentElement;
    }
    let e = element as HTMLElement;
    let isClosest = false;
    while (e && !isClosest && !e.classList.contains("vditor-wysiwyg")) {
        if (e.classList.contains(className)) {
            isClosest = true;
        } else {
            e = e.parentElement;
        }
    }
    return isClosest && e;
};
