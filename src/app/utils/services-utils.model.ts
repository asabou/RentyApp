import { JwtHelperService } from '@auth0/angular-jwt';

export class ServicesUtils {

    private static jwtHelper = new JwtHelperService();

    static jsonParse(data: string) {
        return JSON.parse(data);
    }

    static jsonStringify(data: Object) {
        return JSON.stringify(data);
    }

    static base64Encode(data: string): string {
        return btoa(data);
    }

    static jwtDecode(data: string): string {
        return this.jwtHelper.decodeToken(data);
    }

}