import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        initializeApp(firebaseConfig);
        this.auth = getAuth();
    }

    //* Create user
    async register(name, email, password) {
        const newUser = await createUserWithEmailAndPassword(this.auth, email, password);

        return await updateProfile(newUser.user, {
            displayName: name
        });
    }

    //* Login user
    async login( email, password ) {
        return await signInWithEmailAndPassword(this.auth, email, password);
    } 

    //! Sign out
    async signOut() {
        await this.auth.signOut();
    }
}

const firebase = new Firebase();
export default firebase;