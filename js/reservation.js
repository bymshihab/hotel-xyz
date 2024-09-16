document.addEventListener("DOMContentLoaded", function () {
  let totalRooms = 10; // Initial total rooms
  const totalRoomsElement = document.getElementById("totalRooms");
  const reservationForm = document.getElementById("reservationForm");
  const reservationStatus = document.getElementById("reservationStatus");

  // Display initial total rooms
  totalRoomsElement.textContent = totalRooms;

  // Handle form submission
  reservationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const adults = document.getElementById("adults").value;
    const children = document.getElementById("children").value;

    // Basic validation: Ensure there are available rooms
    if (totalRooms > 0) {
      totalRooms--;
      totalRoomsElement.textContent = totalRooms; // Update total rooms display

      // Show reservation success message
      reservationStatus.textContent = `
      Reservation successful for ${adults} adults and ${children} children from ${fromDate} to ${toDate}.`;
      // reservationStatus.style.color = "#28a745"; // Green color for success message

      // Reset form after submission
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000); // 3000 milliseconds = 3 seconds

      reservationForm.reset();
    } else {
      // Show failure message when no rooms are available
      reservationStatus.textContent = "No rooms available!";
      reservationStatus.style.color = "#dc3545"; // Red color for error message
    }
  });
});
