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
    case "new Building":
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