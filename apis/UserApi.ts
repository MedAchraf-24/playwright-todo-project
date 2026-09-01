import { APIRequestContext } from "@playwright/test";
import User from "../models/User";
export default class UserApi {
    private request:APIRequestContext
    constructor(request: APIRequestContext){
        this.request = request;
    }

    async register(user: User) {
    return await this.request.post('/api/v1/users/register', {
        data: {
            email: user.getEmail(),
            password: user.getPassword(),
            firstName: user.getFirstName(),
            lastName: user.getLastName()
        }
    })
    }
}