"use client"

import config from '../config.yml'
import {useEffect, useState} from "react";
import {status} from "@/pages/api/ping";


const Status = ({name, data}:{name:string, data: typeof config.track[0][0]}) => {
    const [statusPoints, setStatusPoints] = useState<status[]>([])

    useEffect(() => {
        fetch(`/api/get/${name}`).then(async r => setStatusPoints(await r.json()))
    }, []);


    useEffect(() => {
        console.log(statusPoints)
    }, [statusPoints]);

    return  <div key={data.name} className="py-2.5 flex flex-row flex-wrap gap-2.5 items-center capitalize justify-between shrink-0 relative overflow-auto">
        <div className="flex flex-row items-center gap-4 ">
            <div className={`text-left relative rounded ${
                statusPoints.filter(s => s.type !== 'nothing').every(d => d.type == 'success') ?
                    'bg-success' :
                    statusPoints.filter(s => s.type !== 'nothing').some(d => d.type == 'success') ?
                        'bg-warning' :
                        'bg-error'
            } p-2 text-black text-end`}>
                {(statusPoints.filter((status) => status.type === 'success').length / statusPoints.filter(s => s.type !== 'nothing')?.length || 0) * 100}%
            </div>

            <a href={data.url} className="text-normal text-left relative">{data.name}</a>
        </div>
        <div className={`flex flex-row items-center justify-between shrink-0 
        lg:gap-2 lg:rounded-none
        rounded-full overflow-clip max-w-full
        relative`}>
            {
                statusPoints.map((status, i) =>
                    <div key={name + i} className={`${status.type !== 'nothing' ? `bg-${status.type}` : 'bg-gray-500'} blur lg:blur-0 lg:rounded-full shrink w-3.5 h-10 relative`}></div>
                )
            }
        </div>
    </div>
}

const Sites = () => {
    return Object.entries(config.track).map(([key, value]) => {
        return value.map(data =>
            <div key={key}>
                <p className={'font-bold text-lg capitalize'}>{key}</p>
                <div className={'pl-4'}>
                    <Status name={key} data={data}/>
                </div>
            </div>
        )
    })
}

export default Sites