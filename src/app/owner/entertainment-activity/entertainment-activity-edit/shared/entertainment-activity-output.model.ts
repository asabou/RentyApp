export class EntertainmentActivityOutput {
    entertainmentActivityId: number;
    entertainmentPlaceId: number;
    price: number;
    maxPeopleAllowed: number;
    
    clearFields(): void {
        this.entertainmentPlaceId = 0;
        this.entertainmentActivityId = 0;
        this.price = 0;
        this.maxPeopleAllowed = 0;
    }

    constructor() {
        this.clearFields();
    }
}