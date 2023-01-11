import { fetchTokenFromStorage } from "../../App";
import { RaceRequest } from "../query/QueryRaceResults";

export const resultApi = {
    getAll: async () => {
        const response = await fetch('http://localhost:3000/api/results/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json()
    },
    queryRaceResult: async ({temperature, humidity, trackTemperature, trackmeter}: RaceRequest) => {
        const response = await fetch(`http://localhost:3000/api/results/match?temperature=${temperature}&humidity=${humidity}&trackmeter=${trackmeter}&trackTemperature=${trackTemperature}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            }
        });
        return await response.json()
    }
    
}