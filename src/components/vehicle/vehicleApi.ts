import { fetchTokenFromStorage } from '../../App';
import {Vehicle, VehicleSummary} from './Vehicle';

const baseUrl = '/api/vehicle';

export const vehicleApi = {
    getAll: async () => {
        const response = await fetch(`${baseUrl}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json() as Vehicle[]
    },
    getAllSummaries: async () => {
        const response = await fetch(`${baseUrl}/summary/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json() as VehicleSummary[]
    },
    update: async (vehicle: Vehicle) => {
        await fetch(`${baseUrl}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(vehicle)
        });
    },
    create: async (vehicle: Vehicle) => {
        await fetch(`${baseUrl}/create`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(vehicle)
        });
    }
}
