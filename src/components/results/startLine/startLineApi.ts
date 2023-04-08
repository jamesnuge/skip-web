
import { fetchTokenFromStorage } from '../../../App';
import { StartLine } from './StartLine';

export const startLineApi = {
    getVehiclesPreviousStartLine: async (id: number) => {
        const response = await fetch(`/api/vehicle/${id}/latestStartLine`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json() as StartLine
    }
}