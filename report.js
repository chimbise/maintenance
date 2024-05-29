
import { getFirestore,limit, collection,deleteDoc, onSnapshot,setDoc,updateDoc , addDoc, doc, query,getDoc, getDocs, where, orderBy,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js"
import {reportBuildingsRefx,reportsRefx} from './index.js';

//sorting retrieved data
const q = query(reportBuildingsRefx, limit(1));
const querySnapshot = await getDocs(q);

// Extract the document data
const doccc = querySnapshot.docs[0];
console.log('Document ID:', doccc.id);
console.log('Document Data:', doccc.data());

var roomsByBuildingx = doccc.data();
// Iterate through the documents in the query snapshot
const roomsByBuilding = {
    ...roomsByBuildingx
};

// Function to add options to a select element
function addOptions(selectElement, options) {
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        selectElement.appendChild(option);
    });
}

// Get the select elements
const buildingSelect = document.getElementById('buildingr');
const roomSelect = document.getElementById('roomr');


// Get an array of all keys (building names)
const buildingKeys = Object.keys(roomsByBuilding);

// Get the value of the first key
const firstKey = buildingKeys[0];
const firstValue = roomsByBuilding[firstKey];
// Add options to the select elements
addOptions(buildingSelect, buildingKeys);
addOptions(roomSelect, firstValue);


buildingSelect.addEventListener('change', function() {
    const building = this.value;

    // Clear existing options
    roomSelect.innerHTML = '<option value="" disabled selected>Select a room</option>';

    if (building) {
        const rooms = roomsByBuilding[building];
        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = room;
            roomSelect.appendChild(option);
        });
    }
});

document.getElementById('defectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const building = document.getElementById('buildingr').value;
    const room = document.getElementById('roomr').value;
    const description = document.getElementById('description').value;
    const reporter = document.getElementById('reporter').value;

    var dataObject = {}
    dataObject['building'] = building;
    dataObject['room'] = room;
    dataObject['reporter'] = reporter;
    dataObject['description'] = description;
    // Display a confirmation message
    // const confirmationMessage = document.getElementById('confirmationMessage');
    // confirmationMessage.innerHTML = `
    //     <p>Thank you, ${reporter}.</p>
    //     <p>Your report for <strong>${room}</strong> in <strong>${building}</strong> has been submitted.</p>
    //     <p>Defect Description: ${description}</p>
    // `;

    uploadToDatase(dataObject);

    // Clear the form
    document.getElementById('defectForm').reset();
});
function uploadToDatase(dataObject){
    if(authValue){ 
        addDoc(reportsRefx, dataObject)
            .then((doc)=>{
            console.log(doc)
            })
        //uploadBuildings(dataObject["buildingName"], dataObject1)
    }else{
        alert("Sign In to submit report")
        openModal();
    }
}