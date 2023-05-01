import { fetchTokenFromStorage } from "../../App";
import { RaceRequest } from "../query/QueryRaceResults";
import { Result } from "./Results";

export const resultApi = {
    getAll: async () => {
        const response = await fetch(`/api/results/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
        });
        return await response.json() as Result[]
    },
    queryRaceResult: async ({temperature, humidity, trackTemperature, trackmeter}: RaceRequest): Promise<Result[]> => {
        const response = await fetch(`/api/results/match?temperature=${temperature}&humidity=${humidity}&trackmeter=${trackmeter}&trackTemperature=${trackTemperature}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            }
        });
        return await response.json() as Result[]
    },
    // TODO: Fix typing here
    save: async (result: any): Promise<Response> => {
        return fetch(`/api/results/save`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            // TODO: Fix typing here
            body: JSON.stringify(result)
        })
    }
    
}

export const resultApiUtil = {
    
}