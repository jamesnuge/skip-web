import { fetchTokenFromStorage } from "../../App";
import { RaceRequest } from "../query/QueryRaceResults";
import { Result, ResultVehicleConfig } from "./Results";

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
    },
    getVehicleConfig: async (id: number) => {
        const response = await fetch(`/api/results/vehicle-config/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            }
        })
        return await response.json() as ResultVehicleConfig
    },
    getByVehicle: async (id: number) => {
        const response = await fetch(`/api/results/vehicle/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            }
        });
        return await response.json() as Result[]
    },
    addTuneupFile: async (result: {resultId: number, tuneupFile: string}) => {
        return fetch(`/api/results/add-tuneup-file`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + fetchTokenFromStorage()
            },
            body: JSON.stringify(result)
        })

    }
}

export const resultApiUtil = {
    
}