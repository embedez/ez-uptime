import { ImageResponse } from 'next/server'
import userConfig from "@/config.yml";
import {statusType} from "@/pages/api/stats";
import {Cloudflare} from "@/app/store";
import colors from '@/colors.json'
import {undefined} from "zod";

const cloudflare = new Cloudflare()

export const runtime = 'edge'

export const alt = 'Stats'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

const fakeData = {
    "name": "embedez",
    "status": [
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "type": "nothing",
            "code": 0,
            "description": ""
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        },
        {
            "description": "OK",
            "code": 200,
            "type": "success"
        }
    ]
}

type statsType = typeof fakeData

// Image generation
export default async function Image() {
    const everything: statsType[] = []
    try {
        for (const [name, value] of Object.entries(userConfig.track)) {
            let data = await cloudflare.get(name)
            data = Array.isArray(data) ? data?.filter((t:statusType) => t.type !== 'nothing') : []

            let status: statusType[] = Array(30).fill(null).map((e, i) => data[i] || {
                type: 'nothing',
                code: 0,
                description: "",
            } as statusType).reverse();

            status = status.slice(-60)
            everything.push({
                name,
                status
            })
        }
    } catch (e) {
        console.log(e)
    }

    const statusPoints = everything.reduce((current: any[], accum) => {
        return [...current, ...accum.status]
    }, []).filter(t => t.type !== "nothing")

    return new ImageResponse((// ImageResponse JSX element
            <div
                style={{
                    background: `rgb(${colors["color-background"]})`,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: 'flex-start',
                    justifyContent: 'space-around',
                    color: 'white',
                }}
            >
                {
                    everything.map((data, index) => <div
                        key={data.name + index}
                        style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: "column",
                            flexWrap: "wrap",
                            maxWidth: '50vw',
                            color: `rgb(${colors["color-text"]})`,
                        }}
                    >
                        <p style={{
                            fontSize: 24,
                            width: data.name.length * 10,
                        }}><b>{data.name}</b></p>
                        <div
                            key={data.name + index}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                marginLeft: '1rem',
                                gap: '1px',
                                color: `rgb(${colors["color-text"]})`,
                            }}
                        >
                            {
                                data.status.map((code, index) => {
                                    return <div
                                        key={code.type + index}
                                        style={{
                                            borderRadius: "100px",
                                            width: "1rem",
                                            height: "2.5rem",
                                            backgroundColor:
                                                code.type == "success" ? `rgb(${colors["color-success"]})` :
                                                          code.type == "error" ? `rgb(${colors["color-error"]})` :
                                                                    code.type == "warning" ? `rgb(${colors["color-warning"]})` :
                                                                              "grey"
                                        }}
                                    />
                                })
                            }
                        </div>
                    </div>)
                }
                <div style={{
                    position: 'absolute',
                    color: `rgb(${colors["color-text"]})`,
                    margin: 0,
                    marginLeft: `1rem`,
                    fontSize: 24,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'center',
                    gap: "7px",
                    left: 0
                }}>

                    <svg width={"30px"} viewBox="0 0 390 390" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M164.44 325.5C164.44 328.261 162.201 330.5 159.44 330.5H9C6.23857 330.5 4 328.261 4 325.5V64.5C4 61.7386 6.23858 59.5 9 59.5H159.44C162.201 59.5 164.44 61.7386 164.44 64.5V86.2457C164.44 89.0071 162.201 91.2457 159.44 91.2457H45.29C42.5286 91.2457 40.29 93.4843 40.29 96.2457V168.707C40.29 171.469 42.5286 173.707 45.29 173.707H142.25C145.011 173.707 147.25 175.946 147.25 178.707V199.679C147.25 202.44 145.011 204.679 142.25 204.679H45.29C42.5286 204.679 40.29 206.917 40.29 209.679V293.754C40.29 296.516 42.5286 298.754 45.29 298.754H159.44C162.201 298.754 164.44 300.993 164.44 303.754V325.5Z" fill="#4979F3" stroke="white" strokeWidth="7" strokeLinecap="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M386 325.5C386 328.261 383.761 330.5 381 330.5H201.91C199.149 330.5 196.91 328.261 196.91 325.5V303.381C196.91 302.384 197.208 301.41 197.765 300.584L333.753 99.0423C335.994 95.7215 333.615 91.2457 329.609 91.2457H208.404C205.643 91.2457 203.404 89.0071 203.404 86.2457V64.5C203.404 61.7386 205.643 59.5 208.404 59.5H375.652C378.413 59.5 380.652 61.7386 380.652 64.5V85.8452C380.652 86.8418 380.354 87.8157 379.797 88.6418L243.809 290.183C241.568 293.504 243.947 297.98 247.953 297.98H381C383.761 297.98 386 300.219 386 302.98V325.5Z" fill="#4979F3" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg><div>Uptime</div>

                </div>

                <div style={{
                    position: 'absolute',
                    color: `rgb(${colors["color-text"]})`,
                    backgroundColor:
                        statusPoints.every(t => t.type == "success") ? `rgb(${colors["color-success"]})` :
                            statusPoints.some(t => t.type == 'warning') ? `rgb(${colors["color-warning"]})` :
                                `rgb(${colors["color-error"]})`
                    ,
                    margin: 0,
                    marginRight: `1rem`,
                    fontSize: 24,
                    bottom: 0,
                    paddingLeft: "1rem",
                    paddingRight: "1rem",
                    borderRadius: '100px',
                    display: 'flex',
                    flexDirection: "row",
                    alignItems: 'flex-end',
                    right: 0
                }}>
                    {
                        statusPoints.every(t => t.type == "success") ? "100%" :
                            `${((statusPoints.filter(t => t.type == "success").length / statusPoints.length)*100)}%`
                    }
                </div>
    </div>
),
    // ImageResponse options
    {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
    ...size,

    }
)
}