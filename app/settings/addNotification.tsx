import { NextPage } from 'next'
import {useState} from "react";

import config from '../../config.yml'
import {queryClient} from "@/app/queryClient";

export const AddNotification: NextPage = () => {
    const [form, setForm] = useState({
        timestamp: {
            end: new Date().toISOString().slice(0, 16),
            start: new Date().toISOString().slice(0, 16),
        },
        key: Object.keys(config.track)[0],
        name: '',
        description: ''
    });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(form);

        fetch('/api/notice', {
            method: 'POST',
            body: JSON.stringify(form)
        }).then(async r => {
            queryClient.setQueryData("notifications", await r.json())
        })
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleTimeChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({
            ...form,
            timestamp: {
                ...form.timestamp,
                [e.target.name]: e.target.value,
            }
        });
    }

    return (
            <form className='bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4 justify-between w-full flex flex-row gap-5 flex-wrap' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='startTime'>
                        Start Time
                    </label>
                    <input
                        className='border border-primary form-input bg-background focus:border-secondary transition shadow appearance-none rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                        id='startTime' type='datetime-local' name='start' value={form.timestamp.start} onChange={handleTimeChange}/>
                </div>

                <div className='mb-4'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='endTime'>
                        End Time
                    </label>
                    <input className='bg-background focus:border-secondary transition shadow appearance-none border border-primary rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                           id='endTime' type='datetime-local' name='end' value={form.timestamp.end} onChange={handleTimeChange}/>
                </div>

                <div className='mb-4'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='key'>
                        Key
                    </label>
                    <select id={'key'} name={'key'} onChange={handleChange} className={'bg-background focus:border-secondary transition shadow appearance-none border border-primary rounded w-full py-2 px-4 bg-normal leading-tight focus:outline-none focus:shadow-outline'}>
                        {
                           Object.keys(config.track).map(e => <option key={e} value={e}>
                                {e}
                            </option>)
                        }
                    </select>
                </div>

                <div className='mb-4 grow'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input className='form-input bg-background focus:border-secondary transition shadow appearance-none border border-primary rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                           id='name' type='text' name='name' value={form.name} onChange={handleChange}/>
                </div>

                <div className='mb-6 w-full'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='description'>
                        Description
                    </label>
                    <textarea className='form-textarea bg-background focus:border-secondary transition shadow appearance-none border border-primary rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                              id='description' name='description' value={form.description} onChange={handleChange}/>
                </div>

                <div className='flex items-center justify-between w-full'>
                    <button className='bg-error mx-auto hover:bg-success hover:text-black transition duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                        New Status
                    </button>
                </div>
            </form>
    );
}