import React from "react";
import Card from "./Card";
import "./card.css";

const portfolioItems = [
    {
        title: "Quote App",
        description:
            "Click 'New Quote' for a random quote, then share it on X and Instagram. Built with React for smooth vibes... because who doesn’t need random wisdom in their life? 😜",

        image: "./quoteApp.png",
        btns: {
            btn1: { text: "EXPLORE NOW", link: "/Quote" },
        },
    },
    {
        title: "Markdown App",
        description:
            "Write and preview markdown files with ease. Built a markdown app with React... because copy-pasting from Notepad felt too advanced.😅",

        image: "./markdownApp.png",
        btns: {
            btn1: { text: "EXPLORE NOW", link: "/Markdown" },
        },
    },
    { title: "Project 3", description: "Description for project 3" },
    { title: "Project 4", description: "Description for project 4" },
    { title: "Project 5", description: "Description for project 5" },
    { title: "Project 6", description: "Description for project 6" },
];

function Home() {
    return (
        <div className="homeWrapper">
            <div className="portfolio-grid">
                {portfolioItems.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        btns={item.btns}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
