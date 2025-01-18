import React, { useState, useEffect } from 'react';

const Clock = () => {
    // 默认时间（单位：秒）
    const DEFAULT_WORK_TIME = 25 * 60;
    const DEFAULT_BREAK_TIME = 5 * 60;
    const audio = document.getElementById('beep');

    // 状态管理
    const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
    const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
    const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK_TIME); // 当前倒计时时间
    const [isWorking, setIsWorking] = useState(true); // 当前模式：true=工作，false=休息
    const [isRunning, setIsRunning] = useState(false); // 是否正在倒计时
    const [label, setLabel] = useState('Session'); // 当前模式标签

    // 倒计时逻辑
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    const audio = document.getElementById('beep');
                    audio.play(); // 响铃提醒

                    // 切换模式
                    const isNextWorking = !isWorking;
                    setIsWorking(isNextWorking);
                    const nextTime = isNextWorking ? workTime : breakTime;

                    setTimeLeft(nextTime); // 直接设置为下一段时间
                    setLabel(isNextWorking ? 'Session' : 'Break');

                    return nextTime; // 返回新时间，确保渲染更新正确
                }
                return prevTime - 1; // 正常倒计时减少1秒
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, isWorking, workTime, breakTime]); // 确保依赖项完整

    // 格式化时间（MM:SS）
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // 按钮操作
    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setWorkTime(DEFAULT_WORK_TIME);
        setBreakTime(DEFAULT_BREAK_TIME);
        setTimeLeft(DEFAULT_WORK_TIME);
        setIsWorking(true);
        setLabel('Session');
        audio.pause(); // 停止响铃
        audio.currentTime = 0; // 重置音频播放位置
    };

    const handleTimeChange = (type, amount) => {
        if (isRunning) return; // 倒计时运行期间禁止调整时间
        if (type === 'work') {
            const newWorkTime = Math.min(3600, Math.max(60, workTime + amount)); // 最大 1 小时，最小 1 分钟
            setWorkTime(newWorkTime);
            if (isWorking) setTimeLeft(newWorkTime);
        } else if (type === 'break') {
            const newBreakTime = Math.min(3600, Math.max(60, breakTime + amount)); // 最大 1 小时，最小 1 分钟
            setBreakTime(newBreakTime);
            if (!isWorking) setTimeLeft(newBreakTime);
        }
    };

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h2 id='timer-label'>{label}</h2>
            <h1 id='time-left' style={{ fontSize: '48px' }}>
                {formatTime(timeLeft)}
            </h1>
            <audio
                id='beep'
                src='https://upload.wikimedia.org/wikipedia/commons/4/42/Beep_alarm_clock.ogg'
                preload='auto'
            ></audio>
            <p id='session-label'>Session Length</p>
            <p id='session-length'>{Math.floor(workTime / 60)}</p>
            <p id='break-label'>Break Length</p>
            <p id='break-length'>{Math.floor(breakTime / 60)}</p>
            <div className='flex flex-col '>
                <button id='session-increment' onClick={() => handleTimeChange('work', 60)}>
                    Session +1 minutes
                </button>
                <button id='session-decrement' onClick={() => handleTimeChange('work', -60)}>
                    Session -1 minutes
                </button>
                <button id='break-increment' onClick={() => handleTimeChange('break', 60)}>
                    Break +1 minutes
                </button>
                <button id='break-decrement' onClick={() => handleTimeChange('break', -60)}>
                    Break -1 minutes
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button id='start_stop' onClick={handleStartPause} style={{ marginRight: '10px' }}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button id='reset' onClick={handleReset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Clock;

