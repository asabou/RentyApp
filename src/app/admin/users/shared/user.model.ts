import { Role } from "../../roles/shared/role.model";

export class User {
    id: number;
    username: string;
    password?: string;
    roles: Role[];
    constructor(data: any) {
        this.roles = [];
        Object.assign(this, data);
    }
}