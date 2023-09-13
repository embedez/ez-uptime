import {useQuery} from "react-query";
import {useState} from "react";
import {queryClient} from "@/app/settings/queryClient";

const stockData = [{"startTime":"2023-09-13T05:11","endTime":"2023-09-14T05:11","key":"embedez","name":"Working on uptime page","description":"The uptime page is having work done to it so it may go down in the following hours.","timestamp":{"end":"2023-09-14T05:11","start":"2023-09-13T05:11"}}]
type typeData = typeof stockData

export const DeleteNotification = () => {
    const {isLoading, error, data} = useQuery<typeData>('notifications', () =>
      fetch('/api/get/notice').then(res => res.json())
    )
    const [deleted, setDeleted] = useState<number[]>([])

    if (isLoading || (!data && !error)) return <p>Loading...</p>
    if (error || !data) return <>error</>

    const deleteIndex = (index:number) => {
        fetch(`/api/notice/delete?n=${index}`).then(async d => {
            queryClient.setQueryData("notifications", await d.json())
        })
    }

    return <div>
        {
            data.map((d, index) => {
                return <div key={d.name} className={`max-w-[300px] ${deleted.includes(index) ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <div className={'w-full flex flex-row items-center justify-between'}>
                        <label className={"text-lg font-bold"}>{d.name}</label>
                        <button className={'text-error hover:bg-error hover:text-normal duration-300 w-8 h-8 rounded-token'} onClick={() => deleteIndex(index)}>✕</button>
                    </div>
                    <p className={'break-words'}>{d.description}</p>
                    <p className={'text-sm text-normal opacity-80 font-thin italic'}>Site: {d.key}</p>
                </div>
            })
        }
    </div>
}