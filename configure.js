import { myVariable,myVariableReport,dbx,authx } from './index.js';
import { getFirestore, collection,deleteDoc, onSnapshot,setDoc,updateDoc , addDoc, doc, query,getDoc, getDocs, where, orderBy,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js';

const configList = document.getElementById("leftSide");
const liElement = configList.getElementsByTagName("li");

const reports = document.getElementById("Reports")
const Inspections = document.getElementById("Inspections")
const newBuilding = document.getElementById("newBuilding")
const newUser = document.getElementById("newUser")

for (let i = 0; i < liElement.length; i++) {
    liElement[i].addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the default behavior of anchor elements
        handleLiClicks(this); // Pass the clicked <li> element to the handleLiClick function
    });
}

function handleLiClicks(li) {
    // Get the text content of the clicked <li> element
    const textContent = li.textContent.trim();
    console.log(textContent)
    // Perform action based on the text content
    switch(textContent) {
        case "Reports":
            reports.style.display = 'block'
            Inspections.style.display = 'none'
            newBuilding.style.display = 'none'
            newUser.style.display = 'none'
            // Add your code to handle the "Home" click event
            break;
        case "New Building":
            reports.style.display = 'none'
            Inspections.style.display = 'block'
            newBuilding.style.display = 'none'
            newUser.style.display = 'none'
            // Add your code to handle the "Inspection" click event
            break;
        case "Inspections":
            reports.style.display = 'none'
            Inspections.style.display = 'none'
            newBuilding.style.display = 'block'
            newUser.style.display = 'none'
            // Add your code to handle the "Report" click event
            break;
        case "new User":
            reports.style.display = 'none'
            Inspections.style.display = 'none'
            newBuilding.style.display = 'none'
            newUser.style.display = 'block'
            // Add your code to handle the "Configure" click event
            break;
        default:
            // Default case, if needed
            break;
    }
}
// Function to create a new building list item
function createParentItem(doc) {
    var listItem = document.createElement('li');

        listItem.textContent = doc.id;
        listItem.classList.add('configBuilding');

        var newItem = addChildListItem(doc)
        var widge = addDeleteWidget(listItem);
        widge.setAttribute('data-tooltip', 'delete Building')

        addAddWidget(listItem, doc.id);
        listItem.appendChild(newItem)
        
        listItem.addEventListener('click', function(e) {
            if (e.target === this) { // Check if the clicked element is the listItem itself
                toggleVisibility(this);
            }
        });
    return listItem;
}
// Function to create a new room list item
function createChildItem(key,doc,build) {

    var buildRoom = build+'#'+key                 //separate string with # for easy extraction when getting data
    var listItem = document.createElement('li');
    listItem.textContent = key;
    listItem.classList.add('configRoom');
    console.log(buildRoom)
    var newItem = addGrandChildListItem(doc[key],buildRoom)
    var widge = addDeleteWidget(listItem);
    widge.setAttribute('data-tooltip', 'delete room')
    addAddWidgetGrand(listItem,buildRoom);
    listItem.appendChild(newItem);
   
    return listItem;
}

// Function to create a new question list item
function createGrandChildItem(key,questionObject,buildRoom) {

    var listItem = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = key;

    const radio1 = createRadioButton(buildRoom+key+'comment-only' ,key, 'comment-only',questionObject,buildRoom);
    const radio2 = createRadioButton(buildRoom+key+'comment-with-yes', key, 'comment-with-yes',questionObject, buildRoom);
    
    // Append elements
    listItem.appendChild(p);
    listItem.appendChild(radio1);
    listItem.appendChild(radio2);

    var widge = addDeleteWidget(listItem);
    widge.setAttribute('data-tooltip', 'delete question')

    listItem.classList.add('configQuestion');
    return listItem;
}

    // Function to create radio button
    function createRadioButton(id, name, value,questionObject, buildRoom) {

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = name + buildRoom;  //unique to other rooms but similar in the same room.
        input.value = value;
        input.id = id;

        let words = buildRoom.split('#');
        // let building = words[0];
        // let room = words[1];

        
        if(questionObject[name] === '1' && value === 'comment-with-yes'){
            input.checked = true;
        }
        
        if(questionObject[name] === '2' && value === 'comment-only'){
            input.checked = true;
        }
        

        const label = document.createElement('label');
        label.appendChild(input);

        var span = document.createElement('span');
        span.id = 'span';
        span.style.color = 'black'; // Set text color to black
        span.appendChild(document.createTextNode(value));

        label.appendChild(span);
        label.classList.add(value)

        return label;
    }
// Function to remove the list item
function removeListItem(element) {
    var listItem = element.parentNode;
    listItem.parentNode.removeChild(listItem);
}

