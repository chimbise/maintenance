
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js"
import { getFirestore, collection,limit, onSnapshot,setDoc,updateDoc , addDoc, doc, query,getDoc, getDocs, where, orderBy,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getDatabase, ref,get, set, update,push,onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
//import isEqual from '/node_modules/lodash-es/isEqual.js';
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-functions.js';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDU5een_L9w9ArISJLeLFRl5B-i5400IaA",
    authDomain: "maintenance-4f183.firebaseapp.com",
    databaseURL: "https://maintenance-4f183-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "maintenance-4f183",
    storageBucket: "maintenance-4f183.appspot.com",
    messagingSenderId: "778706467871",
    appId: "1:778706467871:web:12a3a7818fffe14c1a692a",
    measurementId: "G-Q0SJDFDPBP"
  }
  

  const firebaseApp = initializeApp(firebaseConfig)

  const db = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp);
  const database = getDatabase(firebaseApp);
  const func = getFunctions(firebaseApp)

    // // Sign up with email and password
    // firebase.auth().createUserWithEmailAndPassword(email, password)
    // .then((userCredential) => {
    //     // User signed up successfully
    //     const user = userCredential.user;
    // })
    // .catch((error) => {
    //     console.error(error.message);
    // });
        const authModal = document.getElementById('authModal');
        const closeSignin = document.getElementById('closeSignIn');
        const signin = document.getElementById('submitSignIn');
        const signup = document.getElementById('submitSignUp');

        var authValue = false
        var inspector = "JohnDoe"
    
        closeSignin.addEventListener('click', function() {
            closeModal()
        })
        signin.addEventListener('click', function() {
            signIn()
        })
        signup.addEventListener('click', function() {
            signUp()
        })
        
        function openModal() {
        authModal.style.display = 'block';
        }
        
        function closeModal() {
            authModal.style.display = 'none';
        }
        const menu = document.getElementById('sign-out-link')

        async function signIn() {
            const email = document.getElementById('Username').value;
            const password = document.getElementById('Password').value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log('Successfully signed in:', userCredential.user.uid);

                closeModal();
                console.log(userCredential)
              } catch (error) {
                console.error('Error signing in:', error.message);

              }

              console.log(email)
        }
        // Check user authentication state
        //signout menu button
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                console.log(`User signed in: ${user.email}`);
                const menu = document.getElementById('sign-out-link')
                menu.textContent = "Sign Out"
                checkUserRole(user.uid);
                authValue = true
                
            } else {
                // User is signed out
                console.log('No user signed in');
                menu.textContent = "Sign In"
                console.log(user)
                openModal();
                // Handle accordingly (e.g., redirect to login)
            }
        });
        
        function signUp() {

            const newEmail = document.getElementById('newEmail').value;
            const newPassword = document.getElementById('newPassword').value;
            // Implement Firebase sign-up logic here
            createUserWithEmailAndPassword(auth,newEmail, newPassword)
            .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(`Signed up as ${user.email}`);
            closeModal();
            })
            .catch((error) => {
            console.error(error.message);
            });
        }
        // Sign out the current user
        function signOutUser() {
            console.log(auth.currentUser)
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    alert('User signed out successfully');
                    console.log("User signed out successfully");
                    // Redirect or perform other actions as needed
                })
                .catch((error) => {
                    // An error happened.
                    console.error("Error signing out:", error);
                });
        }
        
        // Open the modal on page load
    
 
        var admin = false;
        // Function to check user role
        async function checkUserRole(userId) {
            // Retrieve user role from Firebase Realtime Database
            console.log(userId);
            get(ref(database, `users/${userId}`)).then((snapshot) => {
                const userRole = snapshot.val();
                console.log(userRole);       

                // Check user role and enable/disable features accordingly
                if (userRole["role"] === 'admin') {
                    // Enable admin features
                    const element = document.getElementById('configure-link');
                    // Apply the linear gradient background
                    element.style.background = 'linear-gradient(to top, rgb(27, 106, 138), #ffffff)';
                    // Apply the border radius
                    element.style.borderRadius = '5px';
                    element.classList.remove('disabled');
                    element.style.pointerEvents = 'auto';  // Re-enable pointer events
                    element.style.color = 'black';  // Reset text color if it was grayed out
                    
                    admin = true;
                    adminx = admin;
                    console.log(admin)
                    console.log(adminx)
                } 
                inspector = userRole['name']
            }).catch((error) => {
                console.error('Error getting user role:', error);
            });
        }
        
        

