import React, { useEffect } from 'react'
import moment from 'moment';
function DateTime({ time = false, date = false }) {
    const [staticDate, setStaticDate] = React.useState(moment())
    useEffect(() => {
        const timer = setInterval(() => {
                setStaticDate(moment())
            }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    return (
        <>
            {time && date ? staticDate.format('ddd, MMMM Do YYYY h:mm:ss A') : time ? staticDate.format('h:mm:ss A') : date && staticDate.format('ddd, MMMM Do YYYY')}
        </>
    )
}

export default DateTime