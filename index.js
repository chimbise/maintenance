
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js"
import { getFirestore, collection, onSnapshot,setDoc,updateDoc , addDoc, doc, query,getDoc, getDocs, where, orderBy,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';
import { getDatabase, ref,get, set, update,push,onValue } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import isEqual from '/node_modules/lodash-es/isEqual.js';


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
        var inspector = "John Doe"
    
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
        
        function signIn() {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            // Implement Firebase sign-in logic here
            
            signInWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
            // Signed in
            
            const user = userCredential.user;
            console.log(`Signed in as ${user.email}`);
            closeModal();
            })
            .catch((error) => {
            console.error(error.message);
            });
        }
        
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
    
 
        
        // Function to check user role
        function checkUserRole(userId) {
            // Retrieve user role from Firebase Realtime Database
            
            console.log(userId);
            get(ref(database, `users/${userId}`)).then((snapshot) => {
                const userRole = snapshot.val();
                console.log(userRole);       

                // Check user role and enable/disable features accordingly
                if (userRole["role"] === 'admin') {
                    // Enable admin features
                    enableConfig();
                } 
                inspector = userRole['name']
            }).catch((error) => {
                console.error('Error getting user role:', error);
            });
        }
        
        // Example: Enable admin features
        function enableConfig() {
            
        // Code to enable admin-specific features
        }
        

// const image = document.getElementById("signInImage");
// image.addEventListener('click', function() {
//     // Add your click event actions here
//     //alert("Image clicked!");
//     // You can perform any action you want here, such as opening a modal, navigating to another page, etc.
// });
 
        
//building reference for reading firebase
const buildingsRef = collection(db, 'buildings')
const inspectionsRef = collection(db, 'inspections')
const inspectorsRef = collection(db, 'inspectors')

//sorting retrieved data

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
        if (questionContainer.style.display === "block") {
            questionContainer.style.display = "none";
        } else {
            questionContainer.style.display = "block";
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

function populateQuestions(array){

    if (array.exists()) {
      var data = array.data();
      console.log(data)
        loadData(data);
    } else {
      console.log('Document does not exist');
      //load a load a default template
      defaultTemplate()
    }
}
//load available data function
function loadData(data){
    Object.keys(data).forEach((room) => {
        var rom = room;
        const roomData = data[room];
        console.log(`Room: ${room}`);
        //var id = addNewTabAuto(room);

        Object.keys(roomData).forEach((question) => {
        const ans = roomData[question];

        addNewQuestionAuto(rom, question, ans);
        });
    });
}
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
    var roomTemplate  = {};
    var building = document.querySelector('.titleParagraph').textContent

    roomsdata['buildingName'] = building;
    roomsdata['inspectorName'] = inspector;
    roomsdata['inspectionTime'] = getTime()

    var roomsDiv = document.querySelectorAll('.room-item')
    roomsDiv.forEach((rooms) => {
        var room = rooms.textContent
        var questionAndAnswer = {};
        var questionTemplate = {};
        var questionDivs = document.querySelectorAll('.question')
        questionDivs.forEach((questionDiv) => {
            var question = questionDiv.querySelector('p').textContent
            const radioButtons = questionDiv.querySelectorAll('input[type="radio"]');
            var answer = []
            var answerTemplate = []
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
                        const commentDiv = q.querySelector('.form');
                        var comment = commentDiv.comment.value;
                        if (!comment.trim()) {
                            // If comment is empty or contains only whitespace
                            alert('Please enter a comment');
                            throw new Error('Please enter a comment'); // Exit the function or block of code
                        }
                        answer.push(comment)
                    }
                });
                answerTemplate = "1";
            }else{
                const commentDiv = questionDiv.querySelector('.form');
                var comment = commentDiv.comment.value;
                if (!comment.trim()) {
                    // If comment is empty or contains only whitespace
                    alert('Please enter a comment');
                    throw new Error('Please enter comment');  // Exit the function or block of code
                }
                answer.push(comment)
                answerTemplate = "2";
            }
            questionAndAnswer[question] = answer;
            questionTemplate[question] = answerTemplate;
        })
        roomsdata[room] = questionAndAnswer
        roomTemplate[room] = questionTemplate
    })
    console.log(roomsdata)
    console.log(roomTemplate)
    uploadToDatase(roomsdata, roomTemplate)
}
function uploadToDatase(dataObject,dataObject1){
    if(authValue){ 
        addDoc(inspectionsRef, dataObject)
            .then((doc)=>{
            console.log(doc)
            })
        uploadBuildings(dataObject["buildingName"], dataObject1)
    }else{
        alert("Sign In to submit report")
        openModal()
    }
}

























