
import { fetchTokenFromStorage } from '../../App';
import { ChassisSetup } from './Chassis';

export const chassisApi = {
    getAll: async () => {
        const response = await fetch(`/api/chassis/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json()
    },
    update: async (chassis: ChassisSetup) => {
        await fetch(`/api/chassis/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(chassis)
        });
    },
    create: async (chassis: ChassisSetup) => {
        await fetch(`/api/chassis/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(chassis)
        });
    }
}