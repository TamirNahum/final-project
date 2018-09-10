import { CarTypeInfo } from "./car-type-info.model";
import { BranchInfo } from "./branch-info.model";

export interface Car {
    CarId:number;
    CarType: number;
    CarNumber: string;
    Kilometerage: number;
    IsProperForRent:boolean;
    IsFreeForRent:boolean;
    AvailableAtBranch:number;
    Image:string;
    CarTypeModel:CarTypeInfo;
    Branch:BranchInfo;
}

