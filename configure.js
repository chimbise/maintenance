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
function createParentItem(textContent) {
    var listItem = document.createElement('li');
    listItem.textContent = textContent;
    listItem.classList.add('configBuilding');
    return listItem;
}
// Function to create a new room list item
function createChildItem(textContent) {
    var listItem = document.createElement('li');
    listItem.textContent = textContent;
    listItem.classList.add('configRoom');
    return listItem;
}
// Function to create a new question list item
function createGrandChildItem(textContent) {
    var listItem = document.createElement('li');
    listItem.textContent = textContent;
    listItem.classList.add('configQuestion');
    return listItem;
}
// Function to remove the list item
function removeListItem(element) {
    var listItem = element.parentNode;
    listItem.parentNode.removeChild(listItem);
}
// Function to add a new parent list item
function addParentListItem(textContent) {
    var mainList = document.getElementById('mainList');
    var newItem = createParentItem(textContent);
    mainList.appendChild(newItem);
    addDeleteWidget(newItem);
    addAddWidget(newItem);
    return newItem;
}
// Function to add a new child list item
function addChildListItem(parentItem, textContent) {
    var sublist = document.createElement('ul');
    var newItem = createChildItem(textContent);
    sublist.appendChild(newItem);
    parentItem.appendChild(sublist);
    addDeleteWidget(newItem);
    addAddWidgetGrand(newItem);
    return newItem;
}
// Function to add a new child list item
function addGrandChildListItem(parentItem, textContent) {
    var sublist = document.createElement('ul');
    var newItem = createGrandChildItem(textContent);
    sublist.appendChild(newItem);
    parentItem.appendChild(sublist);
    addDeleteWidget(newItem);
}
// Function to add a delete widget to a list item
function addDeleteWidget(item) {
    var deleteWidget = document.createElement('span');
    deleteWidget.textContent = 'X';
    deleteWidget.classList.add('widget', 'delete-widget');
    deleteWidget.onclick = function() {
        removeListItem(this);
    };
    item.appendChild(deleteWidget);
}
// Function to add an add widget to a parent list item
function addAddWidget(parentItem) {
    var addWidget = document.createElement('span');
    addWidget.textContent = '+';
    addWidget.classList.add('widget', 'add-widget');
    addWidget.onclick = function() {
        addChildListItem(parentItem, 'New Child Item');
    };
    parentItem.appendChild(addWidget);
}
// Function to add an add widget to a child list item
function addAddWidgetGrand(childItem) {
    var addWidget = document.createElement('span');
    addWidget.textContent = '+';
    addWidget.classList.add('widget', 'add-widget');
    addWidget.onclick = function() {
        addGrandChildListItem(childItem, 'New Child Item');
    };
    childItem.appendChild(addWidget);
}

//call addParentListItem()
var docs = []
myVariable.forEach((doc) => {
    // Access document data using doc.data()
    addParentListItem(doc.id)
    docs.push[doc]
  });
  // Add some initial child items
//   var parentItems = document.querySelectorAll('.parent');
//   parentItems.forEach((item) => {
//       addChildListItem(item, 'Child Item 1');
//   });