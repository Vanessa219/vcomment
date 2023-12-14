export const parseMarkdown = (vditorOptions: IOptionsVditor) => {
    Vditor.highlightRender({
        enable: vditorOptions.hljsEnable,
        lineNumber: vditorOptions.lineNumber,
        style: vditorOptions.hljsStyle,
    }, document, vditorOptions.cdn);

    Vditor.codeRender(document.body);
    Vditor.plantumlRender(document.body, vditorOptions.cdn);
    Vditor.graphvizRender(document.body, vditorOptions.cdn);
    Vditor.mathRender(document.body, {cdn: vditorOptions.cdn});
    Vditor.abcRender(document.body, vditorOptions.cdn);
    Vditor.chartRender(document.body, vditorOptions.cdn,  vditorOptions.theme.current);
    Vditor.mindmapRender(document.body, vditorOptions.cdn, vditorOptions.theme.current);
    Vditor.mediaRender(document.body);
    Vditor.mermaidRender(document.body, vditorOptions.cdn, vditorOptions.theme.current);
    Vditor.flowchartRender(document.body, vditorOptions.cdn);

    if (vditorOptions.speech) {
        document.querySelectorAll(".vditor-reset").forEach((e: HTMLElement) => {
            Vditor.speechRender(e, vditorOptions.lang);
        });
    }
};
