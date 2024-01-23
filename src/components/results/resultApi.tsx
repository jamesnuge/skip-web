import { fetchTokenFromStorage } from "../../App";
import { secureApi } from "../../api/secureApi";
import { RaceRequest } from "../query/QueryRaceResults";
import { Result, ResultVehicleConfig } from "./Results";

export const resultApi = {
    getAll: async () => {
        const response = await secureApi.get(`results/all`)
        return await response.json() as Result[]
    },
    queryRaceResult: async ({temperature, humidity, trackTemperature, trackmeter}: RaceRequest): Promise<Result[]> => {
        const response = await secureApi.get(`results/match?temperature=${temperature}&humidity=${humidity}&trackmeter=${trackmeter}&trackTemperature=${trackTemperature}`);
        return await response.json() as Result[]
    },
    customQuery: async (criteria: any[]): Promise<Result[]> => {
        const response = await secureApi.post(`results/customSearch`, criteria);
        return await response.json() as Result[]
    },
    save: async (result: any): Promise<Response> => {
        return await secureApi.put(`results/save`, result)
    },
    getVehicleConfig: async (id: number) => {
        const response = await secureApi.get(`results/vehicle-config/${id}`)
        return await response.json() as ResultVehicleConfig
    },
    getByVehicle: async (id: number) => {
        const response = await secureApi.get(`results/vehicle/${id}`)
        return await response.json() as Result[]
    },
    addTuneupFile: async (result: {resultId: number, tuneupFile: string}) => {
        return secureApi.put(`results/add-tuneup-file`, result);
    }
}

export const resultApiUtil = {
    
}