import { UserDetails } from "src/app/admin/users/shared/user-details.model";

export class EntertainmentPlace {
    id: number;
    name: string;
    description: string;
    profileImage: Blob;
    userDetails: UserDetails;
    
    constructor(data: any) {
        Object.assign(this, data);
    }
}