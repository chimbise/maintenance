import { myVariable } from './index.js';

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
        case "Inspections":
            reports.style.display = 'none'
            Inspections.style.display = 'block'
            newBuilding.style.display = 'none'
            newUser.style.display = 'none'
            // Add your code to handle the "Inspection" click event
            break;
        case "New Building":
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
        // for (let key in doc.data()) {
        //     createChildItem(key,doc,listItem)
        // }
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

    childObject = {}; // reset room whenever a new one is loaded

    var buildRoom = build+'#'+key                 //separate string with # for easy extraction when getting data
    var listItem = document.createElement('li');
    listItem.textContent = key;
    listItem.classList.add('configRoom');
    console.log(buildRoom)
    var newItem = addGrandChildListItem(doc[key],buildRoom)
    var widge = addDeleteWidget(listItem);
    widge.setAttribute('data-tooltip', 'delete room')
    addAddWidgetGrand(listItem, buildRoom);
    listItem.appendChild(newItem);
   
    return listItem;
}
var mainObject = {}
var parentObject = {};
var childObject = {};
var grandChildObject = {};
// Function to create a new question list item
function createGrandChildItem(key,questionObject,buildRoom) {

    grandChildObject = {}

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
        let building = words[0];
        let room = words[1];

        
        if(questionObject[name] === '1' && value === 'comment-with-yes'){
            input.checked = true;

            grandChildObject[name] = '1';
            childObject[room] = {...childObject[room], ...grandChildObject};
            parentObject[building] = {...parentObject[building], ...childObject};
            //parentObject = {...parentObject, ...childObject}
        }
        
        if(questionObject[name] === '2' && value === 'comment-only'){
            input.checked = true;

            grandChildObject[name] =  '2';
            childObject[room] = {...childObject[room], ...grandChildObject};
            parentObject[building] = {...parentObject[building], ...childObject};
            //parentObject = {...parentObject, ...childObject}
        }
        
        mainObject = {...mainObject, ...parentObject}
        
        //childObject = {}
        

        console.log(parentObject);
        console.log(mainObject);
        // Add event listener to capture the change event
        input.addEventListener('change', function() {
            if (input.checked) {
                console.log('Selected value:', input.value);
                console.log(buildRoom)
                
                if(input.value === 'comment-only' ){
                    //building[room][name] = '2'
                }else{
                    //building[room][name] = '1'
                }
                // You can also perform other actions here based on the changed value
            } 
            //console.log(mainObject);
        });

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
        var data  =  {
            [inputValue]:{ 'room1': {'new where?': '1', 'new is the Ups off?': '1'}},
            data: function() {              // this to match the object from database and synce the code style
                return this[inputValue];   
              },
            get id(){                       // this to match the object from database and synce the code style
                for (var key in this) {
                        return key;
                }
            }
        }

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
    // Apply CSS to make listItem scrollable
    //sublist.style.overflow = 'auto';
    //sublist.style.height // Set the maximum height as per your requirement
    return sublist;
}
function updateRoomUl(roomObject,docId){
    var roomUl = document.getElementById(docId)
    for (let key in roomObject) {
        if (roomObject.hasOwnProperty(key)) {
            console.log('data:', roomObject);
            console.log('Value:', roomObject[key]);
            var newItem = createChildItem(key,roomObject);
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
        questionUl.appendChild(newItem);
        }
    }
}
// Function to add a delete widget to a list item
function addDeleteWidget(item) {
    var deleteWidget = document.createElement('span');
    deleteWidget.textContent = '⎻';
    deleteWidget.style.margin = '10px'
    deleteWidget.classList.add('widget', 'delete-widget');
    deleteWidget.onclick = function() {
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
function addAddWidgetGrand(childItem, buildRoomx) {
    var addWidget = document.createElement('span');
    addWidget.textContent = '+';
    addWidget.setAttribute('data-tooltip', 'add new Question')
    addWidget.classList.add('widget','grand-add-widget','add-widget');
    addWidget.onclick = function() {
        
        buildRoom = buildRoomx;
        console.log(buildRoom, buildRoomx)
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


    
}