        // const authModal = document.getElementById('authModal');
        // const closeSignin = document.getElementById('closeSignIn');
        // const signin = document.getElementById('submitSignIn');
        // const signup = document.getElementById('submitSignUp');

        // var authValue = false
    
        // closeSignin.addEventListener('click', function() {
        //     closeModal()
        // })
        // signin.addEventListener('click', function() {
        //     signIn()
        // })
        // signup.addEventListener('click', function() {
        //     signUp()
        // })
        
        // function openModal() {
        // authModal.style.display = 'block';
        // }
        
        // function closeModal() {
        //     authModal.style.display = 'none';
        // }
        
        // function signIn() {
        //     const email = document.getElementById('email').value;
        //     const password = document.getElementById('password').value;
        //     // Implement Firebase sign-in logic here
            
        //     signInWithEmailAndPassword(auth,email, password)
        //     .then((userCredential) => {
        //     // Signed in
            
        //     const user = userCredential.user;
        //     console.log(`Signed in as ${user.email}`);
        //     closeModal();
        //     })
        //     .catch((error) => {
        //     console.error(error.message);
        //     });
        // }
        
        // function signUp() {

        //     const newEmail = document.getElementById('newEmail').value;
        //     const newPassword = document.getElementById('newPassword').value;
        //     // Implement Firebase sign-up logic here
        //     createUserWithEmailAndPassword(auth,newEmail, newPassword)
        //     .then((userCredential) => {
        //     // Signed up
        //     const user = userCredential.user;
        //     console.log(`Signed up as ${user.email}`);
        //     closeModal();
        //     })
        //     .catch((error) => {
        //     console.error(error.message);
        //     });
        // }
        // // Sign out the current user
        // function signOutUser() {
        //     signOut(auth)
        //         .then(() => {
        //             // Sign-out successful.
        //             alert('User signed out successfully');
        //             console.log("User signed out successfully");
        //             // Redirect or perform other actions as needed
        //         })
        //         .catch((error) => {
        //             // An error happened.
        //             console.error("Error signing out:", error);
        //         });
        // }
        
        // // Open the modal on page load
    
 
        
        // // Function to check user role
        // function checkUserRole(userId) {
        //     // Retrieve user role from Firebase Realtime Database
            
        //     console.log(userId);
        //     get(ref(database, `users/${userId}/role`)).then((snapshot) => {
        //         const userRole = snapshot.val();
        //         console.log(userRole);       

        //         // Check user role and enable/disable features accordingly
        //         if (userRole === 'admin') {
        //             // Enable admin features
        //             enableConfig();
        //         } 

        //     }).catch((error) => {
        //         console.error('Error getting user role:', error);
        //     });
        // }
        
        // // Example: Enable admin features
        // function enableConfig() {
            
        // // Code to enable admin-specific features
        // }

    const navList = document.getElementById("navList");
    const liElements = navList.getElementsByTagName("li");

    const Home = document.getElementById("home")
    const inspecction = document.getElementById("test1")
    const reporrt = document.getElementById("report-container")
    const Configure = document.getElementById("Configure")

    for (let i = 0; i < liElements.length; i++) {
        liElements[i].addEventListener("click", function(e) {
            e.preventDefault(); // Prevent the default behavior of anchor elements
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
            Home.style.display = 'block'
            inspecction.style.display = 'none'
            reporrt.style.display = 'none'
            Configure.style.display = 'none'
            updateChart()
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

    // Loop through all Chart instances and destroy them
    // Chart.helpers.each(Chart.instances, function(instance) {
    //     instance.destroy();
    // });
    // Get canvas elements
    const completionCanvas = document.getElementById('completionChart');
    const distributionCanvas = document.getElementById('distributionChart');

    // Create completion chart
        
     let completionChart = new Chart(completionCanvas, {
        type: 'doughnut',
        data: completionData,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

 

    // Create distribution chart
    let distributionChart = new Chart(distributionCanvas, {
        type: 'pie',
        data: distributionData,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

function updateChart(){
    completionChart.destroy()
    distributionChart.destroy()


    completionChart = new Chart(completionCanvas, {
        type: 'doughnut',
        data: completionData,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    distributionChart = new Chart(distributionCanvas, {
        type: 'pie',
        data: distributionData,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
    
   
  
 
