import * as React from 'react';
import moment from 'moment';
import {useState} from "react";


export const Timestamp = ({
                            time
                          }: {
    time: number
}) => {
    //const [currentTime, setCurrentTime] = useState<number>(new Date().getTime())

    return <>
        {moment(time).fromNow()}
    </>
}

export const TenseTime = ({
    time,
    prior,
    after
}: {
    time: number,
    prior: string,
    after: string
}) => {
    const now = Date.now();


    if (now < time) {
        return <div className={'text-justify w-full'}>
            {prior}
            <Timestamp time={time}/>
        </div>;
    } else {
        return <div className={'text-justify w-full'}>
            {after}
            <Timestamp time={time}/>
        </div>;
    }
}