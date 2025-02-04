import React from 'react';
import Card from './Card';
import './card.css';

const portfolioItems = [
    {
        title: 'Quote App',
        description:
            "Click 'New Quote' for a random quote, then share it on X and Instagram. Built with React for smooth vibes... because who doesn’t need random wisdom in their life? 😜",

        image: './quoteApp.png',
        btns: {
            btn1: { text: 'EXPLORE NOW', link: '/Quote' },
        },
    },
    {
        title: 'Markdown App',
        description:
            'Write and preview markdown files with ease. Built a markdown app with React... because copy-pasting from Notepad felt too advanced.😅',

        image: './markdownApp.png',
        btns: {
            btn1: { text: 'EXPLORE NOW', link: '/Markdown' },
        },
    },
    {
        title: 'Drum Machine',
        description: 'Description for Drum Machine',
        image: './drumMachine.png',
        btns: { btn1: { text: 'EXPLORE NOW', link: '/Drum' } },
    },
    {
        title: 'Clock App',
        description: 'Description for Clock App',
        image: './clock.png',
        btns: { btn1: { text: 'EXPLORE NOW', link: '/Clock' } },
    },
    { title: 'Project 5', description: 'Description for project 5' },
    { title: 'Project 6', description: 'Description for project 6' },
];

function Home() {
    return (
        <div className='homeWrapper'>
            <div className='portfolio-grid'>
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

