"use client"
import {typeData} from "@/app/settings/deleteNotification";
import {useQuery} from "react-query";
import {useState} from "react";
import {TenseTime, Timestamp} from "@/components/timestamp";


export const Notification = ({data, loading, className}:{className?: string, data: typeData, loading?: boolean}) => {

    return <div className={`${className ? `h-full flex flex-col justify-between gap-1` : className} ${loading ? 'animate-pulse' : ''}`}>
        <label className={`text-lg font-bold ${loading ? 'bg-gray-500 opacity-80 min-h-[28px] w-full rounded-token animate-pulse' : ''}`}>{data.name}</label>
        <p className={`indent-4 break-words text-start line-clamp-4 group-focus-within:line-clamp-none ${loading ? 'bg-gray-600 opacity-80 min-h-[96px] w-full rounded-token animate-pulse' : ''}`}>{data.description || ""}</p>
        <div className={'w-full flex flex-row items-center justify-between gap-4'}>
            <p className={`text-sm text-normal opacity-80 font-thin italic ${loading ? 'bg-gray-700 opacity-80 grow w-full rounded-token animate-pulse min-h-[40px]' : ''}`}>{data.key ? `Site: ${data.key}` : ""}</p>
            <div className={'flex flex-col flex-wrap text-sm text-justify'}>
                {!loading && <TenseTime time={new Date(data.timestamp.start).getTime()} after={'Started: '} prior={'Starts: '} />}
                {!loading && <TenseTime time={new Date(data.timestamp.end).getTime()} after={'Ended: '} prior={'Ends: '} />}
            </div>
        </div>
    </div>
}

export const Notifications = ({showLive, raw}:{showLive?:boolean, raw?: boolean}) => {
    const {isLoading, error, data} = useQuery<typeData[]>('notifications', () =>
        fetch('/api/get/notice').then(res => res.json())
    )

    if (isLoading || (!data && !error)) return new Array(3).fill("").map((d, index) => <div key={index} tabIndex={0} className={`w-[300px] h-[172px]
    border-2 rounded-token
    border-background focus:border-secondary focus:p-4
    focus:max-w-full group delay-200 duration-200
    `}>
        <Notification data={d} loading={true}/>
    </div>)
    if (error || !data) return <>error could not get notification data</>

    const currentTime = new Date();

    let filteredData = showLive ?
        data.filter(d => new Date(d.timestamp.end).getTime() > currentTime.getTime()) :
        data;

    return filteredData.map((d, index) =>
        raw ?
            <Notification key={d.key+index} data={d}/> :
            <div key={d.key+index} tabIndex={0} className={`max-w-[300px] 
                border-2 rounded-token
                border-background focus:border-secondary focus:p-4
                focus:max-w-full focus:w-full group delay-200 duration-200
            `}>
                <Notification data={d}/>
            </div>
    );
}