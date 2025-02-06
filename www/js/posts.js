// In www/js/posts.js

function createPost(title, content) {
    const user = firebase.auth().currentUser;
    if (user) {
        firebase.firestore().collection("posts").add({
            title: title,
            content: content,
            userId: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((docRef) => {
            console.log("Post created with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding post: ", error);
        });
    } else {
        console.log('User is not authenticated');
    }
}

function fetchPosts() {
    firebase.firestore().collection("posts")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                console.log("Post data: ", post);
                // Optionally display posts on the UI
            });
        })
        .catch((error) => {
            console.error("Error fetching posts: ", error);
        });
}
