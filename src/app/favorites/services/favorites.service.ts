import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Favorite } from '../../models/favorite';

@Injectable()
export class FavoritesService {

  constructor(private afStore: AngularFirestore) {}

  add(userId: string, itemId: number): Promise<Favorite> {
    const timestamp = new Date().getTime();
    return this.collection(userId)
      .doc(`${itemId}`)
      .set({
        timestamp,
      }).then(() => ({
        itemId,
        timestamp,
      }));
  }

  remove(userId: string, itemId: number): Promise<void> {
    return this.collection(userId)
      .doc(`${itemId}`)
      .delete();
  }

  list(userId: string): Promise<Favorite[]> {
    return this.collection(userId)
      .orderBy('timestamp', 'desc')
      .get().then(snapshot => snapshot.docs.map(doc => ({
        itemId: parseInt(doc.id, 10),
        timestamp: doc.data()['timestamp'],
      })));
  }

  private collection(userId: string) {
    return this.afStore.firestore.collection('favorites')
      .doc(userId)
      .collection('items');
  }
}
