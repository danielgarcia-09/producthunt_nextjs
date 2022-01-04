import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db =  getFirestore();
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

    //* Create product
    async createProduct(product, image) {
        const storage = getStorage();

        const storageRef = ref(storage, `products/${image.name}`);

        await uploadBytes(storageRef, image);

        product.urlImage = await getDownloadURL(storageRef);

        return await addDoc(collection(this.db, "products"), product);
    }

    //* Get products sorted
    async getProducts() {

        const q = query(collection(this.db, 'products'), orderBy('createdAt', 'desc'));

        return await getDocs(q);
        
    }

    //* Get single product
    async getProduct( id ) {

        const productRef = doc(this.db, 'products', id);

        const productSnap = await getDoc(productRef);

        if( productSnap.exists() ) {
            return productSnap.data();
        } else {
            throw new Error('no such product')
        }
    }
}

const firebase = new Firebase();
export default firebase;