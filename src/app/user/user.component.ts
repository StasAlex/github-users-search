import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, pluck, tap, finalize, filter, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Output() user: EventEmitter<any> = new EventEmitter<any>();
  userForm = new FormGroup({
    userName: new FormControl('')
  });
  formValue = '';
  loading = false;
  user$: Observable<any>;
  noUser: boolean;

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
          catchError(() => of(null)),
          tap(user => {
            if (user) {
              this.noUser = false;
              this.user.emit(user);
            } else {
              this.noUser = true;
            }
          }),
          finalize(() => {
            this.loading = false;
          })
        )
      )
    );
  }
}