// Function to add a new parent list item
function addParentListItem(docs) {
    var mainList = document.getElementById('mainList');
    docs.forEach((doc) => {    
        // Access document data using doc.data()
        var newItem = createParentItem(doc);
        mainList.appendChild(newItem);
    });
}
function updateBuildUl(doc){
    var mainList = document.getElementById('mainList');
    var newItem = createParentItem(doc);
    console.log(doc.id)
    mainList.appendChild(newItem);
}
document.getElementById('add-new-building').onclick = function() {
    // Call your function here
    console.log('clicked')
    document.getElementById("addNewBuildingForm").style.display = "block";
    
}
    // Add event listener to the form for handling submission
    document.getElementById("addNewBuildingForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        
        var inputValue = document.getElementById("addNewBuildingInput").value;
        // Get the value of the text input
        if (inputValue === null || inputValue.trim() === '') {
            // Exit if the user cancels or provides an empty question
            return;
            }
        // Display the input value (You can perform any action here)
        console.log("User input:", inputValue);
        var data = {
            [inputValue]: { 'room1': { 'new where?': '1', 'new is the Ups off?': '1' } },
            data: function() {              // this to match the object from database and synce the code style
                return this[inputValue];   
              },
            get id(){                       // this to match the object from database and synce the code style
                for (var key in this) {
                        return key;
                }
            }
        };

        

        

        updateBuildUl(data)
        // Clear the input field
        document.getElementById("addNewBuildingInput").value = "";

        // Hide the form after submission
        document.getElementById("addNewBuildingForm").style.display = "none";
    });
// Function to add a new child list item
function addChildListItem(doc) {
    
    var sublist = document.createElement('ul');
    var build = doc.id;
    sublist.id = build;
    var data = doc.data()

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            console.log('data:', data);
            console.log('Value:', data[key]);
            var newItem = createChildItem(key,data,build);
            sublist.appendChild(newItem);
        }
      }
    console.log('Key:', sublist);
    return sublist;
}
function updateRoomUl(roomObject,docId){
    var roomUl = document.getElementById(docId)
    for (let key in roomObject) {
        if (roomObject.hasOwnProperty(key)) {
            console.log('data:', roomObject);
            console.log('Value:', roomObject[key]);
            var newItem = createChildItem(key,roomObject,docId);
            roomUl.appendChild(newItem);
        }
      }
}
// Function to add a new child list item
function addGrandChildListItem(questionObject,buildRoom) {
    var sublist2 = document.createElement('ul');
    sublist2.classList.add("horizontal-list")
    sublist2.id = buildRoom;
    //sublist2.id = questionObject
    // Loop through each key in the 'data' object
    console.log(questionObject);
    for (let key in questionObject) {
        if (questionObject.hasOwnProperty(key)) {
        console.log('Question:', key);
        console.log('ans:', questionObject[key]);
        var newItem = createGrandChildItem(key,questionObject,buildRoom);
        sublist2.appendChild(newItem);
        }
    }
    return sublist2
}
// Function to add a new child list item
function updateQuestionUl(questionObject,buildRoom){
    var questionUl = document.getElementById(buildRoom)
    for (let key in questionObject) {
        if (questionObject.hasOwnProperty(key)) {
        console.log('Question:', key);
        console.log('ans:', questionObject[key]);
        var newItem = createGrandChildItem(key,questionObject,buildRoom);
        console.log(newItem)
        questionUl.appendChild(newItem);
        }
    }
}

var deleteIds = [];
// Function to add a delete widget to a list item
function addDeleteWidget(item) {
    var deleteWidget = document.createElement('span');
    deleteWidget.textContent = '⎻';
    deleteWidget.style.margin = '10px'
    deleteWidget.classList.add('widget', 'delete-widget');
    deleteWidget.onclick = function() {
        var parent = deleteWidget.parentElement
        if(parent.classList.value === 'configBuilding'){
            deleteIds.push(parent.childNodes[0].nodeValue.trim())
        }
        console.log(deleteIds)    
        removeListItem(this);
    };
    item.appendChild(deleteWidget);
    return deleteWidget
}
// Function to add an add widget to a parent list item
var docId = null;
function addAddWidget(parentItem, docIdx) {
    var addWidget = document.createElement('span');
    addWidget.textContent = '+';
    addWidget.setAttribute('data-tooltip', 'add new room')
    addWidget.classList.add('widget', 'add-widget');
    addWidget.onclick = function() {
        docId = docIdx;
        document.getElementById("textInputForm").style.display = "block";
        //if(Object.keys( doc).length === 0){
    };
    parentItem.appendChild(addWidget);
}
    // Add event listener to the form for handling submission
    document.getElementById("textInputForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        
        var inputValue = document.getElementById("textInput").value;
        // Get the value of the text input
        if (inputValue === null || inputValue.trim() === '') {
            // Exit if the user cancels or provides an empty question
            return;
            }
        // Display the input value (You can perform any action here)
        console.log("User input:", inputValue);
        var data  =  {
            [inputValue]: {'new where?': '1', 'new is the Ups off?': '1'}
            
        }

        updateRoomUl(data,docId)
        // Clear the input field
        document.getElementById("textInput").value = "";

        // Hide the form after submission
        document.getElementById("textInputForm").style.display = "none";
    });
