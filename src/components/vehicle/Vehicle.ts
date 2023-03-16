import {ChassisSetup} from '../chassis/Chassis';

export interface VehicleSummary {
    id: number,
    name: string
}

export interface Vehicle extends VehicleSummary {
    chassisSetup: ChassisSetup
}