// function getSelectedChecklistValues(){
//     // Reference to the main collection
//     var roomsdata = {};
//     var roomTemplate  = {};
//     var newTabIndex = document.querySelectorAll('.innerTabs .tab')
    
//     newTabIndex.forEach((li) => {
//         const anchorTag = li.querySelector('a');
//         const linkText = anchorTag.textContent;

//         var roomQuestionsAndAnswers = {}
//         var roomQ = {}
        
        
//         const p = li.querySelectorAll('div .question');
//         var questionAndAnswer = {};
//         var questionA = {};
//         p.forEach((q) => {
//             var question = q.querySelector('p').textContent
        
//             const radioButtons = q.querySelectorAll('input[type="radio"]');
//             var answer = []
//             var ans2 = []
//             if(radioButtons.length !== 0){ //check answer type

//                 var isAnyRadioButtonChecked = Array.from(radioButtons).some((radio) => radio.checked);

//                 if (!isAnyRadioButtonChecked) {
//                     // At least one radio button is checked for this question
//                     alert('Please select an answer');
//                     throw new Error('Please select an answer'); // Exit the function or block of code
//                 }
//                 let selectedValue;

//                 // Iterate through the radio buttons to find the checked one
//                 radioButtons.forEach((radio) => {
//                     if (radio.checked) {
//                         selectedValue = radio.value;
//                         answer.push(selectedValue)
//                     }
//                     if(selectedValue === 'no'){
//                         const commentDiv = q.querySelector('.form');
//                         var comment = commentDiv.comment.value;
//                         if (!comment.trim()) {
//                             // If comment is empty or contains only whitespace
//                             alert('Please enter a comment');
//                             return; // Exit the function or block of code
//                         }
//                         answer.push(comment)
//                     }
//                 });
//                 ans2 = "1";
//             }else{
//                 const commentDiv = q.querySelector('.form');
//                 var comment = commentDiv.comment.value;
//                 if (!comment.trim()) {
//                     // If comment is empty or contains only whitespace
//                     alert('Please enter a comment');
//                     throw new Error('Please enter comment');  // Exit the function or block of code
//                 }
//                 answer.push(comment)
//                 ans2 = "2";
//             }
            
//             questionAndAnswer[question] = answer;
//             questionA[question] = ans2;
            
//             roomQuestionsAndAnswers = questionAndAnswer;
//             roomQ = questionA;
            
//         })
//         roomsdata[linkText] = roomQuestionsAndAnswers;
//         roomTemplate[linkText] = roomQ;           
//     });
//     //const mainCollectionRef = firebase.firestore().collection('Government Building');
    
//     console.log(roomsdata)
//     return [roomsdata, roomTemplate];
//     // Add a document to the subcollection 
// }
const insQuerySnapshot = await getDocs(inspectorsRef);
// Iterate through the documents in the query snapshot
insQuerySnapshot.forEach((doc) => {
    // Access document data using doc.data()

    inspectorNames.push(doc.id);

});

function uploadBuildings(building,ataObject){
    
    if(buildingNames.includes(building)){

        updateBuilding(building, ataObject)

    }else{
        //const documentRef = doc(inspectionsRef, documentId);
        
        setDoc(doc(buildingsRef, building), ataObject)

    }
}
  // Check if the document exists
  // const documentSnapshot = await getDoc(documentRef);
async function updateBuilding(id, ataObject){
    
    const documentRef = doc(buildingsRef, id);
    //new data is equal to ataObject
    // Get the document snapshot
    const documentSnapshot = await getDoc(documentRef);
    
    if (!documentSnapshot.empty) {
        // Retrieve the existing data
        const existingData = documentSnapshot.data();
      
        // Check if the new data is different from the existing data
        const isDataChanged = !isEqual(existingData, ataObject);
        console.log(existingData);
        if (isDataChanged) {
          // Update the document only if the data has changed

          setDoc(documentRef, ataObject);
          console.log('Document updated successfully!');
        } else {
          console.log('Data is the same. No update needed.');
        }
      } else {
        console.log('Document does not exist.');
      }
}


