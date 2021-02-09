import { User } from "./user.model";

export class UserDetails {
    id: number;
    user: User;
    firstName: string;
    lastName: string;
    email: string;
    telNumber: string;
    constructor(data: any) {
        this.user = new User(null);
        Object.assign(this, data);
    }
}