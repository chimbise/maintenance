

    const navList = document.getElementById("navList");
    const liElements = navList.getElementsByTagName("li");

    const Home = document.getElementById("home")
    const inspecction = document.getElementById("test1")
    const reporrt = document.getElementById("report-container")
    const Configure = document.getElementById("Configure")

    for (let i = 0; i < liElements.length; i++) {
        liElements[i].addEventListener("click", function() {
            event.preventDefault(); // Prevent the default behavior of anchor elements
            handleLiClick(this); // Pass the clicked <li> element to the handleLiClick function
        });
    }

function handleLiClick(liElement) {
    // Get the text content of the clicked <li> element
    const textContent = liElement.textContent.trim();
    console.log(textContent)
    // Perform action based on the text content
    switch(textContent) {
        case "Home":
            Home.style.display = 'bloc'
            inspecction.style.display = 'none'
            reporrt.style.display = 'none'
            Configure.style.display = 'none'
            loadChart()
            // Add your code to handle the "Home" click event
            break;
        case "Inspection":
            Home.style.display = 'none'
            inspecction.style.display = 'block'
            reporrt.style.display = 'none'
            Configure.style.display = 'none'
            // Add your code to handle the "Inspection" click event
            break;
        case "Report":
            Home.style.display = 'none'
            inspecction.style.display = 'none'
            reporrt.style.display = 'block'
            Configure.style.display = 'none'
            // Add your code to handle the "Report" click event
            break;
        case "Configure":
            Home.style.display = 'none'
            inspecction.style.display = 'none'
            reporrt.style.display = 'none'
            Configure.style.display = 'block'
            // Add your code to handle the "Configure" click event
            break;
        default:
            // Default case, if needed
            break;
    }
}
    // Placeholder data for completion chart
    const completionData = {
        labels: ['Completed', 'Incomplete'],
        datasets: [{
            label: 'Tasks Completion',
            data: [75, 25], // Example completion percentages
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)', // Completed tasks color
                'rgba(255, 99, 132, 0.5)'   // Incomplete tasks color
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 3
        }]
    };

    // Placeholder data for distribution chart
    const distributionData = {
        labels: ['Kitchen', 'Bathroom', 'Bedroom', 'Living Room'],
        datasets: [{
            label: 'Tasks Distribution',
            data: [20, 15, 30, 35], // Example task counts for each area
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',   // Kitchen color
                'rgba(54, 162, 235, 0.5)',   // Bathroom color
                'rgba(255, 206, 86, 0.5)',   // Bedroom color
                'rgba(75, 192, 192, 0.5)'    // Living Room color
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 3
        }]
    };

function loadChart(){
    // Get canvas elements
    const completionCanvas = document.getElementById('completionChart');
    const distributionCanvas = document.getElementById('distributionChart');
    
    
     // Create completion chart
     new Chart(completionCanvas, {
        type: 'doughnut',
        data: completionData,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

 

    // Create distribution chart
    new Chart(distributionCanvas, {
        type: 'pie',
        data: distributionData,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

}
    
   
  
 
