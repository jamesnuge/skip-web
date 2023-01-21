export interface Location {
    id?: number;
    name: string;
    altitude: number;
}

export interface LocationWithId extends Location {
    id: number
}

export function isLocation(obj: any): obj is Location {
    return obj.name && obj.altitude;
}