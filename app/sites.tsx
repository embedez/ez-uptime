"use client"

import config from '../config.yml'
import {useContext, useEffect, useState} from "react";
import {statusType} from "@/pages/api/ping";
import { createContext } from 'react';
import {useQuery} from "react-query";

const SiteStatusContext = createContext<{
    status: statusType[][],
    setStatus: (statusArg: any) => any
}>({
    status: [],
    setStatus: () => {}
});

/*{
    description: string;
    code: number;
    type: 'success' | 'warning' | 'error' | 'nothing';
}*/

export const Total = () => {
    const {
        status,
        setStatus
    } = useContext(SiteStatusContext);

    const [stats, setStats] = useState({
        total: 0,
        success: 0,
        error: 0,
        warn: 0
    })

    function calcUptime(data: statusType[][]) {
        let total = 0
        let successCount = 0
        let errorCount = 0
        let warnCount: number = 0
        data.forEach(s => {
            if (!Array.isArray(s)) return;
            s.forEach(v => {
                if (v.type !== 'nothing') total++
                if(v.type == 'success') successCount++
                if(v.type == 'error') errorCount++
                if(v.type == 'warning') warnCount++
            })
        })

        console.log("Total:", successCount)
        console.log("Number of Success:", successCount)
        console.log("Number of Warns:", warnCount)
        console.log("Number of Error:", errorCount)

        setStats({
            total,
            success: successCount,
            error: errorCount,
            warn: warnCount,
        })
    }

    useEffect(() => {
        if (status.length > 0) calcUptime(status)
    }, [status, setStatus]);

    if (stats.total == 0) return <div className={'bg-gray-500 h-10 w-20 items-center text-center animate-pulse'}>

    </div>

    if (stats.total == stats.success) return <div className={'bg-success h-10 w-20 items-center text-background justify-center rounded-token text-center flex'}>
        <p>100%</p>
    </div>

    return <div className={'bg-warning h-10 w-20 items-center justify-center text-background rounded-token text-center flex'}>

        <p>{(stats.error / stats.total) * 100}%</p>
    </div>
}

const Status = ({name, data}:{name:string, data: typeof config.track[0][0]}) => {

    const {isLoading, error, data: statusPoints } = useQuery<statusType[]>(`status-${name}`, () =>
        fetch(`/api/get/${name}`).then(res => res.json()),
    )
    const [added, setAdded] = useState(false)

    const {
        status,
        setStatus
    } = useContext(SiteStatusContext);

    useEffect(() => {
        if (statusPoints && !added) {
            setAdded(true)
            setStatus([...status, statusPoints])
        }
    }, [added, setStatus, status, statusPoints]);

    if (isLoading || !statusPoints || !Array.isArray(statusPoints)) {
        return <div key={data.name} className="py-2.5 flex flex-row flex-wrap gap-2.5 items-center capitalize justify-between shrink-0 relative overflow-auto animate-pulse">
            <div className="flex flex-row items-center gap-4 ">
                <div className={`text-left relative rounded bg-gray-500 p-2 text-black text-end`}>
                    ---%
                </div>

                <a href={data.url} className="text-normal text-left relative">{data.name}</a>
            </div>
            <div className={`flex flex-row items-center justify-between shrink-0 
        gap-0.5 lg:gap-2 overflow-clip max-w-full relative`}>
                {
                    new Array(31).fill({}).map((status, i) =>
                        <div key={name + i} className={`bg-gray-500 rounded-token shrink w-3.5 h-10 relative`}></div>
                    )
                }
            </div>
        </div>
    }

    return  <div key={data.name} className="py-2.5 flex flex-row flex-wrap gap-2.5 items-center capitalize justify-between shrink-0 relative overflow-auto">
        <div className="flex flex-row items-center gap-4 ">
            <div className={`text-left relative rounded-token ${
                statusPoints.filter(s => s.type !== 'nothing').every(d => d.type == 'success') ?
                    'bg-success' :
                    statusPoints.filter(s => s.type !== 'nothing').some(d => d.type == 'success') ?
                        'bg-warning' :
                        'bg-error'
            } p-2 text-black`}>
                {(statusPoints.filter((status) => status.type === 'success').length / statusPoints.filter(s => s.type !== 'nothing')?.length || 0) * 100}%
            </div>

            <a href={data.url} className="text-normal text-left relative">{data.name}</a>
        </div>
        <div className={`flex flex-row items-center justify-between shrink-0 
        gap-0.5 lg:gap-2 overflow-clip max-w-full relative`}>
            {
                statusPoints.map((status, i) =>
                    <div key={name + i} className={`${status.type !== 'nothing' ? `bg-${status.type}` : 'bg-gray-500'} rounded-token shrink w-3.5 h-10 relative`}></div>
                )
            }
        </div>
    </div>
}

export const SitesContextProvider = ({children}:{children:any}) => {
    const [siteStatus, setSiteStatus] = useState([])
    return <SiteStatusContext.Provider value={{
        status: siteStatus,
        setStatus: setSiteStatus
    }}>{children}</SiteStatusContext.Provider>
}

const Sites = () =>
        Object.entries(config.track).map(([key, value]) => {
            return value.map(data =>
                <div key={key}>
                    <p className={'font-bold text-lg capitalize'}>{key}</p>
                    <div className={'md:pl-4'}>
                        <Status name={key} data={data}/>
                    </div>
                </div>
            )
        })

export default Sites