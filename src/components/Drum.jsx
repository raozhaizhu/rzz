// /Components/Drum.jsx

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
        const handleKeyDown = (event) => {
            const key = event.key.toUpperCase(); // 获取按下的键
            playSound(key); // 调用播放函数
        };

        // 添加键盘事件监听
        window.addEventListener("keydown", handleKeyDown);

        // 清除监听器
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [power, bank, volume]);

    const playSound = (key) => {
        if (power) {
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
            id="drumWrapper"
            className="bg-[#000] text-[#fff] min-h-screen p-[1rem] flex items-center gap-[1rem]">
            <div id="drum-machine">
                {(bank === "Heater Kit" ? heatSounds : pianoSounds).map(
                    (item, index) => (
                        <div
                            key={index}
                            role="button"
                            id={item.key.toUpperCase()}
                            className="drumBtn drum-pad"
                            onClick={playSound.bind(this, item.key)}>
                            {item.key.toUpperCase()}
                            <audio
                                className="clip"
                                id={item.key.toUpperCase()}
                                src={item.audio}></audio>
                        </div>
                    )
                )}
            </div>

            <div id="display" className="flex items-center">
                <div
                    id="drumPower"
                    className="control"
                    role="button"
                    onClick={() => {
                        setPower(!power);
                        setDisplay(power ? "OFF" : "ON");
                    }}>
                    Power
                </div>
                <div id="drumDisplay" className="control">
                    {display}
                </div>
                <div id="drumVolume" className="control">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="bg-[#fff]"
                        disabled={!power}
                    />
                </div>

                <div id="drumBank" className="control">
                    <button
                        disabled={!power}
                        onClick={() => {
                            setBank(
                                bank === "Heater Kit"
                                    ? "Piano Kit"
                                    : "Heater Kit"
                            );
                        }}>
                        Bank
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Drum;
