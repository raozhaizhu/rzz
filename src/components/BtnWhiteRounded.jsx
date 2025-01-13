import React from "react";

const BtnWhiteRounded = ({ text }) => {
    return (
        <div
            className="inline-block max-w-max px-[2rem] py-[1rem] border border-[#fff]
      text-[1.25rem] rounded-[2rem] font-medium font-[Montserrat] cursor-pointer"
            role="button">
            {text}
        </div>
    );
};

export default BtnWhiteRounded;
