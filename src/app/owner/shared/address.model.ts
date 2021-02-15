export class Address {
    id: number;
    county: string;
    city: string;
    street: string;
    number: string;

    clearFields(): void {
        this.county = "";
        this.city = "";
        this.street = "";
        this.number = "";
    }

    constructor() {
        this.clearFields();
    }
}