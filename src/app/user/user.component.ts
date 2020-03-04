import { Component, OnInit} from '@angular/core';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, pluck, tap, finalize, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm = new FormGroup({
    userName: new FormControl('')
  });
  formValue = '';
  loading = false;
  user$: Observable<any>;
  noUser: boolean;
  history = [];

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.noUser = false;
    this.user$ = this.getData();
  }

  getData(): Observable<any> {
    return this.userForm.valueChanges.pipe(
      debounceTime(1000),
      pluck('userName'),
      distinctUntilChanged(),
      filter(v => v.trim()),
      tap(() => {
        this.loading = true;
      }),
      switchMap((userName: string) =>
        this.data.getGitUser(userName).pipe(
          tap(user => {
            if (user) {
              this.noUser = false;
              this.history.push(user);
             } else { this.noUser = true; }
          }),
          finalize(() => {
            this.loading = false;
            console.log(this.history);
          })
        )
      )
    );
  }
}
