import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap'

interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    favoriteColor?: string;
}

@Injectable()
export class AuthService {

    user: Observable<User>;

    authState: any = null;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore) {

// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                } else {
                    return Observable.of(null)
                }
            });
        this.user
            .subscribe(auth => {
                this.authState = auth;
            })
    }
//__________________________EMAIL SIGN-IN___________________________
//__________________________________________________________________
    emailSignUp(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(user => {
                return this.setUserDoc(user) // create initial user document
            })
            .catch(error => this.handleError(error) );
    }
    // Update properties on the user document
    updateUser(user: User, data: any) {
        return this.afs.doc(`users/${user.uid}`).update(data)
    }

    // If error, console log and notify user
    private handleError(error) {
        console.error(error);
//        this.notify.update(error.message, 'error')
    }

    private setUserDoc(user) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email || null,
            photoURL: 'https://goo.gl/Fz9nrQ'
        };
        return userRef.set(data)
    }
//___________________________GOOGLE SIGN-IN_________________________
//__________________________________________________________________
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }
    private oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.updateUserData(credential.user)
            })
    }
    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
        return userRef.set(data)
    }
//_______________________SIGN-OUT___________________________________
//__________________________________________________________________
    signOut() {
        this.afAuth.auth.signOut().then(() => {
//            this.router.navigate(['/']);
        });
    }
//__________________________________________________________________
}