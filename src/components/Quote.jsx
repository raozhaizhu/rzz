import { React, useState } from "react";
import { Helmet } from "react-helmet-async";
import quotes from "../data/quotes.json";
import colors from "../data/colors.json";

const Quote = () => {
    // 设置随机索引的状态
    const [quoteIndex, setQuoteIndex] = useState(Math.floor(Math.random() * quotes.length));
    const [colorIndex, setColorIndex] = useState(Math.floor(Math.random() * colors.length));

    // 获取当前的 quote 和 color
    const randomQuote = quotes[quoteIndex];
    const randomColor = colors[colorIndex];
    const primaryColor = randomColor.primary;

    // 定义刷新索引的函数
    const setNewIndex = () => {
        setQuoteIndex(Math.floor(Math.random() * quotes.length));
        setColorIndex(Math.floor(Math.random() * colors.length));
    };

    // 生成分享链接
    const tweetQuote = () => {
        const text = encodeURIComponent(`"${randomQuote.text}" - ${randomQuote.author}`);
        const url = encodeURIComponent("https://raozhaizhu.github.io/rzz/quote.html");
        const hashtags = "quotes,inspiration"; // 可选：添加相关标签
        return `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
    };

    return (
        <>
            <Helmet>
                <title>Random Quote Generator</title>
                {/* OpenGraph Meta Tags */}
                <meta property="og:url" content="https://raozhaizhu.github.io/rzz/Quote" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Random Quote Generator" />
                <meta property="og:description" content="Get your daily inspiration with random quotes" />
                <meta property="og:image" content="https://raozhaizhu.github.io/rzz/x-cover.jpg" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:domain" content="raozhaizhu.github.io" />
                <meta name="twitter:url" content="https://raozhaizhu.github.io/rzz/Quote" />
                <meta name="twitter:title" content="Random Quote Generator" />
                <meta name="twitter:description" content="Get your daily inspiration with random quotes" />
                <meta name="twitter:image" content="https://raozhaizhu.github.io/rzz/x-cover.jpg" />
            </Helmet>

            <div
                className="quoteWrapper w-full flex flex-col gap-[1rem] justify-center items-center min-h-screen"
                style={{ backgroundColor: primaryColor, color: primaryColor }}
            >
                <div id="quote-box" className="w-[60%] bg-[#fff] p-[3rem] rounded">
                    <article>
                        <h2 id="text" className="font-[Lato] font-[500] text-[2rem] text-center mb-[2rem]">
                            <i className="fa fa-quote-left text-[3rem] mr-[1rem]"></i>
                            {randomQuote.text}
                        </h2>
                        <h3 id="author" className="font-[Roboto] text-end text-[1.2rem] mb-[2rem]">
                            - {randomQuote.author}
                        </h3>
                    </article>

                    <div className="btns flex justify-between items-center">
                        <div className="btn-social flex justify-start items-center gap-[1rem]">
                            <a
                                id="tweet-quote"
                                className="p-[1rem] text-[#fff] flex justify-center items-center rounded"
                                style={{ backgroundColor: primaryColor }}
                                role="button"
                                href={tweetQuote()}
                                target="_blank"
                            >
                                <i className="fab fa-twitter text-[1.5rem]"></i>
                            </a>
                        </div>
                        <button
                            id="new-quote"
                            className="px-[1.5rem] py-[1rem] text-[#fff] flex justify-center items-center rounded"
                            style={{ backgroundColor: primaryColor }}
                            onClick={setNewIndex}
                        >
                            New Quote
                        </button>
                    </div>
                </div>
                <h1 className="text-[#fff]">By Raozhaizhu</h1>
            </div>
        </>
    );
};

export default Quote;