//load available data function
// function loadData(data){
//     Object.keys(data).forEach((room) => {
//         var rom = room;
//         const roomData = data[room];
//         console.log(`Room: ${room}`);
//         var id = addNewTabAuto(room);

//         Object.keys(roomData).forEach((question) => {
//         const ans = roomData[question];

//         addNewQuestionAuto(rom, id, question, ans);
//         });
//     });
// }

function defaultTemplate(){
    //add default questions
    const template = {
        'Living room': {
           'all windows working?': '1'
        },
        'Kitchen': {
            'Is the stove faulty?': '1',
            'what is the pressure cook temperature': '2'
        }
    }
    loadData(template)
}

//adding comments to answers
// document.addEventListener('DOMContentLoaded', function () {

 
// }); 
var tabsElement = document.querySelector('.innerTabs');
//var tabsInstance = M.Tabs.init(tabsElement);

// Add click event listener to the tabs
// tabsElement.addEventListener('click', function (event) {
// // Check if a tab link was clicked
// // Get the href attribute to identify the clicked tab
//     var clickedTabId = event.target.getAttribute('href').substring(1);
// // Remove the clicked tab
// tabsInstance[0].remove(clickedTabId);
// console.log('Clicked tab:', clickedTabId);
// //switchToTab2(clickedTabId)
// });

// function switchToTab(tabId) {
//     var elem = document.querySelector('.tabs');
//     var instance = M.Tabs.getInstance(elem);
//     instance.select(tabId);
// }
function switchToTab2(tabId) {
    var elem = document.querySelector('.innerTabs');
    var instance = M.Tabs.getInstance(elem);
    instance.select(tabId);
}

//store form values

// const addBuildingForm = document.querySelector('#bui')
// const addInspectorForm = document.querySelector('#ins')

// addBuildingForm.addEventListener('submit',(e) => {
//     e.preventDefault()
//     myButton.style.display = 'block';//show submit button
//     var building = addBuildingForm.buildingName.value
//     if(building.trim()){addOptionsBuild(building)}
//     addBuildingForm.reset()
// })
// addInspectorForm.addEventListener('submit',(e) => {
//     e.preventDefault()
//     myButton.style.display = 'block';//show submit button
//     var inspector = addInspectorForm.inspectorName.value
//     if(inspector.trim()){addOptionsInspector(inspector)} 
//     addInspectorForm.reset()
    
// })

// Add a click event listener to the FAB button
// document.getElementById('fabButton').addEventListener('click', function () {
//     // Perform actions when the button is clicked
//     addNewTab()
    
// });

var selectValue = '1';
var number = 0

// function addNewQuestion(newRoom){
//     var userQuestion = prompt('Enter a question:');
//     if (userQuestion === null || userQuestion.trim() === '') {
//         // Exit if the user cancels or provides an empty question
//         return;
//     }

//     var addNewRoomContainer = document.getElementById(newRoom);

//     // Create a new question div
//     var newQuestionDiv = document.createElement('div');
//     newQuestionDiv.classList.add('question');

//     // Create the <p> element with the user's question
//     if(number === 0){
//         number = addNewRoomContainer.getElementsByClassName('question').length + 1;
//     }else{
//         number = number + 1
//     }
//     var questionParagraph = document.createElement('p');
//     questionParagraph.textContent = userQuestion;

//     // Append the <p> element to the new question div
//     newQuestionDiv.appendChild(questionParagraph);
//     var deleteQ = document.createElement('a')
//     deleteQ.classList.add("btn-floating", "btn-small", "waves-effect", "waves-light", "red", "right");
//     var deleteIconQ  = document.createElement("i");  
//     deleteIconQ .classList.add("material-icons");      
//     deleteIconQ .textContent = "delete"; 
//     deleteQ .appendChild(deleteIconQ);
//     deleteQ.style.margin = '10px'
//     newQuestionDiv.appendChild(deleteQ)
//     // Create the comment form
//     var commentForm = document.createElement('form');
//     commentForm.classList.add('form');

//     var commentLabel = document.createElement('label');
//     commentLabel.htmlFor = 'comment';
//     //commentLabel.appendChild(document.createTextNode('Comment:'));

