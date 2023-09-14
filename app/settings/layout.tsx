import {ReactNode} from "react"
import {QueryClientWrapper} from "@/app/queryClient";

export default function Layout({ children }:{children: ReactNode}) {
    return (
        <>
            <QueryClientWrapper>
                <main>{children}</main>
            </QueryClientWrapper>
        </>
    )
}