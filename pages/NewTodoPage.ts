import { Page } from '@playwright/test';
export default class NewTodoPage {

    private page:Page;
    // Constructer
    constructor(page:Page){
        this.page = page;
    }

    private get newTodoInput(){
        return '[data-testid="new-todo"]'
    }

    private get newTodoSubmit(){
        return '[data-testid="submit-newTask"]'
    }

    async load(){
        await this.page.goto('/todo/new');
    }
    async addNewTask(todo: string){
        await this.page.locator(this.newTodoInput).fill(todo);
        await this.page.click(this.newTodoSubmit);
    }
}