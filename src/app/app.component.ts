import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-users-search-test';
  users: any[] = [];

  onUserAdd(user: any): void {
    if (!this.users.find(({login}) => login === user.login)) {
      this.users.push(user);
    }
  }
}
