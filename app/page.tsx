import Sites from "@/app/sites";

export const runtime = 'edge'
export default function Home() {
  return (
    <main className="bg-background p-2 max-w-screen-lg mx-auto">
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

            {
                /*
                  <button className="bg-background text-normal border border-primary rounded px-2 ml-auto" onClick={() => setShowAddSite(!showAddSite)} >
                    Add Site
                  </button>
                  {
                    showAddSite && <AddSite />
                  }
                */
            }

        </div>
        <Sites/>
    </main>
  )
}
