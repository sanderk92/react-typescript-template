export enum DataStatus {
    open,
    running,
    cancelled,
    finished
}

export interface DataView {
    id: string,
    status: DataStatus,
    company: string,
    time: Date,
}

export interface DataEntry {
    company: string,
}