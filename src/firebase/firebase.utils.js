import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCMp6dVnwaQk_i65jwCf5feCubWe7s9dKE',
	authDomain: 'crown-cothing-db1.firebaseapp.com',
	projectId: 'crown-cothing-db1',
	storageBucket: 'crown-cothing-db1.appspot.com',
	messagingSenderId: '70269565620',
	appId: '1:70269565620:web:094da68b36f53020f7b5e1',
	measurementId: 'G-HGGPL7BDH8',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	//checking if data exists. If not, create the data
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