// const image = document.getElementById("signInImage");
// image.addEventListener('click', function() {
//     // Add your click event actions here
//     //alert("Image clicked!");
//     // You can perform any action you want here, such as opening a modal, navigating to another page, etc.
// });
 
        
//building reference for reading firebase
const buildingsRef = collection(db, 'buildings')
//const buildingsRefReport = collection(db, 'reportBuildings')
const inspectionsRef = collection(db, 'inspections')
//const inspectorsRef = collection(db, 'inspectors')
const reportBuildingsRef = collection(db,'reportbuildings')
const reportsRef = collection(db, 'reports')



//Tab functions


//const q = query(inspectionsRef);
//const i = query(inspectorsRef);
var buildingNames = [];
var inspectorNames = [];

//record object

var buildingList = document.getElementById("buildingDiv");      //building display
var roomList = document.getElementById("roomDiv");   
var roomTitle = document.getElementById("roomTitleID");           //room display

const querySnapshot = await getDocs(buildingsRef);

const querySnapshotReport = doc(reportBuildingsRef, "rooms");
// Iterate through the documents in the query snapshot
querySnapshot.forEach((doc) => {
    // Access document data using doc.data()
    
    buildingNames.push(doc.id);
    addBuildingToList(doc);
  });

  function addBuildingToList(buildingName) {
    const buildingItem = document.createElement("div");
    buildingItem.textContent = buildingName.id;
    buildingItem.classList.add("building-item");
    buildingItem.addEventListener("click", function() {
        // Handle click event for the building item (e.g., show details, etc.)
        var data  = buildingName.data()
        Object.keys(data).forEach((room) => {
            // Access document data using doc.data()
            
            
            //roomList.textContent = buildingName.id;
            addRoomToList(data,room);
        });
        var building = buildingName.id;
       
        displayRooms();
        roomTitle.textContent = building;


        //add submit button
        const submit = document.createElement("button")
        submit.type = "button"
        submit.classList.add("submitInspection")
        submit.textContent = "submit"
        submit.style.alignSelf = "center"


        
        submit.addEventListener("click", function() {
            // Handle click event for the building item (e.g., show details, etc.)
            showNotification("Inspection has been submitted")
            chosenData();
            backArrowClicked()
        });


        roomList.appendChild(submit)       
    });
    buildingList.appendChild(buildingItem);
}

function addRoomToList(data, roomName){
    console.log(roomName)
    const roomItem = document.createElement("div");
    roomItem.textContent = roomName;
    roomItem.classList.add("room-item");

    const dashSymbol = document.createElement("span");
    dashSymbol.textContent = "-";
    dashSymbol.classList.add("dashsymbol");


    
    // Set display to flex and align items to center
    dashSymbol.style.display = "flex";
    dashSymbol.style.justifyContent = "center"
    dashSymbol.style.alignItems = "center";

    roomItem.addEventListener("click", function() {
        // Handle click event for the building item (e.g., show details, etc.)
       
        if (questionContainer.style.maxHeight === '0px' || questionContainer.style.maxHeight === '') {
            questionContainer.style.maxHeight = questionContainer.scrollHeight + 'px';
        } else {
            questionContainer.style.maxHeight = '0px';
        }  
        console.log(roomName)
    });
    dashSymbol.addEventListener("click", function() {
        // Handle click event for the building item (e.g., show details, etc.)
        roomItem.remove();
        questionContainer.remove()
        dashSymbol.remove();
        console.log("delete")
    });


    const container = document.createElement("div");
    container.classList.add("room-item-container")
    container.style.display = "flex"; // Set display to flex
    // Set flex-grow property for roomItem and dashSymbol
    roomItem.style.flexGrow = "9.5"; // Takes up 90%
    dashSymbol.style.flexGrow = "0.5"; // Takes up 10%

    // Append roomItem and dashSymbol to the container
    container.appendChild(roomItem);
    container.appendChild(dashSymbol);

    const questionContainer = document.createElement("div")
    questionContainer.classList.add("questions");





    roomList.appendChild(container);
    
    addQuestions(questionContainer,roomList, data)
}
// Function to show notification
function showNotification(message) {
    // Create a notification element
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    // Append notification to the body or any other container
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(function() {
        document.body.removeChild(notification);
    }, 3000);
}

