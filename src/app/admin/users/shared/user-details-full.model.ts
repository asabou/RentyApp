export class UserDetailsFull {
    id: number;
    username: string;
    roles: string;
    firstName: string;
    lastName: string;
    email: string;
    telNumber: string;
    
    constructor(data: any) {
        Object.assign(this, data);
    }
}