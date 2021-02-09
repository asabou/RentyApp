import { UserDetails } from "src/app/admin/users/shared/user-details.model";
import { Address } from "./address.model";

export class EntertainmentPlace {
    id: number;
    name: string;
    description: string;
    profileImage: any; //bytes
    userDetails: UserDetails;
    address: Address;
    
    constructor(data: any) {
        Object.assign(this, data);
    }
}