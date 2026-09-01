import { Page } from "@playwright/test";

export default class TodoPage {

    private page:Page;
        // Constructer
        constructor(page:Page){
            this.page = page;
        }

    private get welcomeMessage() {
        return '[data-testid="welcome"]';
    }

    getWelcomeMessage() {
        return this.page.locator('[data-testid="welcome"]');
    }

    async load(){
        await this.page.goto("/todo");
    }

    private get todoItem() {
        return '[data-testid="todo-item"]';
    }

    private get noTodosMessage(){
        return '[data-testid="no-todos"]';
    }

    async getTodoTextByIndex(index: number){
        return await this.page.locator(this.todoItem).nth(index).innerText();
    }
    private get deleteIcone() {
        return '[data-testid="delete"]';
    }
    async deleteTodoByIndex(index: number) {
        return await this.page.locator(this.deleteIcone).nth(index).click();
    }
    getNoTodosMessage(){
        return this.page.locator(this.noTodosMessage);
    }
}