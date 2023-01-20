export interface Location {
    id?: number;
    name: string;
    altitude: number;
}

export interface LocationWithId extends Location {
    id: number
}

export function isLocation(obj: unknown): obj is Location {
    return typeof obj === 'object' &&
        obj as any['name'] != null && typeof obj as any['name'] === 'string' &&
        obj as any['altitude'] != null && typeof obj as any['altitude'] === 'number'
}