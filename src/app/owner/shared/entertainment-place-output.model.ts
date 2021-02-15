import { Address } from "./address.model";

export class EntertainmentPlaceOutput {
    userDetailsId: number;
    name: string;
    description: string;
    profileImage: any;
    address: Address;
    entertainmentActivity: string;
    pricePerHour: number;
    maxPeopleAllowed: number;

    constructor() {
        this.address = new Address();
        this.clearFields();
    }

    clearFields(): void {
        this.name = "";
        this.description = "";
        this.profileImage = "";
        this.pricePerHour = 0;
        this.maxPeopleAllowed = 0;
        this.address.clearFields();
    }
}