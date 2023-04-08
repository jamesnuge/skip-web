import {ChassisSetup} from '../chassis/Chassis';

export interface VehicleSummary {
    id: number,
    name: string
}

export interface Vehicle extends VehicleSummary {
    chassisSetup: ChassisSetup;
    clutch: Clutch;
    suspension: Suspension,
    converter: Converter,
    transmission: Transmission,
    weight: Weight,
    tyresAndRims: TyresAndRims,
    wheelieBars: WheelieBars
}

export interface Clutch {
    id: number;
    primaryWeight: number;
    secondaryWeight: number,
    baseTurns: number,
    hardness: number,
    lockUpActivated: string,
    locked: string
}

export interface Suspension {
    id?: number,
    extensionFromTight: number,
    compressionFromTight: number,
    extensionHighSpeed: number,
    extensionLowSpeed: number,
    compressionHighSpeed: number,
    compressionLowSpeed: number,
    frontCanisterPressure: number,
    rearCanisterPressure: number
}

export interface Converter {
    id?: number,
    pumpSize: number,
    stator: string
}

export interface Transmission {
    id?: number,
    first: number,
    second: number,
    third: number,
    fourth: number,
    fifth: number,
    sixth: number,
    seventh: number,
    rearGear: number,
}

export interface Weight {
    frontLeft: number,
    frontRight: number,
    rearLeft: number,
    rearRight: number,
    additional: number
}

export interface TyresAndRims {
    id?: number,
    brand: String,
    size: number,
    pressure: number

}

export interface WheelieBars {
    id?: number
    length: number,
    height: number,
    stagger: number
}