function addQuestions(questionContainer,roomList, data){
    //question container       
    Object.keys(data).forEach((room) => {
    const roomData = data[room];
    console.log(room);
        Object.keys(roomData).forEach((question) => {
            console.log(room);
            const ans = roomData[question];
            addNewQuestionAuto(questionContainer,question, ans);
            
        });
    });

    roomList.appendChild(questionContainer)
}
function displayRooms(){
    buildingList.style.display = "none";
    roomList.style.display = "flex";
    roomList.style.flexDirection = "column"
 
}
const backArrow = document.getElementById("backArrow");

// Add click event listener to the back arrow
backArrow.addEventListener("click", function() {
    // Handle click event (for example, navigate back)
    backArrowClicked()
});
function backArrowClicked(){
    buildingList.style.display = "block";
    roomList.style.display = "none";
    while (roomList.childNodes.length > 2) {
        roomList.removeChild(roomList.lastChild);
    }
}


var number = 0;
function addNewQuestionAuto(div,userQuestion,value){

    // Create a new question div
     var newQuestionDiv = document.createElement('div');
     newQuestionDiv.classList.add('question');

    //var innerDivsCount = addNewRoomContainer.getElementsByClassName('question').length;
    if(number === 0){
        number = newQuestionDiv.getElementsByClassName('question').length + 1;
    }else{
        number = number + 1
    }

    // Create the <p> element with the user's question
    
    var questionParagraph = document.createElement('p');
    questionParagraph.textContent = userQuestion;
    questionParagraph.classList.add("par")

    // Append the <p> element to the new question div
    newQuestionDiv.appendChild(questionParagraph);
    
    // Create the comment form
    var commentForm = document.createElement('form');
    commentForm.classList.add('form');

    var commentLabel = document.createElement('label');
    commentLabel.htmlFor = 'comment';
    //commentLabel.appendChild(document.createTextNode('Comment:'));

    var commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.id = 'comment';
    commentInput.placeholder = 'Enter your comment...';

    // Append elements to the new question container
    commentForm.appendChild(commentLabel);
    commentForm.appendChild(commentInput);

    if (value === '1') {

                    // Create radio buttons for 'Yes' and 'No'
                    var yesRadioButton = document.createElement('input');
                    yesRadioButton.type = 'radio';
                    yesRadioButton.name =  number;
                    yesRadioButton.value = 'yes';

                    var yesLabel = document.createElement('label');
                    yesLabel.appendChild(yesRadioButton);

                    var yesSpan = document.createElement('span');
                    yesSpan.id = 'yesSpan';
                    yesSpan.appendChild(document.createTextNode('Yes'));

                    yesLabel.appendChild(yesSpan);
                    yesLabel.classList.add("yesLabel")

                    var noRadioButton = document.createElement('input');
                    noRadioButton.type = 'radio';
                    noRadioButton.name =  number;
                    noRadioButton.value = 'no';

                    var noLabel = document.createElement('label');
                    noLabel.appendChild(noRadioButton);
                    var noSpan = document.createElement('span');
                    noSpan.id = 'noSpan';
                    noSpan.appendChild(document.createTextNode('No'));

                    noLabel.appendChild(noSpan);
                    noLabel.classList.add("noLabel")

                    newQuestionDiv.appendChild(yesLabel);
                    newQuestionDiv.appendChild(noLabel);
                    newQuestionDiv.appendChild(commentForm);

                    checkRadioButtons(newQuestionDiv)

    } else if (value === '2') {
        newQuestionDiv.appendChild(commentForm);
        commentForm.style.visibility = "visible";

    } else {
        alert('Invalid selection. Please choose either 1 or 2.');
        return;
    }   
    // deleteQ.addEventListener('click', function(){
    //     newQuestionDiv.remove();
    //  })   
     div.appendChild(newQuestionDiv)
    
}
function checkRadioButtons(newQuestionDiv){
    
    const commentDiv = newQuestionDiv.querySelector('.form');
    
        const radioButtons = newQuestionDiv.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
            radio.addEventListener('change', function () {
                if (this.value === 'no') {
                    commentDiv.style.visibility = "visible";
                 } else{
                    commentDiv.style.visibility = "hidden";
                 }
            });
        });
    }