//     var commentInput = document.createElement('input');
//     commentInput.type = 'text';
//     commentInput.id = 'comment';
//     commentInput.placeholder = 'Enter your comment...';

//     // Append elements to the new question container
//     commentForm.appendChild(commentLabel);
//     commentForm.appendChild(commentInput);
    

//     selectValue = prompt('Select type of answer: \n1. yes or no question with comment \n2. comment only');
//     if (selectValue === '1') {
//                     // Create radio buttons for 'Yes' and 'No'
//                     var yesRadioButton = document.createElement('input');
//                     yesRadioButton.type = 'radio';
//                     yesRadioButton.name = newRoom + number;
//                     yesRadioButton.value = 'yes';

//                     var yesLabel = document.createElement('label');
//                     yesLabel.appendChild(yesRadioButton);

//                     var yesSpan = document.createElement('span');
//                     yesSpan.id = 'yesSpan';
//                     yesSpan.appendChild(document.createTextNode('Yes'));

//                     yesLabel.appendChild(yesSpan);

//                     var noRadioButton = document.createElement('input');
//                     noRadioButton.type = 'radio';
//                     noRadioButton.name = newRoom + number;
//                     noRadioButton.value = 'no';

//                     var noLabel = document.createElement('label');
//                     noLabel.appendChild(noRadioButton);
//                     var noSpan = document.createElement('span');
//                     noSpan.id = 'noSpan';
//                     noSpan.appendChild(document.createTextNode('No'));

//                     noLabel.appendChild(noSpan);

//                     newQuestionDiv.appendChild(yesLabel);
//                     newQuestionDiv.appendChild(noLabel);
//                     newQuestionDiv.appendChild(commentForm);

//                     checkRadioButtons(newQuestionDiv)

//     } else if (selectValue === '2') {
//         newQuestionDiv.appendChild(commentForm);
//         commentForm.style.display = "block";
//     } else {
//         alert('Invalid selection. Please choose either 1 or 2.');
//         return;
//     } 

    
//     deleteQ.addEventListener('click', function(){
//         newQuestionDiv.remove();
//          console.log('Clicked tab:', newQuestionDiv);
//      })  
//     // Add the new question div to the 'addNewRoom' container
//     addNewRoomContainer.appendChild(newQuestionDiv);    
// }


    

