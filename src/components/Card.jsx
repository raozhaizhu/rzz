import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BtnWhiteRounded from "./BtnWhiteRounded";
import "./card.css";

function Card({ title, description, index, image, btns }) {
    const cardRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const rect = cardRef.current.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            id={`card-${index}`}
            ref={cardRef}
            className="card flex flex-col gap-[3rem] group">
            <div className="w-full">
                <div className="max-w-full">
                    <img
                        src={image}
                        alt={title}
                        className="w-full rounded-[2rem]  filter grayscale group-hover:grayscale-0 transition duration-300"
                    />
                </div>
            </div>
            <h3 className="font-[Roboto] text-[2rem] font-medium flex justify-between items-center">
                {title}
                <span>2025</span>
            </h3>
            <p className="text-[1.1rem] font-[Montserrat]">
                <i className="fa fa-quote-left text-[1.5rem] ml-[1rem] mr-[1rem]"></i>
                {description}
                <i className="fa fa-quote-right text-[1.5rem] ml-[1rem]"></i>
            </p>
            <div className="btnsWrapper flex flex-col gap-[1rem]">
                {btns &&
                    Object.values(btns).map((item, index) => (
                        <Link to={item.link} key={index}>
                            <BtnWhiteRounded text={item.text} />
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default Card;
