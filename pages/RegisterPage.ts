import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import Config from "../playwright.config";

export default class RegisterPage {
    private page:Page;
    private request?: APIRequestContext;
    private context?: BrowserContext;
    // Constructer
    constructor(page:Page, request?:APIRequestContext, context?:BrowserContext){
        this.page = page;
        this.request = request;
        this.context = context;
    }
    // Elements
    private get firstNameInput(){
        return '[data-testid="first-name"]';
    }
    private get lastNameInput(){
        return '[data-testid="last-name"]';
    }
    private get emailInput(){
        return '[data-testid="email"]';
    }
    private get passwordInput(){
        return '[data-testid="password"]';
    }
    private get confirmPasswordInput(){
        return '[data-testid="confirm-password"]';
    }
    private get submitButton(){
        return '[data-testid="submit"]';
    }

    // Methods or Steps
    async load(){
        await this.page.goto("/signup");
    }

    async register(user:User){
        await this.page.locator(this.firstNameInput).fill(user.getFirstName());
        await this.page.locator(this.lastNameInput).fill(user.getLastName());
        await this.page.locator(this.emailInput).fill(user.getEmail());
        await this.page.locator(this.passwordInput).fill(user.getPassword());
        await this.page.locator(this.confirmPasswordInput).fill(user.getPassword());
        await this.page.click(this.submitButton);
    }

    async registerUsingTheAPI(user:User){
        const response = await new UserApi(this.request!).register(user);
        
        const responseBody = await response.json();
        const accessToken = responseBody.access_token;
        const userID = responseBody.userID;
        const firstName = responseBody.firstName;
        
        user.setAccessToken(accessToken);
        
        await this.context!.addCookies ([
            {
                name: "access_token",
                value: accessToken,
                url: Config.use?.baseURL
            },
            {
                name: "userID",
                value: userID,
                url: Config.use?.baseURL
            },
            {
                name: "firstName",
                value: firstName,
                url: Config.use?.baseURL
            }
        ])
    }
}