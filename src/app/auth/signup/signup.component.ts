import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as fromAuth from '../reducers';
import { NewAccount } from '../../models/user';
import { Signup } from '../actions/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string;
  email: string;
  password: string;
  loading$: Observable<Boolean>;
  error$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.loading$ = this.store.pipe(select(fromAuth.getSignupPageLoading));
    this.error$ = this.store.pipe(select(fromAuth.getSignupPageError));
  }

  signUp(value: NewAccount) {
    this.store.dispatch(new Signup(value));
  }
}
