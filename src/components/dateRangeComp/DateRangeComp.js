import { useState, useEffect, useRef } from 'react';

const DateRangeComp = () => {
    const trialRef = useRef()

    useEffect(() => {
        console.log(trialRef.current)
    }, [])
    return (
        <div ref={(el) => (trialRef.current = el)}>
            <p>Just a P tag</p>
        </div>
    )
}

export default DateRangeComp