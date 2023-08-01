export interface Data {
    id: string,
    status: 'open' | 'running' | 'cancelled' | 'finished',
    company: string,
    time: Date,
}

export interface DataEntry {
    company: string,
}