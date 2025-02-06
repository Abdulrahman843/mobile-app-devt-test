// In www/js/auth.js

function signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed up:', user);
            // Optionally redirect or display a success message
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error during sign-up:', errorCode, errorMessage);
        });
}

function signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed in:', user);
            // Redirect to the main blog page or dashboard
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error during sign-in:', errorCode, errorMessage);
        });
}

function signOut() {
    firebase.auth().signOut()
        .then(() => {
            console.log('User signed out');
            // Redirect to the login page
        })
        .catch((error) => {
            console.error('Error during sign-out:', error);
        });
}