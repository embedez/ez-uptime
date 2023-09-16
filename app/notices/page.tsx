"use client"
import { NextPage } from 'next'
import Sites, {SitesContextProvider, Total} from "@/app/sites";
import {queryClient, QueryClientWrapper} from "@/app/queryClient";
import Link from "next/link";
import {Notification, Notifications} from "@/components/notification";
import {useQuery} from "react-query";
import {useState} from "react";
import {typeData} from "@/app/settings/deleteNotification";
import moment from "moment";
import { groupBy } from 'lodash';

export const runtime = 'edge'

const HomePage: NextPage = () => {
    const {isLoading, error, data} = useQuery<typeData[]>('notifications', () =>
        fetch('/api/get/notice').then(res => res.json())
    );

    if (isLoading || (!data && !error)) return <p>Loading...</p>;
    if (error || !data) return <>error</>;

    // Group data by date
    const groupedData = groupBy(data, d => moment(new Date(d.timestamp.start)).format('YY-M-DD'));

    // Create array of dates from start day to end day
    const startDate = moment.min(data.map(d => moment(d.timestamp.start)));
    const endDate = moment.max(data.map(d => moment(d.timestamp.end)));
    const dateArray = [];

    for (let date = moment(startDate); date.diff(endDate, 'day') <= 0; date.add(1, 'days')) {
        dateArray.push(date.format('YY-M-DD'));
    }

    return (
        <main className="bg-background p-2 max-w-screen-lg min-h-screen flex flex-col mx-auto gap-4 w-full">
            <div className={'gap-4 flex flex-col w-full'}>
                <div className={'w-full flex flex-row justify-between'}>
                    <p className={'font-bold text-lg capitalize'}>All Time</p>
                </div>
                <div className={'md:ml-4 w-full md:w-auto justify-center items-stretch md:justify-start flex flex-col flex-wrap gap-4'}>
                    {
                        dateArray.map((day, index) => {
                            const notifications = groupedData[day] || [];
                            return (
                                <div key={day} className="w-full relative">
                                    <p className="w-full border-b border-primary">{day}</p>
                                    {
                                        notifications.length > 0 ?
                                            notifications.map((d, index) =>
                                                <div key={d.name} className={'md:ml-4'}>
                                                    <Notification data={d} />
                                                </div>)
                                            : <p>No events this day</p>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    );
}

export default HomePage