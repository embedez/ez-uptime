declare module "*config.yml" {
    const value: {
        track: {
            [key: string]: {
                name?: string,
                url: string,
                regions?: {
                    [key: string]: {
                        name?: string,
                        url: string
                    },
                }
            }[]
        }
    };
    export default value;
}