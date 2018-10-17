export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface EmailPasswordPair {
  email: string;
  password: string;
}

export interface NewAccount {
  name: string;
  email: string;
  password: string;
}
