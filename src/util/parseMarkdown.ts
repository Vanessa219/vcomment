export const parseMarkdown = (vditorOptions: IOptionsVditor) => {
    Vditor.highlightRender({
        enable: vditorOptions.hljsEnable,
        lineNumber: vditorOptions.lineNumber,
        style: vditorOptions.hljsStyle,
    }, document);

    Vditor.codeRender(document.body, vditorOptions.lang);
    Vditor.plantumlRender(document.body);
    Vditor.graphvizRender(document.body);
    Vditor.mathRender(document.body);
    Vditor.abcRender();
    Vditor.chartRender(document.body, undefined,  vditorOptions.theme);
    Vditor.mindmapRender(document.body, undefined, vditorOptions.theme);
    Vditor.mediaRender(document.body);
    Vditor.mermaidRender(document.body, undefined, vditorOptions.theme);
    Vditor.flowchartRender(document.body);

    if (vditorOptions.speech) {
        document.querySelectorAll(".vditor-reset").forEach((e: HTMLElement) => {
            Vditor.speechRender(e, vditorOptions.lang);
        });
    }
};