// Function to add an add widget to a child list item
var buildRoom = null;
function addAddWidgetGrand(childItem,buildRoomx) {
    var addWidget = document.createElement('span');
    addWidget.textContent = '+';
    addWidget.setAttribute('data-tooltip', 'add new Question')
    addWidget.classList.add('widget','grand-add-widget','add-widget');
    addWidget.onclick = function() {
        buildRoom = buildRoomx
        document.getElementById("textInputForm2").style.display = "block";
        //addGrandChildListItem(childItem, 'New Child Item');
    };
    childItem.appendChild(addWidget);
}

document.getElementById("textInputForm2").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    
    var inputValue = document.getElementById("textInput2").value;
    // Get the value of the text input
    if (inputValue === null || inputValue.trim() === '') {
        // Exit if the user cancels or provides an empty question
        return;
        }
    // Display the input value (You can perform any action here)
    console.log("User input:", inputValue);
    var data  =  {
        [inputValue]: '1'
    }

    updateQuestionUl(data,buildRoom)
    // Clear the input field
    document.getElementById("textInput2").value = "";

    // Hide the form after submission
    document.getElementById("textInputForm2").style.display = "none";
});

addParentListItem(myVariable)
function toggleVisibility(ul) {
    var ulElement = ul.querySelector('.configBuilding > ul');
    if (ulElement.style.maxHeight === '0px' || ulElement.style.maxHeight === '') {
        ulElement.style.maxHeight = ulElement.scrollHeight + 'px';
    } else {
        ulElement.style.maxHeight = '0px';
    }
  }
document.getElementById('save').onclick = function() {
   getData();
}


function getData(){
    var parentObject = {};

    // Select all elements with the class name 'configbuilding'
    const configBuildings = document.querySelectorAll('.configBuilding');
    // Iterate through each 'configbuilding' element
    configBuildings.forEach((building, buildingIndex) => {
        const buildingName = building.childNodes[0].nodeValue.trim();
        // Ensure the building object exists
        if (!parentObject[buildingName]) {
            parentObject[buildingName] = {};
        }

        // Select all child elements with the name 'roomconfig'
        const roomConfigs = building.querySelectorAll('.configRoom');
        // Iterate through each 'roomconfig' element
        roomConfigs.forEach((room, roomIndex) => {
            const roomName = room.childNodes[0].nodeValue.trim();

            // Ensure the room object exists
            if (!parentObject[buildingName][roomName]) {
                parentObject[buildingName][roomName] = {};
            }

            // Select all elements with the class name 'questions' within each 'roomconfig'
            const questions = room.querySelectorAll('.configQuestion');
            // Iterate through each 'questions' element
            questions.forEach((question, questionIndex) => {
                // Select all <p> elements within each 'questions' element
                const questionElement = question.querySelector('p');
                const q = questionElement ? questionElement.textContent.trim() : `Question ${questionIndex + 1}`;
                console.log(q)
                // Select all radio buttons within each 'questions' element
                const radioButtons = question.querySelectorAll('input[type="radio"]');
                // Determine which radio button is checked
                radioButtons.forEach((radioButton, radioButtonIndex) => {
                    if (radioButton.checked) {
                        var ans = '1'
                        if(radioButton.value === 'comment-only' ){
                            ans = '2'
                        }else{
                            ans = '1'
                        }
                        parentObject[buildingName][roomName][q] = ans;
                    }
                });
                
            });
            console.log(parentObject[buildingName][roomName])
        });
        console.log(parentObject[buildingName])
        updateDocument('buildings',buildingName,parentObject[buildingName])
    });
console.log(parentObject)
}

