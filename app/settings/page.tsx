"use client"
import { NextPage } from 'next'

import {AddNotification} from "@/app/settings/addNotification";
import {FC, useState} from "react";
import {DeleteNotification} from "@/app/settings/deleteNotification";

export const runtime = 'edge'

const HomePage: NextPage = () => {
    const [page, setPage] = useState<
        'Notification' | string
    >('Notification')

    const Button: FC<{newPage: string, children: any}> = ({newPage, children}) => (
        <button className={`${page == newPage ? 'text-secondary' : 'text-primary'} font-bold text-lg`} onClick={() => setPage(newPage)}>
            {children}
        </button>
    )

    return (
        <div className={'min-h-screen flex flex-col'}>
            <nav className={'w-full p-4 rounded max-w-screen-xl mx-auto'}>
                <div className={'p-4 w-full border-b  border-primary'}>
                    <Button newPage="Notification">Notifications</Button>

                </div>
            </nav>
        <div className='bg-background flex items-center justify-center grow'>
            {
                page == "Notification" &&
                <div className={'flex flex-col max-w-screen-lg'}>
                    <AddNotification/>
                    <DeleteNotification/>
                </div>
            }
        </div>
        </div>
    );
}

export default HomePage