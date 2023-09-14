import Sites, {SitesContextProvider, Total} from "@/app/sites";
import {Notifications} from "@/components/notification";
import {QueryClientWrapper} from "@/app/queryClient";

export const runtime = 'edge'
export default function Home() {
  return (
    <main className="bg-background p-2 max-w-screen-lg min-h-screen flex flex-col mx-auto gap-4">
        <SitesContextProvider>
            <div className="bg-background rounded flex flex-row p-2">
                <div
                    id="image+text"
                    className="flex flex-row items-center justify-center"
                >
                    <img
                        className="h-16 rounded-full"
                        src="https://media.discordapp.net/attachments/1011084847130869912/1125622830860615711/Frame_1_6.png"
                        alt="Ez"
                    />
                    <h1 className="text-3xl font-bold text-primary pl-2">Uptime</h1>
                </div>

                <div className={'ml-auto my-auto'}>
                    <Total/>
                </div>
            </div>

            <QueryClientWrapper>
                <div className={'gap-4 flex flex-col'}>
                    <p className={'font-bold text-lg capitalize'}>Notice</p>
                    <div className={'md:ml-4 w-full md:w-auto justify-center md:justify-start flex flex-row flex-wrap gap-4'}>
                        <Notifications/>
                    </div>
                </div>

                <Sites/>
            </QueryClientWrapper>
        </SitesContextProvider>
    </main>
  )
}
