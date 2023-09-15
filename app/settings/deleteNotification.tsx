import {useQuery} from "react-query";
import {useState} from "react";
import {queryClient} from "@/app/queryClient";
import {Notification} from "@/components/notification";

const stockData = {
    "startTime":"2023-09-13T05:11",
    "endTime":"2023-09-14T05:11",
    "key":"embedez",
    "id": "pkijndsfg",
    "name":"Working on uptime page",
    "description":"The uptime page is having work done to it so it may go down in the following hours.",
    "timestamp":{"end":"2023-09-14T05:11","start":"2023-09-13T05:11"}
}
export type typeData = typeof stockData

export const DeleteNotification = () => {
    const {isLoading, error, data} = useQuery<typeData[]>('notifications', () =>
      fetch('/api/get/notice').then(res => res.json())
    )
    const [deleted, setDeleted] = useState<number[]>([])

    if (isLoading || (!data && !error)) return <p>Loading...</p>
    if (error || !data) return <>error</>

    const deleteIndex = (id:string) => {
        fetch(`/api/notice/delete?id=${id}`).then(async d => {
            queryClient.setQueryData("notifications", await d.json())
        })
    }

    return <div className={'flex flex-row flex-wrap gap-4'}>
        {
            data.map((d, index) => {
                return <div key={d.name} className={`max-w-[300px] relative ${deleted.includes(index) ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <button className={'absolute right-0 top-0 text-error hover:bg-error hover:text-normal duration-300 w-9 h-9 rounded-token'} onClick={() => deleteIndex(d.id)}>✕</button>
                    <Notification data={d} />
                </div>
            })
        }
    </div>
}