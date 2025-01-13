import React, { useState, useEffect } from "react";
import { marked } from "marked"; // 确保正确导入
import Prism from "prismjs";
import "prismjs/themes/prism.css"; // 确保引入 CSS 样式
import info from "../data/fccMarkdownInfo.json";
import "./Markdown.css";

// 设置 marked 的高亮选项
marked.setOptions({
    highlight: function (code, lang) {
        if (Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
        } else {
            return Prism.highlight(code, Prism.languages.javascript, "javascript");
        }
    },
});

function Markdown() {
    const [markdown, setMarkdown] = useState(info[0].fccText);
    const [isEditorFullScreen, setIsEditorFullScreen] = useState(false); // 编辑器全屏状态
    const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false); // 预览全屏状态

    // 🔧 使用 useEffect 在组件渲染后触发 Prism 的高亮功能
    useEffect(() => {
        setTimeout(() => {
            Prism.highlightAll();
        }, 0); // 延迟0ms确保渲染完成
    }, [markdown]);

    const toggleEditorFullScreen = () => {
        setIsEditorFullScreen(!isEditorFullScreen);
    };
    const togglePreviewFullScreen = () => {
        setIsPreviewFullScreen(!isPreviewFullScreen);
    };

    return (
        <div className="markdownWrapper min-w-screen min-h-screen py-[2rem] flex flex-col gap-[1rem] justify-center items-center border-[#fff]">
            {/* Editor 区域 */}
            {!isPreviewFullScreen ? (
                <div id="editor" className="editorWrapper w-[50%] border">
                    <div className="px-[1rem] py-[0.5rem] text-white flex justify-start items-center gap-[1rem]">
                        <img src="./favicon.png" alt="favicon" className="w-[1.5rem] h-[1.5rem]" />
                        <p className="text-[1.2rem]">Editor</p>
                        <div className="fullScreenBtn ms-auto" onClick={toggleEditorFullScreen} role="button">
                            <img
                                src={`${
                                    isEditorFullScreen ? "./exit-full-screen-white.svg" : "./full-screen-white.svg"
                                }`}
                                alt="full screen button"
                                className="w-[1.5rem] h-[1.5rem]"
                            />
                        </div>
                    </div>
                    {/* Textarea 输入框 */}
                    <div className="flex">
                        <textarea
                            className={`editor px-[1rem] py-[0.5rem] ${
                                isEditorFullScreen ? "h-[100rem]" : "h-[15rem]"
                            } bg-[#e1e3e4]`}
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <div></div>
            )}

            {/* Preview 区域 */}
            {!isEditorFullScreen ? (
                <div id="preview" className="editorWrapper w-[80%] border">
                    <div className="px-[1rem] py-[0.5rem] text-white flex justify-start items-center gap-[1rem]">
                        <img src="./favicon.png" alt="favicon" className="w-[1.5rem] h-[1.5rem]" />
                        <p className="text-[1.2rem]">Preview</p>
                        <div className="fullScreenBtn ms-auto" onClick={togglePreviewFullScreen} role="button">
                            <img
                                src={`${
                                    isPreviewFullScreen ? "./exit-full-screen-white.svg" : "./full-screen-white.svg"
                                }`}
                                alt="full screen button"
                                className="w-[1.5rem] h-[1.5rem]"
                            />
                        </div>
                    </div>
                    <div
                        className="bg-[#e1e3e4] text-[#000] px-[1rem] py-[0.5rem]"
                        dangerouslySetInnerHTML={{
                            __html: marked(markdown, { breaks: true }),
                        }}
                    />
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Markdown;
