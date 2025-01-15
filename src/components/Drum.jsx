// /components/Drum.jsx

import { React, useState, useEffect } from "react";
import drum from "../data/drum";
import "./Drum.css";

const Drum = () => {
    const heatSounds = drum.find((item) => item.heat)?.heat;
    const pianoSounds = drum.find((item) => item.piano)?.piano;
    // 定义播放状态
    const [power, setPower] = useState(true);
    const [sound, setSound] = useState(null);
    const [volume, setVolume] = useState(30);
    const [bank, setBank] = useState("Heater Kit");
    const [display, setDisplay] = useState("ON");

    // 监听播放状态
    useEffect(() => {
        setDisplay(bank);
    }, [bank]);

    // 监听音量
    useEffect(() => {
        setDisplay(`volume: ${volume}`);
    }, [volume]);

    // 监听键盘事件
    useEffect(() => {
        if (power) {
            const handleKeyDown = (event) => {
                const key = event.key.toUpperCase();
                const drumBtnElement = document.querySelector(
                    `div#${key} .drumBtn`
                );

                if (drumBtnElement) {
                    drumBtnElement.focus();
                    playSound(key);

                    // 延迟移除焦点，让按钮弹回原样
                    setTimeout(() => {
                        drumBtnElement.blur();
                    }, 100);
                }
            };

            window.addEventListener("keydown", handleKeyDown);

            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [power, bank, volume]);
    // 定义播放声音和动画效果的函数1
    const handleButtonClick = (item, e) => {
        if (power) {
            // 只有在 power 为 true 时才触发播放声音和动画
            playSound(item.key);
        }
        e.target.blur();
    };
    // 定义播放声音和动画效果的函数2
    const playSound = (key) => {
        if (power) {
            // 只在 power 为 true 时播放声音和动画
            const sounds = bank === "Heater Kit" ? heatSounds : pianoSounds;
            const soundItem = sounds.find(
                (item) => item.key.toUpperCase() === key.toUpperCase()
            );

            if (soundItem) {
                // 获取 drum-pad div 元素
                const drumPadElement = document.querySelector(
                    `div#${key.toUpperCase()}`
                );
                // 获取 audio 元素
                const audioElement = document.querySelector(
                    `audio#${key.toUpperCase()}`
                );

                if (audioElement && drumPadElement) {
                    audioElement.volume = volume / 100; // 设置音量
                    audioElement.currentTime = 0; // 重置音频播放时间到开头
                    audioElement.play(); // 播放音频
                    setDisplay(soundItem.name);

                    // 给 drum-pad 元素添加动画效果
                    drumPadElement.classList.add("active");
                    setTimeout(
                        () => drumPadElement.classList.remove("active"),
                        100
                    );
                } else {
                    console.error(
                        "Audio or drum pad element not found for key:",
                        key
                    );
                }
            } else {
                console.error("Sound not found for key:", key);
            }
        }
    };

    return (
        <div
            id="drumPageWrapper"
            className="bg-[url('./live-concert.jpg')] bg-cover bg-center bg-no-repeat
             text-[#000] min-h-screen p-[1rem] flex justify-center items-center">
            <div className="drumContainer p-[2.5rem] w-[40rem] h-[40rem] bg-[url('./wood-frame.jpg')] bg-cover bg-no-repeat bg-[top-left, top-right, bottom-left, bottom-right]">
                {/* 内板 */}
                <div
                    className="drumContainerInner relative z-0 bg-[#fff] w-full h-full px-[2rem] py-[1rem]
                                       bg-[url('./silver-texture.jpg')]  bg-cover bg-center bg-no-repeat
                                       ">
                    <div className="absolute z-10 inset-0 bg-black opacity-50  filter brightness-50"></div>

                    <div className="wholePad relative w-full h-full z-20 flex flex-col justify-evenly gap-[1rem]">
                        {/* 控制面板 */}
                        <div
                            id="controlPad"
                            className="flex items-center justify-evenly
                    ">
                            <div
                                id="drumPower"
                                className="control
                            ">
                                <button
                                    className="drumBtn w-[5rem] h-[2.5rem] bg-[#fff] bg-cover bg-center bg-no-repeat rounded 
                                        shadow-[2px_4px_0px_black,-2px_4px_0px_black] transform transition-all ease duration-150 
                                      "
                                    onClick={(e) => {
                                        setPower(!power);
                                        setDisplay(power ? "OFF" : "ON");
                                        e.target.blur();
                                    }}>
                                    Power
                                </button>
                            </div>
                            {/* 音量控制 */}
                            <div id="drumVolume" className="control">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={(e) => setVolume(e.target.value)}
                                    className="bg-[#fff] px-[0.6rem] py-[0.3rem] rounded"
                                    disabled={!power}
                                />
                            </div>

                            <div id="drumBank" className="control">
                                <button
                                    disabled={!power}
                                    className={`drumBtn w-[5rem] h-[2.5rem] bg-[#fff] bg-cover bg-center bg-no-repeat rounded 
                                        shadow-[2px_4px_0px_black,-2px_4px_0px_black] transform transition-all ease duration-150 
                                         ${
                                             power
                                                 ? "active:translate-y-[4px] active:shadow-none focus:translate-y-[4px] focus:shadow-none"
                                                 : ""
                                         }
                                      `}
                                    onClick={(e) => {
                                        setBank(
                                            bank === "Heater Kit"
                                                ? "Piano Kit"
                                                : "Heater Kit"
                                        );
                                        e.target.blur();
                                    }}>
                                    Bank
                                </button>
                            </div>
                        </div>
                        {/* 显示器*/}
                        <div
                            id="drumDisplay"
                            className="w-full flex justify-center items-center">
                            <div className="display-text w-full h-[8rem] flex justify-center items-center px-[1rem] py-[0.5rem] bg-[#000] font-bold shadow-inner rounded-xl">
                                {" "}
                                {display}
                            </div>
                        </div>
                        {/* 播放键盘 */}
                        <div
                            id="drum-machine"
                            className="grid grid-cols-3 gap-[1rem] justify-items-center items-center ">
                            {(bank === "Heater Kit"
                                ? heatSounds
                                : pianoSounds
                            ).map((item, index) => (
                                <div
                                    key={index}
                                    id={item.key.toUpperCase()}
                                    className="drum-pad">
                                    <button
                                        disabled={!power}
                                        className={`w-[5rem] h-[5rem] drumBtn bg-[#fff]  rounded-full 
        shadow-[2px_4px_0px_black,-2px_4px_0px_black] transform transition-all ease duration-150
        ${
            power
                ? "active:translate-y-[4px] active:shadow-none focus:translate-y-[4px] focus:shadow-none"
                : ""
        }`}
                                        onClick={(e) =>
                                            handleButtonClick(item, e)
                                        }>
                                        {item.key.toUpperCase()}
                                    </button>

                                    <audio
                                        className="clip"
                                        id={item.key.toUpperCase()}
                                        src={item.audio}></audio>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drum;
