import { Address } from "./address.model";

export class EntertainmentPlaceOutput {
    userDetailsId: number;
    name: string;
    description: string;
    profileImage: Blob;
    address: Address;
    entertainmentActivities: string[];
    pricePerHour: number;
    maxPeopleAllowed: number;
}