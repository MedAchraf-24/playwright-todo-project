import { test, expect } from "@playwright/test";
import User from "../models/User";

import TodoApi from "../apis/TodoApi";
import RegisterPage from "../pages/RegisterPage";
import NewTodoPage from "../pages/NewTodoPage";
import TodoPage from "../pages/TodoPage";

test ("Should be able to add a todo", async ({page, request, context}) => {

    const user = new User();
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingTheAPI(user);
    const newTodoPage = new NewTodoPage(page);
    await newTodoPage.load();
    await newTodoPage.addNewTask('Playwright');
    const todoPage = new TodoPage(page);
    const todoText = await todoPage.getTodoTextByIndex(0);
    expect(todoText).toEqual('Playwright');
})

test ("Should be able to delete a todo", async ({page, request, context}) => {

    const user = new User();
    const registerPage = new RegisterPage(page, request, context);
    await registerPage.registerUsingTheAPI(user);
    await new TodoApi(request).addTodo(user);
    const todoPage = new TodoPage(page);
    await todoPage.load();
    await todoPage.deleteTodoByIndex(0);
    const noTodosMessage = todoPage.getNoTodosMessage();
    await expect(noTodosMessage).toBeVisible();
    
})