function getTime(){
    // Create a new Date object representing the current date and time
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    // Concatenate the date and time into a single string
    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return currentDateTime
}
function chosenData(){
    var roomsdata = {};
    var building = document.querySelector('.titleParagraph').textContent

    roomsdata['buildingName'] = building;
    roomsdata['inspectorName'] = inspector;
    roomsdata['inspectionTime'] = getTime()

    var roomsDiv = document.querySelectorAll('.room-item')
    roomsDiv.forEach((rooms) => {
        var room = rooms.textContent
        var questionAndAnswer = {};
        var questionDivs = document.querySelectorAll('.question')
        questionDivs.forEach((questionDiv) => {
            var question = questionDiv.querySelector('p').textContent
            const radioButtons = questionDiv.querySelectorAll('input[type="radio"]');
            var answer = []
            if(radioButtons.length !== 0){ //check answer type
                var isAnyRadioButtonChecked = Array.from(radioButtons).some((radio) => radio.checked);
                if (!isAnyRadioButtonChecked) {
                    // At least one radio button is checked for this question
                    alert('Please select an answer');
                    throw new Error('Please select an answer'); // Exit the function or block of code
                }
                let selectedValue;
                // Iterate through the radio buttons to find the checked one
                radioButtons.forEach((radio) => {
                    if (radio.checked) {
                        selectedValue = radio.value;
                        answer.push(selectedValue)
                    }
                    if(selectedValue === 'no'){
                        const commentDiv = questionDiv.querySelector('.form');
                        var comment = commentDiv.comment.value;
                        if (!comment.trim()) {
                            // If comment is empty or contains only whitespace
                            alert('Please enter a comment');
                            throw new Error('Please enter a comment'); // Exit the function or block of code
                        }
                        answer.push(comment)
                    }
                });
            }else{
                const commentDiv = questionDiv.querySelector('.form');
                var comment = commentDiv.comment.value;
                if (!comment.trim()) {
                    // If comment is empty or contains only whitespace
                    alert('Please enter a comment');
                    throw new Error('Please enter comment');  // Exit the function or block of code
                }
                answer.push(comment)
            }
            questionAndAnswer[question] = answer;
        })
        roomsdata[room] = questionAndAnswer
    })
    console.log(roomsdata)
    uploadToDatase(roomsdata)
}
function uploadToDatase(dataObject){
    if(authValue){ 
        addDoc(inspectionsRef, dataObject)
            .then((doc)=>{
            console.log(doc)
            })
        //uploadBuildings(dataObject["buildingName"], dataObject1)
    }else{
        alert("Sign In to submit report")
        openModal();
    }
}




// Add event listener to each menu item
// Add event listener to the "signout" link
menu.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    if(menu.textContent === "Sign In"){
        openModal();
    }else{
        signOutUser(); // Call the signOutUser function to sign out the user
        menu.textContent = "Sign In"
    }
    
})

export const myVariableReport = querySnapshotReport;
export const myVariable = querySnapshot;
export const dbx = db;
export var adminx = admin;
export const reportBuildingsRefx = reportBuildingsRef
export const reportsRefx = reportsRef
export var authValuex = authValue
export var authx = auth
export var funcx = func