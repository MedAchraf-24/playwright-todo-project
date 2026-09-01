import { test, expect } from "@playwright/test";
import User from "../models/User";
import RegisterPage from "../pages/RegisterPage";
import TodoPage from "../pages/TodoPage";

test ("Should be able to register to the todo website", async ({page, request, context}) => {

    const user = new User();

    // await page.goto("/signup"); In POM, instead of using this line of code we can do this:
    const registerPage = new RegisterPage(page);
    await registerPage.load();
    await registerPage.register(user);

    const todoPage = new TodoPage(page);
    // Assersions must be present if not we can not say that this is a test case
    await expect(todoPage.getWelcomeMessage()).toBeVisible();

})