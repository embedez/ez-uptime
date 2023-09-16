import './globals.css'
import type { Metadata } from 'next'
import { Total, SitesContextProvider} from "@/app/sites";
import {QueryClientWrapper} from "@/app/queryClient";

console.log(process.env.HOST_URL)
export const metadata: Metadata = {
  title: 'Ez Uptime',
  description: 'Edge uptime by the EZ team',
  themeColor: 'black',
  metadataBase: typeof process.env.HOST_URL == "string" ? new URL(process.env.HOST_URL) : undefined,
    twitter: {
      images: `${process.env.HOST_URL}/api/info`,
    }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'min-h-screen flex flex-col'}>
        <QueryClientWrapper>
          <SitesContextProvider>
            <div className="bg-background max-w-screen-xl w-full mx-auto rounded flex flex-row p-2">
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
            {children}
          </SitesContextProvider>
        </QueryClientWrapper>
      </body>
    </html>
  )
}
