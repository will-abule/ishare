import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, tap, switchMap, } from 'rxjs/operators';
import * as firebase from 'firebase';
type CollectionPredicate<T>   = string |  AngularFirestoreCollection<T>;
type DocPredicate<T>          = string |  AngularFirestoreDocument<T>;


@Injectable({providedIn: 'root'})

export class FirestoreService {
  constructor(public afs: AngularFirestore) {
    // this.afs.firestore.settings({timestampsInSnapshots: true}) 
   }

  /// **************
  /// Get a Reference
  /// **************
  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref
  }


  /// **************
  /// Get Data
  /// **************
  doc$<T>(ref:  DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges()
    .pipe(
      map(doc => {
        return doc.payload.data() as T
      })
    )
  }


  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges()
    .pipe(
      map(docs => {
        return docs.map(a => a.payload.doc.data()) as T[]
      })
    )
  }

  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  /// **************
  /// Write Data
  /// **************
  /// Firebase Server Timestamp

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp()
  }

  set<T>(ref: DocPredicate<T>, data: any) {
    const timestamp = this.timestamp
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    })
  }

  update<T>(ref: DocPredicate<T>, data: any) {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp
    })
  }

  delete<T>(ref: DocPredicate<T>) {
    return this.doc(ref).delete()
  }

  add<T>(ref: CollectionPredicate<T>, data) {
    const timestamp = this.timestamp
    return this.col(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    })
  }

  geopoint(lat, lng) {
    return new firebase.firestore.GeoPoint(lat, lng)
  }

  /// If doc exists update, otherwise set
  upsert<T>(ref: DocPredicate<T>, data: any) {
    const doc = this.doc(ref).snapshotChanges()
    .pipe(
    take(1)
    )
    .toPromise()
    return doc.then(snap => {
      return snap.payload.exists ? this.update(ref, data) : this.set(ref, data)
    })

  }

  /// **************
  /// Inspect Data
  /// **************
  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime()
    this.doc(ref).snapshotChanges()
    .pipe(
      take(1),
      tap(d => {
        const tock = new Date().getTime() - tick
        console.log(`Loaded Document in ${tock}ms`, d)
      })
    ).subscribe()

  }

  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime()
    this.col(ref).snapshotChanges()
    .pipe(
      take(1),
      tap(c => {
        const tock = new Date().getTime() - tick
        console.log(`Loaded Collection in ${tock}ms`, c)
      })
    )
    .subscribe()
  }

  /// **************
  /// Create and read doc references
  /// **************
  /// create a reference between two documents
  connect(host: DocPredicate<any>, key: string, doc: DocPredicate<any>) {
    return this.doc(host).update({ [key]: this.doc(doc).ref })
  }

  /// returns a documents references mapped to AngularFirestoreDocument
  docWithRefs$<T>(ref: DocPredicate<T>) {
    return this.doc$(ref)
    .pipe(
      map(doc => {
        for (const k of Object.keys(doc)) {
          if (doc[k] instanceof firebase.firestore.DocumentReference) {
            doc[k] = this.doc(doc[k].path)
          }
        }
        return doc
      })
    )
  }

  /// **************
  /// Atomic batch example
  /// **************
  /// Just an example, you will need to customize this method.

  atomic() {
    const batch = firebase.firestore().batch()
    /// add your operations here
    const itemDoc = firebase.firestore().doc('items/myCoolItem');
    const userDoc = firebase.firestore().doc('users/userId');
    const currentTime = this.timestamp
    batch.update(itemDoc, { timestamp: currentTime });
    batch.update(userDoc, { timestamp: currentTime });
    /// commit operations
    return batch.commit()
  }
}