async function updateDocument(collectionName, documentId, newData) {
    try {
        // Remove undefined and empty values from newData

        const docRef = doc(dbx, collectionName, documentId);

        // Use setDoc with merge: true to create the document if it doesn't exist, or update it if it does
        await setDoc(docRef, newData, { merge: false });
        deleteMultipleDocuments(collectionName, deleteIds)

        console.log(`Document ${documentId} successfully updated in collection ${collectionName}`);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
async function deleteMultipleDocuments(collectionName, documentIds) {
    try {
        const deletePromises = documentIds.map(async (documentId) => {
            const docRef = doc(dbx, collectionName, documentId);
            await deleteDoc(docRef);
            console.log(`Document ${documentId} successfully deleted from collection ${collectionName}`);
            documentIds = [];
        });
        await Promise.all(deletePromises);
    } catch (error) {
        console.error("Error deleting documents: ", error);
    }
}



//Add new user code
var users = {};
var addUserButton = document.getElementById('addNewUser');
var userDiv = document.getElementById('newUserDiv');

addUserButton.addEventListener("click", function(e) {
    e.preventDefault(); // Prevent the default behavior of anchor elements
    userDiv.classList.toggle("show");

});

document.getElementById('newUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const newName = document.getElementById('fName').value;
    const newLastname = document.getElementById('lName').value;
    const newEmail = document.getElementById('emailAddress').value;


    createUser(newEmail)
    // Clear the form
    document.getElementById('newUserForm').reset();
});


// Initialize Firebase
const auth = authx

async function createUser(email) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email , 'inspection101');
    console.log('Successfully created new user:', userCredential.user.uid);
  } catch (error) {
    console.error('Error creating new user:', error.message);
  }
}
//




addParentListItemReport(myVariableReport);



// Function to add a new parent list item
function addParentListItemReport(userDocRef) {
    var mainListReport = document.getElementById('mainListReport');
    console.log(userDocRef)

    // docs.forEach((doc) => {    
    //     console.log(doc)
    //     // Access document data using doc.data()
    //     var newItem = createParentItemReport(doc);
    //     mainListReport.appendChild(newItem);
    // });

    // Get the document
    getDoc(userDocRef)
    .then((docSnapshot) => {
        if (docSnapshot.exists()) {
            // Document data
            // const userData = {
            // id: docSnapshot.id, // Document ID
            // displayName: docSnapshot.data().displayName,
            var datas =  docSnapshot.data();
            for (const building in datas) {
                console.log(`Rooms in ${building}:`);
                var newItem = createParentItemReport(building, datas);
                mainListReport.appendChild(newItem);                
            }
            
            // email: docSnapshot.data().email
            // };
           
            // Use the userData object as needed in your application
        } else {
            console.log("No such document!");
        }
    })
    .catch((error) => {
    console.error("Error getting document:", error);
    });
}
function updateBuildUlReport(doc){
    var mainListReport = document.getElementById('mainListReport');
    var newItem = createParentItemReport(doc);
    console.log(doc.id)
    mainListReport.appendChild(newItem);
}
function createParentItemReport(building, datas) {

    var listItem = document.createElement('li');

        listItem.textContent = building;
        listItem.classList.add('configBuildingReport');

        var newItem = addChildListItemReport(building, datas)
        var widge = addDeleteWidget(listItem);
        widge.setAttribute('data-tooltip', 'delete Building')

        addAddWidget(listItem, building);
        listItem.appendChild(newItem);
        
        listItem.addEventListener('click', function(e) {
            if (e.target === this) { // Check if the clicked element is the listItem itself
                toggleVisibilityReport(this);
            }
        });
    return listItem;
}
function toggleVisibilityReport(ul) {
    var ulElement = ul.querySelector('.configBuildingReport > ul');
    if (ulElement.style.maxHeight === '0px' || ulElement.style.maxHeight === '') {
        ulElement.style.maxHeight = ulElement.scrollHeight + 'px';
    } else {
        ulElement.style.maxHeight = '0px';
    }
  }

// Function to add a new child list item
function addChildListItemReport(building,datas) {
    
    var sublist = document.createElement('ul');
    var build = datas[building];
    sublist.id = build;

    for (const room of datas[building]) {
        console.log(room);
        var newItem = createChildItemReport(room,building,build);
        sublist.appendChild(newItem);
    }

    return sublist;
}
function updateRoomUlReport(roomObject,docId){
    var roomUl = document.getElementById(docId)
    for (let key in roomObject) {
        if (roomObject.hasOwnProperty(key)) {
            console.log('data:', roomObject);
            console.log('Value:', roomObject[key]);
            var newItem = createChildItem(key,roomObject,docId);
            roomUl.appendChild(newItem);
        }
      }
}
// Function to create a new room list item
function createChildItemReport(room,doc,build) {

    var buildRoom = build+'#'+room                 //separate string with # for easy extraction when getting data
    var listItem = document.createElement('li');
    listItem.textContent = room;
    listItem.classList.add('configRoomReport');
    console.log(buildRoom)
    //var newItem = addGrandChildListItem(doc[key],buildRoom)
    var widge = addDeleteWidget(listItem);
    widge.setAttribute('data-tooltip', 'delete room')
    //addAddWidgetGrand(listItem,buildRoom);
    //listItem.appendChild(newItem);
   
    return listItem;
}

