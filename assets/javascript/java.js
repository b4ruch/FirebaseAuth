
// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyBp0s18TUbVk_y-HM2hSl-fHEfFzDm3-q8",
//     authDomain: "project1-team3-add85.firebaseapp.com",
//     databaseURL: "https://project1-team3-add85.firebaseio.com",
//     projectId: "project1-team3-add85",
//     storageBucket: "project1-team3-add85.appspot.com",
//     messagingSenderId: "325148478422"
// };
// firebase.initializeApp(config);
console.log("hi");
var database = firebase.database();

console.log("你好");

var username = "";
var email = ""
var phoneNum = "";
var password = "";


// OnClick for form
$("#form").submit(function () {
    console.log("人");

    //prevent default
    event.preventDefault();
    console.log($("#username").val());

    if ($("#sn-password").val() == $("#password2").val()) {
        // Get input from user & store in variables
        username = $("#username").val();
        email = $("#email").val();
        phoneNum = $("#phoneNum").val();
        password = $("#sn-password").val();
        console.log(password);
        localStorage.setItem('email', email);
        localStorage.setItem('pass', password);

        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode)
            console.log(errorMessage);

        });
        // Pushes trainInfo to database
        // $(location).attr('href', 'bids.html')
    }
    else {
        alert("Password aren't equal.")
    }

    //  clearForm()

});

$("#login").submit(function () {
    //prevent default
    event.preventDefault();

    // Get input from user & store in variables
    email = $("#ln-email").val();
    password = $("#ln-password").val();
    console.log(email);
    console.log(password);
    // Creates variables to connect to firebase

    // Pushes trainInfo to database
    localStorage.setItem('email', email);
    localStorage.setItem('pass', password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]        
    });
    //  clearForm()

});

// Get the modal login
var modal1 = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
        console.log("click on modal id01");

    }
}
// Get the modal
var modal2 = document.getElementById('id02');
window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
        console.log("click on modal id02");
    }
}

//Global authentication object
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        if (!user.displayName) {
            user.updateProfile({
                displayName: username,
            }).then(function () {
                // Update successful.
                //Redirect to Homepage
                $(location).attr('href', 'index.html');
            }).catch(function (error) {
                // An error happened.
            });
        }
        else {
            $(location).attr('href', 'index.html');
        }
    }
}, function (error) {
    console.log(error);
});


var uiConfig = {
    signInSuccessUrl: 'index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],

    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
    },
    // Terms of service url.
    tosUrl: '#'
};

// FirebaseUI config.
// var uiConfig = {
//     callbacks: {
//         signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//             // User successfully signed in.
//             // Return type determines whether we continue the redirect automatically
//             // or whether we leave that to developer to handle.
//             alert("User successfully logged in");
//             return true;
//         },
//         uiShown: function () {
//             // The widget is rendered.
//             // Hide the loader.
//             document.getElementById('loader').style.display = 'none';
//         }
//     },
//     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//     signInFlow: 'redirect', //popup
//     signInSuccessUrl: 'https://yahoo.com',
//     signInOptions: [
//         // Leave the lines as is for the providers you want to offer your users.
//         firebase.auth.EmailAuthProvider.PROVIDER_ID,
//         {

//             provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//             recaptchaParameters: {
//                 type: 'image', // 'audio'
//                 size: 'invisible', // 'invisible' or 'compact' "normal"
//                 badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
//             },
//             // defaultCountry: 'US', // Set default country to the United Kingdom (+44).
//             // // For prefilling the national number, set defaultNationNumber.
//             // // This will only be observed if only phone Auth provider is used since
//             // // for multiple providers, the NASCAR screen will always render first
//             // // with a 'sign in with phone number' button.
//             // defaultNationalNumber: '1234567890',
//             // // You can also pass the full phone number string instead of the
//             // // 'defaultCountry' and 'defaultNationalNumber'. However, in this case,
//             // // the first country ID that matches the country code will be used to
//             // // populate the country selector. So for countries that share the same
//             // // country code, the selected country may not be the expected one.
//             // // In that case, pass the 'defaultCountry' instead to ensure the exact
//             // // country is selected. The 'defaultCountry' and 'defaultNationaNumber'
//             // // will always have higher priority than 'loginHint' which will be ignored
//             // // in their favor. In this case, the default country will be 'GB' even
//             // // though 'loginHint' specified the country code as '+1'.
//             // loginHint: '+11234567890'
//         }
//     ],
// // Terms of service url.
// tosUrl: '#'
// };

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);