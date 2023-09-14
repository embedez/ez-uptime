"use client"

import {QueryClient} from "react-query";
import {QueryClientProvider} from "react-query";

export const queryClient: QueryClient = new QueryClient()

export const QueryClientWrapper = ({children}:{children:any}) => {
    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}