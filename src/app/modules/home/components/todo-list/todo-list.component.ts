import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  taskList: Array<TaskList> = JSON.parse(localStorage.getItem('todo-list') || '[]');


  ngDoCheck(): void {
    this.setLocalStorage()
    
  }

  setEmitTaskList(event: string) {
    this.taskList.push({
      task: event,
      checked: false
    })

  }

  deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  deleteAllTaskList() {
    const remove: boolean = confirm(`Are you sure you want to delete all tasks?`);

    if (remove) {
      this.taskList = [];
    }
  }

  handleInput(event: string, index: number): void {
    if(!event.length) {
      const confirm = window.confirm('Task está vazia, deseja deletar?');

      if (confirm) {
        this.deleteItemTaskList(index)
      }
    }
  }

  setLocalStorage() {
    if(this.taskList) {
      this.taskList.sort((a, b) => Number(a.checked) - Number(b.checked));
      localStorage.setItem('todo-list', JSON.stringify(this.taskList));
    }
  }
  
}
