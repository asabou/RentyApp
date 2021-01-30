import { Injectable } from "@angular/core";
import { ServicesUtils } from "src/app/utils/services-utils.model";
import { SessionObject } from "./session-object.model";

export const SESSION_OBJECT = "SESSION_OBJECT";

@Injectable()
export class SessionObjectService {

    createSessionObject() {
        if (!localStorage.getItem(SESSION_OBJECT)) {
            let sessionObject: SessionObject = new SessionObject();
            this.setSessionObject(sessionObject);
        }
    }

    destroySessionObject() {
        localStorage.removeItem(SESSION_OBJECT);
    }

    private setSessionObject(sessionObject: SessionObject) {
        localStorage.setItem(SESSION_OBJECT, ServicesUtils.jsonStringify(sessionObject));
    }

    getSessionObject() {
        return ServicesUtils.jsonParse(localStorage.getItem(SESSION_OBJECT));
    }

    setToken(token: string) {
        let sessionObject: SessionObject = this.getSessionObject();
        sessionObject.token = token;
        this.setSessionObject(sessionObject);
    }

    getToken(): string {
        let sessionObject: SessionObject = this.getSessionObject();
        return sessionObject.token;
    }

}