function addNewTabAuto(room) {
    // Create a new tab
    if(newTabIndex === 0){
        newTabIndex = document.querySelectorAll('.innerTabs .tab').length + 1;
    }else{
        newTabIndex = newTabIndex + 1
    }
    //var newTabIndex = document.querySelectorAll('.innerTabs .tab').length + 1;
    var newTab = document.createElement('li');
    // Clear existing content in the container
    newTab.classList.add('tab');
    newTab.id = room
    
    
    var newTabLink = document.createElement('a');
    newTabLink.href = `#newRoom${newTabIndex}`;
    newTabLink.textContent = room;
    newTabLink.className = 'tab-container'
    newTab.appendChild(newTabLink);
    

    // Append the new tab to the existing tabs
    var innerTabs = document.querySelector('.innerTabs');
    innerTabs.appendChild(newTab);
    //newTab.id = `newRoom${newTabIndex}`;

    // Create content for the new tab
    var newTabContent = document.createElement('div');
    // Clear existing content in the container
    newTabContent.id = `newRoom${newTabIndex}`;
    

    
    
    var questionButton = document.createElement('a');
    questionButton.innerHTML = '<i class=" right"></i>+';
    questionButton.className = 'waves-effect waves-light btn-small';
    questionButton.id = 'questionButton';
    questionButton.href = '#';
    

    var editButton = document.createElement("a");
    editButton.classList.add("btn-floating", "btn-small", "waves-effect", "waves-light", "green", "right");
    var editIcon = document.createElement("i");     
    editIcon.classList.add("material-icons");      
    editIcon.textContent = "edit"; 
    editButton.style.margin = '10px'    
    editButton.appendChild(editIcon);      

    var deleteButton = document.createElement('a')
    deleteButton.classList.add("btn-floating", "btn-small", "waves-effect", "waves-light", "red", "right");
    var deleteIcon  = document.createElement("i");  
    deleteIcon .classList.add("material-icons");      
    deleteIcon .textContent = "delete"; 
    deleteButton.style.margin = '10px'
    deleteButton .appendChild(deleteIcon); 

    newTabContent.appendChild(questionButton);
    newTabContent.appendChild(editButton)
    newTabContent.appendChild(deleteButton)

    //newTabContent.innerHTML = addNewQuestion();
    newTabContent.classList.add('tab-content');
    newTabContent.style.display = 'none';
    
    // Append the new tab content
    newTab.appendChild(newTabContent);

    //Reinitialize the inner tabs instance
    //var elems1 = document.querySelectorAll('.innerTabs');
    //var tabsInstance = M.Tabs.init(elems1);

    var tabsElement = document.querySelector('.innerTabs');
    var tabsInstance = M.Tabs.init(tabsElement);

    let tabLink;
    tabsElement.addEventListener('click', function (event) {
        // Check if a tab link was clicked
        tabLink = event.target.closest('.tab');
        if (!tabLink) {
        return; // Clicked outside a tab, not a tab link
        }
    });
    deleteButton.addEventListener('click', function(){
         tabLink.remove();
         console.log('Clicked tab:', tabLink);
    })   
    

    var ed = `newRoom${newTabIndex}`;
    questionButton.addEventListener('click', function () {
        // Perform actions when the button is clicked
                // Prompt the user for a question
        addNewQuestion(ed);

    });

    
    editButton.addEventListener('click', function () {
        // Prompt the user for a question
        var editRoom = prompt('Enter room name:');
        //var oldTab = innerTabs.querySelector(`.tab#newRoom${newTabIndex}`);
        // ed = editRoom;
        if (editRoom === null || editRoom.trim() === '') {
            // Exit if the user cancels or provides an empty question
            return;
            }

        //delete old tab and create new one
        newTabLink.textContent = editRoom;

        //innerTabs.removeChild(oldTab);
        
    });
    //switchToTab2(`newRoom${newTabIndex}`)
    return newTabContent.id
}
var newTabIndex = 0
function addNewTab() {
    // Create a new tab
    if(newTabIndex === 0){
        newTabIndex = document.querySelectorAll('.innerTabs .tab').length + 1;
    }else{
        newTabIndex = newTabIndex + 1
    }
    //var newTabIndex = document.querySelectorAll('.innerTabs .tab').length + 1;
    var newTab = document.createElement('li');
    // Clear existing content in the container
    newTab.classList.add('tab');
    
    
    var newTabLink = document.createElement('a');
    newTabLink.href = `#newRoom${newTabIndex}`;
    newTabLink.textContent = `Room${newTabIndex}`;
    newTabLink.className = 'tab-container'
    newTab.appendChild(newTabLink);
    

    // Append the new tab to the existing tabs
    var innerTabs = document.querySelector('.innerTabs');
    innerTabs.appendChild(newTab);
    //newTab.id = `newRoom${newTabIndex}`;

    // Create content for the new tab
    var newTabContent = document.createElement('div');
    // Clear existing content in the container
    newTabContent.id = `newRoom${newTabIndex}`;
    
    
    var questionButton = document.createElement('a');
    questionButton.innerHTML = '<i class=" right"></i>+';
    questionButton.className = 'waves-effect waves-light btn-small';
    questionButton.id = 'questionButton';
    questionButton.href = '#';

    var editButton = document.createElement("a");
    editButton.classList.add("btn-floating", "btn-small", "waves-effect", "waves-light", "green", "right");
    var editIcon = document.createElement("i");     
    editIcon.classList.add("material-icons");      
    editIcon.textContent = "edit";
    editButton.style.margin = '2px'     
    editButton.appendChild(editIcon);      

    var deleteButton = document.createElement('a')
    deleteButton.classList.add("btn-floating", "btn-small", "waves-effect", "waves-light", "red", "right");
    var deleteIcon  = document.createElement("i");  
    deleteIcon .classList.add("material-icons");      
    deleteIcon .textContent = "delete"; 
    deleteButton.style.margin = '2px'  
    deleteButton .appendChild(deleteIcon); 

    newTabContent.appendChild(questionButton);
    newTabContent.appendChild(editButton)
    newTabContent.appendChild(deleteButton)

    //newTabContent.innerHTML = addNewQuestion();
    newTabContent.classList.add('tab-content');
    newTabContent.style.display = 'none';
    
    // Append the new tab content
    newTab.appendChild(newTabContent);

    // Reinitialize the inner tabs instance
    var tabsElement = document.querySelector('.innerTabs');
    var tabsInstance = M.Tabs.init(tabsElement);

    let tabLink;
    tabsElement.addEventListener('click', function (event) {
        // Check if a tab link was clicked
        tabLink = event.target.closest('.tab');
    
        if (!tabLink) {
        return; // Clicked outside a tab, not a tab link
        }    
    });
    deleteButton.addEventListener('click', function(){
        tabLink.remove();
        console.log('Clicked tab:', tabLink);
     })   
    
    var ed = `newRoom${newTabIndex}`;
    questionButton.addEventListener('click', function () {
        // Perform actions when the button is clicked
                // Prompt the user for a question
        addNewQuestion(ed);

    });


    editButton.addEventListener('click', function () {
        // Prompt the user for a question
        var editRoom = prompt('Enter room name:');
        //var oldTab = innerTabs.querySelector(`.tab#newRoom${newTabIndex}`);
        // ed = editRoom;
        if (editRoom === null || editRoom.trim() === '') {
            // Exit if the user cancels or provides an empty question
            return;
            }

        //delete old tab and create new one
        newTabLink.textContent = editRoom;

        //innerTabs.removeChild(oldTab);
        
    });
    switchToTab2(`newRoom${newTabIndex}`)
}

