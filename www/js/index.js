// Import the Firebase configuration and functions
import './firebaseConfig.js';  // Firebase config and initialization
import { signUp, signIn, signOut } from './auth.js';  // Authentication functions
import { createPost, fetchPosts } from './posts.js';  // Post-related functions

// Show spinner during post creation
function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Validate email
function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

// Validate password (at least 6 characters)
function isValidPassword(password) {
    return password.length >= 6;
}

// Handle user sign up
document.getElementById('signup-button').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Email and password validation
    if (!isValidEmail(email)) {
        alert("Invalid email format!");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    // Proceed with sign-up logic
    signUp(email, password).then(() => {
        // Clear the input fields after sign-up
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }).catch((error) => {
        alert("Error signing up: " + error.message);
    });
});

// Handle user sign in
document.getElementById('signin-button').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Sign in logic
    signIn(email, password).then(() => {
        // Clear the input fields after sign-in
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }).catch((error) => {
        alert("Error signing in: " + error.message);
    });
});

// Handle sign-out functionality
document.getElementById('signout-button').addEventListener('click', () => {
    signOut();
});

// Handle post creation with loading spinner and Firebase logic
document.getElementById('create-post-button').addEventListener('click', () => {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    // Show loading spinner while post is being created
    showLoading();

    // Validate the post fields
    if (!title || !content) {
        alert("Title and content cannot be empty!");
        hideLoading();
        return;
    }

    // Proceed with creating the post in Firebase
    createPost(title, content)
        .then(() => {
            // Hide the loading spinner and show success message
            hideLoading();
            alert("Post created successfully!");

            // Clear the input fields after post creation
            document.getElementById('post-title').value = '';
            document.getElementById('post-content').value = '';
        })
        .catch((error) => {
            // Hide the loading spinner and show error message
            hideLoading();
            alert("Error creating post: " + error.message);
        });
});

// Fetch posts from Firebase
function fetchFirebasePosts() {
    fetchPosts(); // Fetch from Firebase
}

// Fetch blog posts from JSON.bin
function fetchJSONBinPosts() {
    fetch('https://api.jsonbin.io/v3/b/679ececee41b4d34e482920f', {
        headers: {
            'X-Master-Key': '$2a$10$XMI7FDGMCykYL6mzarK45OR.7U2brW2ANIP4xL1w5AIjsXMQLoX8C'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Fetched data from JSON.bin:', data);
        // You can now display or process the data
    })
    .catch(error => console.error('Error fetching data from JSON.bin: ', error));
}

// Run the fetch logic when Cordova is ready
document.addEventListener('deviceready', function () {
    console.log("Device is ready!");

    // Fetch posts from JSON.bin
    fetchJSONBinPosts();

    // Optionally, fetch posts from Firebase as well
    fetchFirebasePosts();
});