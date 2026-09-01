import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

export default class TodoApi {
    
    private request: APIRequestContext;
    constructor(request: APIRequestContext){
            this.request = request;
        }

    async addTodo(user:User) {
    return await this.request.post("/api/v1/tasks", {
            headers: {
                'Authorization': `Bearer ${user.getAccessToken()}`,
            },
            data: {
                isCompleted: false,
                item: "Playwright",
            }
        })
    }
}