// adding buildings 
// function addOptionsBuild(index) {
//     // Get the container div
//     var buildingContainer = document.getElementById('buildingDiv');
//     // get a select element
//     var selectElement = buildingContainer.querySelector('#bb');
//     // Add some options
//     var option1 = document.createElement('option');
//     option1.value = index;
//     option1.text = index;

//     // Append options to the select element
//     if (!(index instanceof Event)) {
//         selectElement.add(option1);
//     }

//     // Append the select element to the container div
//     //container.appendChild(selectElement1);

//     selectElement.addEventListener('change', function() {
//         // Check if the selected option is the trigger option
//         if (this.value === 'addbuilding') {
//             // If yes, display the popup form
//             myButton.style.display = 'none';//hide submit button
//             buildtogglePopup();
//             selectElement.selectedIndex = 1;
//         }
//     });
// }

function addOptionsInspector(index) {
    // Get the container div
    var inspectorContainer = document.getElementById('inspectorDiv');

    // get a select element
    var selectElement = inspectorContainer.querySelector('#ii');
    // Add some options
    var option1 = document.createElement('option');
    option1.value = index
    option1.text = index

    // Append options to the select elementss
    if (!(index instanceof Event)) {
    selectElement.add(option1);
    }

    // Append the select element to the container div
    // Check if selectElement is a valid object before appending
    // Append the select element to the container div
        //inspectorContainer.appendChild(selectElement);

    selectElement.addEventListener('change', function() {
        // Check if the selected option is the trigger option
        if (this.value === 'addInspector') {
            // If yes, display the popup form
            myButton.style.display = 'none';//hide submit button
            inspectortogglePopup();
            selectElement.selectedIndex = 1;
        }
    });
}
//window.addEventListener('load', addOptionsInspector);
//window.addEventListener('load', addOptionsBuild);    
    // Get the select element by its ID
    const buildingName = document.getElementById('bb');
    const inspectorName = document.getElementById('ii');
    //const datepickerInput = document.querySelector('.datepicker');

        
// function checked(selectValue){
//     if(selectValue === '1'){
//         const questions = document.querySelectorAll('.question');
//         for (const question of questions){
//             const radioButtons = question.querySelectorAll('input[type="radio"]');
//             var isAnyRadioButtonChecked = Array.from(radioButtons).some((radio) => radio.checked);

//             if (!isAnyRadioButtonChecked && radioButtons.length !== 0) {
//                 // At least one radio button is checked for this question
//                 return false;
//             }
//         }
//     }else{

//         return true;            
//     }
// }
const mySendButton = document.getElementById('submit2');
//const backButton = document.getElementById('back');
const backButton2 = document.getElementById('back2');
//const exportTo = document.getElementById('exportToExcel');

