import { Location } from "@angular/common";

export abstract class  AbstractComponent {

    constructor(public location: Location) {
    }

    back() {
        this.location.back();
    }

    abstract getEntityId(): number;

    abstract getAllData(): void;
}