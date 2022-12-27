import React, { useEffect, useState } from 'react';

//styling
const Count = (props) => {
    const { number, duration } = props;

    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(number.substring(0, 3));
        if (start === end) return;

        let totalMilSecDur = parseInt(duration);
        let incrementTime = (totalMilSecDur / end) * 1000;

        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + number.substring(3));
            if (start === end) clearInterval(timer);
        }, incrementTime);
    }, [number, duration]);

    return (
        <div className="large" id="large">
            {count}
        </div>
    );
};

export default Count;