// backButton.addEventListener('click', function() {
//     window.location.reload();
// })
// backButton2.addEventListener('click', function() {
//     var undeterminedRoomsContainer = document.getElementById("undeterminedRooms");
//     // Remove all child elements
// while (undeterminedRoomsContainer.firstChild) {
//     undeterminedRoomsContainer.removeChild(undeterminedRoomsContainer.firstChild);
// }
//     switchToTab('test2')
// })

// exportTo.addEventListener('click', function() {
//     exportToExcel(a);
// })
function exportToExcel(tables){
   
    //const flattenedData = flattenData(data);
    // const ws = XLSX.utils.json_to_sheet([flattenedData]);
    //         const wb = XLSX.utils.book_new();
    //         XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    //         XLSX.writeFile(wb, "exported_data.xlsx");
    const wb = XLSX.utils.book_new();

    // Iterate through stored tables and add each to the workbook
    tables.forEach(({ title, table }) => {
        const ws = XLSX.utils.table_to_sheet(table);
        XLSX.utils.book_append_sheet(wb, ws, title);
    });

    // Save the workbook to a file
    XLSX.writeFile(wb, 'exported_data.xlsx');

    
}
// function flattenData(data) {
//     const flattenedData = {};

//     function flattenObject(obj, prefix = ' ') {
//         for (const key in obj) {
//             if (typeof obj[key] === 'object') {
//                 flattenObject(obj[key], `${prefix}${key}_`);
//             } else {
//                 flattenedData[`${prefix}${key}`] = obj[key];
//             }
//         }
//     }

//     flattenObject(data);
//     return flattenedData;
// }
let a;


function presentData(data){
    // Function to create HTML table for a given set of nested data
    var undeterminedRoomsContainer = document.getElementById("undeterminedRooms");

    document.getElementById("presentBuildingName").innerHTML = data.buildingName;
    document.getElementById("presentInspectorName").innerHTML = data.inspectorName;
    document.getElementById("inspectionDate").innerHTML = data.inspectionTime;

    // Array to store references to created tables
    const tables = [];
    function createTable(title, nestedData) {
        const table = document.createElement('table');
        const headerRow = table.insertRow(0);
        const questionHeader = headerRow.insertCell(0);
        const answerHeader = headerRow.insertCell(1);

        questionHeader.innerHTML = '<strong>Question</strong>';
        answerHeader.innerHTML = '<strong>Answer</strong>';

        for (const question in nestedData) {
            const row = table.insertRow(-1);
            const questionCell = row.insertCell(0);
            const answerCell = row.insertCell(1);

            questionCell.textContent = question;
            answerCell.textContent = nestedData[question].join(', ');
        }

        undeterminedRoomsContainer.appendChild(document.createElement('br'));
        // Assuming 'title' is the title string
        const titleNode = document.createTextNode(title);
        undeterminedRoomsContainer.appendChild(titleNode);
        undeterminedRoomsContainer.appendChild(table);
        // Store the reference to the created table
        tables.push({ title, table });
        
    }

    // Iterate through the data and create tables
    for (const title in data) {
        if (typeof data[title] === 'object') {
            createTable(title, data[title]);
        }
    }
    return tables
}



// function getSelectedValue() {

// // Get the selected building options
// var selectedOption1 = buildingName.options[buildingName.selectedIndex];
// var selectedOption2 = inspectorName.options[inspectorName.selectedIndex];

// // Get the value of the selected option
// var buildingNameValue = selectedOption1.value;
// var inspectorNameValue = selectedOption2.value;
// var inputValue = datepickerInput.value;

// // Log or use the selected value as needed
// // Your custom logic goes here
// return [buildingNameValue, inspectorNameValue, inputValue]
// }

//signout menu button
const menu = document.getElementById('sign-out-link')
// Add event listener to each menu item
// Add event listener to the "signout" link
menu.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    if(menu.textContent === "Sign In"){
        openModal();
    }else{
        signOutUser(); // Call the signOutUser function to sign out the user
    }
    menu.textContent = "Sign In"
})

checkAuth();
function checkAuth(){
    // Check user authentication state
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            const menu = document.getElementById('sign-out-link')
            menu.textContent = "Sign Out"
            checkUserRole(user.uid);
            authValue = true
            
        } else {
            // User is signed out
            menu.textContent = "Sign In"
            console.log(user)
            openModal();
            // Handle accordingly (e.g., redirect to login)
        }
    });
}


