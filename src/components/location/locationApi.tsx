
import { fetchTokenFromStorage } from '../../App';
import { LocationWithId } from './Location';

export const locationApi = {
    getAll: async () => {
        const response = await fetch(`/api/ui/location/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json()
    },
    update: async (location: LocationWithId) => {
        await fetch(`/api/ui/location/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(location)
        });
    },
    create: async (location: Location) => {
        await fetch(`/api/ui/location/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(location)
        });
    }
}