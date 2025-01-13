import React, { useState, useEffect } from "react";
import { marked } from "marked"; // Markdown 解析库
import Prism from "prismjs"; // 代码高亮库
import "prismjs/themes/prism.css"; // 代码高亮样式
import "prismjs/components/prism-javascript"; // 手动引入 JavaScript 高亮
import info from "../data/fccMarkdownInfo.json";
import "./Markdown.css";

function Markdown() {
    const [markdown, setMarkdown] = useState(info[0].fccText);
    const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
    const [isPreviewFullScreen, setIsPreviewFullScreen] = useState(false);

    // ✅ 设置 marked 的高亮选项
    marked.setOptions({
        highlight: (code, lang) => {
            if (Prism.languages[lang]) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return Prism.highlight(
                code,
                Prism.languages.javascript,
                "javascript"
            );
        },
        breaks: true, // 支持换行
    });

    // ✅ 确保代码高亮在每次 Markdown 内容变更时生效
    useEffect(() => {
        Prism.highlightAll();
    }, [markdown]);

    // 切换编辑器全屏
    const toggleEditorFullScreen = () => {
        setIsEditorFullScreen(!isEditorFullScreen);
    };

    // 切换预览全屏
    const togglePreviewFullScreen = () => {
        setIsPreviewFullScreen(!isPreviewFullScreen);
    };

    return (
        <div className="markdownWrapper min-w-screen min-h-screen py-[2rem] flex flex-col gap-[1rem] justify-center items-center border-[#fff]">
            {/* Editor 区域 */}
            {!isPreviewFullScreen && (
                <div className="editorWrapper w-[50%] border">
                    <div className="px-[1rem] py-[0.5rem] text-white flex justify-start items-center gap-[1rem]">
                        <img
                            src="./favicon.png"
                            alt="favicon"
                            className="w-[1.5rem] h-[1.5rem]"
                        />
                        <p className="text-[1.2rem]">Editor</p>
                        <div
                            className="fullScreenBtn ms-auto"
                            onClick={toggleEditorFullScreen}
                            role="button">
                            <img
                                src={`${
                                    isEditorFullScreen
                                        ? "./exit-full-screen-white.svg"
                                        : "./full-screen-white.svg"
                                }`}
                                alt="full screen button"
                                className="w-[1.5rem] h-[1.5rem]"
                            />
                        </div>
                    </div>
                    {/* Textarea 输入框 */}
                    <textarea
                        id="editor"
                        className={`editor px-[1rem] py-[0.5rem] ${
                            isEditorFullScreen ? "h-[100rem]" : "h-[15rem]"
                        } bg-[#e1e3e4]`}
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                </div>
            )}

            {/* Preview 区域 */}
            {!isEditorFullScreen && (
                <div className="editorWrapper w-[80%] border">
                    <div className="px-[1rem] py-[0.5rem] text-white flex justify-start items-center gap-[1rem]">
                        <img
                            src="./favicon.png"
                            alt="favicon"
                            className="w-[1.5rem] h-[1.5rem]"
                        />
                        <p className="text-[1.2rem]">Preview</p>
                        <div
                            className="fullScreenBtn ms-auto"
                            onClick={togglePreviewFullScreen}
                            role="button">
                            <img
                                src={`${
                                    isPreviewFullScreen
                                        ? "./exit-full-screen-white.svg"
                                        : "./full-screen-white.svg"
                                }`}
                                alt="full screen button"
                                className="w-[1.5rem] h-[1.5rem]"
                            />
                        </div>
                    </div>
                    <div
                        id="preview"
                        className="bg-[#e1e3e4] text-[#000] px-[1rem] py-[0.5rem]"
                        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
                    />
                </div>
            )}
        </div>
    );
}

export default Markdown;
