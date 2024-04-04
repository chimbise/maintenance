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
        listItem.appendChild(newItem)

    return listItem;
}
function createTitleDiv(textContent){
    
}

// Function to create a new room list item
function createChildItem(key,doc) {
    var listItem = document.createElement('li');
    listItem.textContent = key;
    listItem.classList.add('configRoom');
    var newItem = addGrandChildListItem(doc[key])
    listItem.appendChild(newItem);
    return listItem;
}
// Function to create a new question list item
function createGrandChildItem(key,questionObject) {
    var listItem = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = key;

    const radio1 = createRadioButton(key, key, 'comment-only', 'Comment Only');
    const radio2 = createRadioButton(key, key, 'comment-with-yes', 'Comment with Yes or No');

    // Append elements
    listItem.appendChild(p);
    listItem.appendChild(radio1);
    listItem.appendChild(radio2);

    addDeleteWidget(listItem);

    listItem.classList.add('configQuestion');
    return listItem;
}
    // Function to create radio button
    function createRadioButton(id, name, value, labelText) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = id;
        input.name = name;
        input.value = value;

        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = labelText;

        const container = document.createElement('div');
        container.style.display = 'flex'; // Make the container a flexbox
        container.style.flexDirection = 'column'; // Align items vertically
        container.style.alignItems = 'center'; // Align items in the center
        container.appendChild(input);
        container.appendChild(label);

        return container;
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
        addDeleteWidget(newItem);
        addAddWidget(newItem);
      });

    //return newItem;
}

// Function to add a new child list item
function addChildListItem(doc) {
    var sublist = document.createElement('ul');
    var data = doc.data()
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            console.log('Key:', key);
            console.log('Value:', data[key]);
            var newItem = createChildItem(key,data);
            sublist.appendChild(newItem);
            addDeleteWidget(newItem);
            addAddWidgetGrand(newItem);
        }
      }
    return sublist;
}

// Function to add a new child list item
function addGrandChildListItem(questionObject) {
    var sublist2 = document.createElement('ul');
    sublist2.classList.add("horizontal-list")
    sublist2.id = questionObject
    // Loop through each key in the 'data' object
    console.log(questionObject);
    for (let key in questionObject) {
        if (questionObject.hasOwnProperty(key)) {
        console.log('Question:', key);
        console.log('ans:', questionObject[key]);
        var newItem = createGrandChildItem(key,questionObject);
        sublist2.appendChild(newItem);
        }
    }
    return sublist2
}
    // Function to add a new child list item
    function addGrandChildWidget(questionObject) {
        var sublist2 = document.getElementById(questionObject)
        
        // Loop through each key in the 'data' object
        console.log(questionObject);
        for (let key in questionObject) {
            if (questionObject.hasOwnProperty(key)) {
            console.log('Question:', key);
            console.log('ans:', questionObject[key]);
            var newItem = createGrandChildItem(key,questionObject);
            sublist2.appendChild(newItem);
            }
        }
        return sublist2
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
    addWidget.classList.add('grand-add-widget');
    addWidget.onclick = function() {
        addGrandChildListItem(childItem, 'New Child Item');
    };
    childItem.appendChild(addWidget);
}

// Add click event listener to parent items
document.querySelectorAll('.configBuilding').forEach(function(item) {
    item.addEventListener('click', function() {
        var sublist = item.querySelectorAll('ul');
        console.log(item)
        sublist.forEach(function(sub) {
            sublist.style.display = sublist.style.display === 'none' ? 'block' : 'none';
        })
    });
});

//call addParentListItem()
addParentListItem(myVariable)

  // Add some initial child items
//   var parentItems = document.querySelectorAll('.parent');
//   parentItems.forEach((item) => {
//       addChildListItem(item, 'Child Item 1');
//   });
