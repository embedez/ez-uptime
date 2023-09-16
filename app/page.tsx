import Sites, {SitesContextProvider, Total} from "@/app/sites";
import {Notifications} from "@/components/notification";
import Link from "next/link";

export const runtime = 'edge'
export default function Home() {
  return (
    <main className="bg-background p-2 max-w-screen-lg min-h-screen flex flex-col mx-auto gap-4">

                <div className={'gap-4 flex flex-col'}>
                    <div className={'w-full flex flex-row justify-between'}>
                        <p className={'font-bold text-lg capitalize'}>Current Notice</p>
                        <Link href={'/notices'} className={'underline'}>All Notices</Link>
                    </div>
                    <div className={'md:ml-4 w-full md:w-auto justify-center md:justify-start flex flex-row flex-wrap gap-4'}>
                        <Notifications showLive/>
                    </div>
                </div>

                <Sites/>
    </main>
  )
}
