    const navList = document.getElementById("navList");
    const liElements = navList.getElementsByTagName("li");

    for (let i = 0; i < liElements.length; i++) {
        liElements[i].addEventListener("click", function() {
            handleLiClick(this); // Pass the clicked <li> element to the handleLiClick function
        });
    }

function handleLiClick(liElement) {
    // Get the text content of the clicked <li> element
    const textContent = liElement.textContent.trim();
    
    // Perform action based on the text content
    switch(textContent) {
        case "Home":
            alert("You clicked on Home");
            // Add your code to handle the "Home" click event
            break;
        case "Inspection":
            alert("You clicked on Inspection");
            // Add your code to handle the "Inspection" click event
            break;
        case "Report":
            alert("You clicked on Report");
            // Add your code to handle the "Report" click event
            break;
        case "Configure":
            alert("You clicked on Configure");
            // Add your code to handle the "Configure" click event
            break;
        default:
            // Default case, if needed
            break;
    }
}
