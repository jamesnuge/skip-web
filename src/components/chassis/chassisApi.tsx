
import { fetchTokenFromStorage } from '../../App';
import { ChassisSetup } from './Chassis';

const baseUrl = '/api/ui/vehicle/chassis'

export const chassisApi = {
    getAll: async () => {
        const response = await fetch(`${baseUrl}/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json()
    },
    update: async (chassis: ChassisSetup) => {
        await fetch(`${baseUrl}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(chassis)
        });
    },
    create: async (chassis: ChassisSetup) => {
        await fetch(`${baseUrl}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(chassis)
        });
    }
}