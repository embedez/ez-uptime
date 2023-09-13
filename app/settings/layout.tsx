"use client"

import {QueryClientProvider} from "react-query";
import {ReactNode} from "react";
import {queryClient} from "@/app/settings/queryClient";

export default function Layout({ children }:{children: ReactNode}) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <main>{children}</main>
            </QueryClientProvider>
        </>
    )
}