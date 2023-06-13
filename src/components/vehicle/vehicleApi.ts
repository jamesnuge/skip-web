import { secureApi } from '../../api/secureApi';
import { Vehicle } from './Vehicle';


export const vehicleApi = {
    getAll: async () => {
        const response = await secureApi.get(`vehicle/all`);
        return await response.json() as Vehicle[]
    },
    getAllSummaries: async () => {
        const response = await secureApi.get('vehicle/summary/all')
        return response.json()
    },
    update: async (vehicle: Vehicle) => {
        await secureApi.post(`vehicle/update`, vehicle);
    },
    create: async (vehicle: Vehicle) => {
        await secureApi.put(`vehicle/create`, vehicle);
    },
    get: async (id: number) => {
        const response = await secureApi.get(`vehicle/${id}`);
        return await response.json() as Vehicle 
    },
    archiveVehicle: async (id: number) => {
        await secureApi.put(`vehicle/archive/${id}`, {})
    }
}
