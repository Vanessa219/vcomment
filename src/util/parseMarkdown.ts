export const parseMarkdown = (vditorOptions: IOptionsVditor) => {
    Vditor.highlightRender({
        enable: vditorOptions.hljsEnable,
        lineNumber: vditorOptions.lineNumber,
        style: vditorOptions.hljsStyle,
    }, document);

    Vditor.codeRender(document.body, vditorOptions.lang);
    Vditor.graphvizRender(document.body);
    Vditor.mathRender(document.body);
    Vditor.abcRender();
    Vditor.chartRender();
    Vditor.mindmapRender();
    Vditor.mediaRender(document.body);
    Vditor.mermaidRender(document.body);
    Vditor.flowchartRender(document.body);

    if (vditorOptions.speech) {
        document.querySelectorAll(".vditor-reset").forEach((e: HTMLElement) => {
            Vditor.speechRender(e, vditorOptions.lang);
        });
    }
};
