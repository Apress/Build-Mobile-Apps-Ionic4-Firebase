import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmailPasswordPair, NewAccount } from '../../models/user';
import * as firebase from 'firebase';

export type LoginProvider = 'google' | 'facebook' | 'twitter' | 'github';

export const createProvider = (provider: LoginProvider) => {
  switch (provider) {
    case 'google': return new firebase.auth.GoogleAuthProvider();
    case 'facebook': return new firebase.auth.FacebookAuthProvider();
    case 'twitter': return new firebase.auth.TwitterAuthProvider();
    case 'github': return new firebase.auth.GithubAuthProvider();
  }
};

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  create(user: NewAccount): Promise<firebase.User> {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
      .then(result => result.user.updateProfile({
        displayName: user.name,
        photoURL: null,
      }).then(() => result.user));
  }

  login(user: EmailPasswordPair): Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => result.user);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  logInWithProvider(provider: LoginProvider): Promise<firebase.User> {
    return this.afAuth.auth.signInWithRedirect(createProvider(provider))
      .then(() => firebase.auth().getRedirectResult())
      .then(result => result.user);
  }
}
