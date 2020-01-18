export const parseMarkdown = (vditorOptions: IOptionsVditor) => {
    Vditor.highlightRender({
        enable: vditorOptions.hljsEnable,
        lineNumber: vditorOptions.lineNumber,
        style: vditorOptions.hljsStyle,
    }, document);

    Vditor.codeRender(document.body, vditorOptions.lang);
    if (vditorOptions.hljsEnable) {
        Vditor.mathRenderByLute(document.body);
    } else {
        Vditor.mathRender(document.body);
    }

    Vditor.abcRender();
    Vditor.chartRender();
    Vditor.mediaRender(document.body);
    Vditor.mermaidRender(document.body);
    document.querySelectorAll(".vditor-reset").forEach((e: HTMLElement) => {
        Vditor.speechRender(e, vditorOptions.lang);
    });
};
