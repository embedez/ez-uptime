"use client"
import { GetServerSideProps, NextPage } from 'next'

import {useState} from "react";

const HomePage: NextPage = () => {
    // Initial data state
    const [form, setForm] = useState({ startTime: new Date().getTime(), endTime: '', key: '', name: '', description: '' });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(form);
        // here you can write the logic to send this data to your server
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='bg-background min-h-screen flex items-center justify-center'>
            <form className='bg-background shadow-md rounded px-8 pt-6 pb-8 mb-4 justify-between max-w-screen-lg flex flex-row gap-5 flex-wrap' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='startTime'>
                        Start Time
                    </label>
                    <input className='bg-background focus:border-secondary transition shadow appearance-none border rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                           id='startTime' type='time' name='startTime' value={form.startTime} onChange={handleChange}/>
                </div>

                <div className='mb-4'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='endTime'>
                        End Time
                    </label>
                    <input className='bg-background focus:border-secondary transition shadow appearance-none border rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                           id='endTime' type='time' name='endTime' value={form.endTime} onChange={handleChange}/>
                </div>

                <div className='mb-4'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='key'>
                        Key
                    </label>
                    <input className='bg-background focus:border-secondary transition shadow appearance-none border rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                           id='key' type='text' name='key' value={form.key} onChange={handleChange}/>
                </div>

                <div className='mb-4'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='name'>
                        Name
                    </label>
                    <input className='bg-background focus:border-secondary transition shadow appearance-none border rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                           id='name' type='text' name='name' value={form.name} onChange={handleChange}/>
                </div>

                <div className='mb-6 w-full'>
                    <label className='block bg-normal text-sm font-bold mb-2' htmlFor='description'>
                        Description
                    </label>
                    <textarea className='bg-background focus:border-secondary transition shadow appearance-none border rounded w-full py-2 px-3 bg-normal leading-tight focus:outline-none focus:shadow-outline'
                              id='description' name='description' value={form.description} onChange={handleChange}/>
                </div>

                <div className='flex items-center justify-between w-full'>
                    <button className='bg-error mx-auto hover:bg-warning hover:text-black transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                        New Status
                    </button>
                </div>
            </form>
        </div>
    );
}

export default HomePage