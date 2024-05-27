

const roomsByBuilding = {
    "Building A": ["Room 101", "Room 102", "Room 103"],
    "Building B": ["Room 201", "Room 202", "Room 203"],
    "Building C": ["Room 301", "Room 302", "Room 303"],
    // Add more buildings and rooms as needed
};

document.getElementById('buildingr').addEventListener('change', function() {
    const building = this.value;
    const roomDropdown = document.getElementById('roomr');

    // Clear existing options
    roomDropdown.innerHTML = '<option value="" disabled selected>Select a room</option>';

    if (building) {
        const rooms = roomsByBuilding[building];
        rooms.forEach(room => {
            const option = document.createElement('option');
            option.value = room;
            option.textContent = room;
            roomDropdown.appendChild(option);
        });
    }
});
document.getElementById('defectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const building = document.getElementById('buildingr').value;
    const room = document.getElementById('roomr').value;
    const description = document.getElementById('description').value;
    const reporter = document.getElementById('reporter').value;

    // Display a confirmation message
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.innerHTML = `
        <p>Thank you, ${reporter}.</p>
        <p>Your report for <strong>${room}</strong> in <strong>${building}</strong> has been submitted.</p>
        <p>Defect Description: ${description}</p>
    `;

    // Clear the form
    document.getElementById('defectForm').reset();
});