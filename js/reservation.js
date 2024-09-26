document.addEventListener("DOMContentLoaded", function () {
  let totalRooms = 10; // Initial total rooms
  const totalRoomsElement = document.getElementById("totalRooms");
  const reservationForm = document.getElementById("reservationForm");
  const reservationStatus = document.getElementById("reservationStatus");
  const roomSelect = document.getElementById("room");
  const imageGallery = document.querySelector(".image-gallery"); // Select image gallery container
  const headingImg = document.querySelector(".heading-img"); // Select heading image container

  // seting userName of welcome section.
  const user = JSON.parse(localStorage.getItem("user"));
  const userNameElement = document.querySelector(".userName");
  userNameElement.textContent = user.name;

  let roomsData = []; // To store fetched rooms data

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

      reservationStatus.textContent = `Reservation successful for ${adults} adults and ${children} children from ${fromDate} to ${toDate}.`;
      reservationStatus.classList.remove("error");
      reservationStatus.classList.add("success");

      // Reset form after submission
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000); // 3000 milliseconds = 3 seconds
      localStorage.removeItem("user");
      reservationForm.reset();
    } else {
      // Show failure message when no rooms are available
      reservationStatus.textContent = "No rooms available!";
      reservationStatus.classList.remove("success");
      reservationStatus.classList.add("error");
    }
  });

  // Function to fetch room data
  async function fetchRooms() {
    try {
      // Fetching data from the API
      const response = await fetch("http://localhost:3000/rooms");

      // Checking if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Parsing the JSON data
      roomsData = await response.json();

      // Display initial room images for the first room
      displayRoomImages(roomsData[0]);

      // Update room images based on the selected room
      roomSelect.addEventListener("change", function () {
        const selectedRoomId = roomSelect.value;
        const selectedRoom = roomsData.find(
          (room) => room.id === selectedRoomId
        );
        displayRoomImages(selectedRoom);
      });
    } catch (error) {
      // Handling errors if any
      console.error("Failed to fetch rooms:", error);
    }
  }

  // Function to display room images
  function displayRoomImages(room) {
    imageGallery.innerHTML = ""; // Clear existing images

    room.images.forEach((imageData) => {
      const imageBox = document.createElement("div");
      imageBox.classList.add("image-box");

      const imgElement = document.createElement("img");
      imgElement.src = imageData.imageUrl;
      imgElement.alt = `${room.roomType} Image`;

      imageBox.appendChild(imgElement);
      imageGallery.appendChild(imageBox);

      // Add click event to each image to display in heading-img
      imgElement.addEventListener("click", function () {
        displayInHeadingImage(imageData.imageUrl);
      });
    });

    // Set the first image as the initial heading image
    if (room.images.length > 0) {
      displayInHeadingImage(room.images[0].imageUrl);
    }
  }

  // Function to display an image in the .heading-img div
  function displayInHeadingImage(imageUrl) {
    headingImg.innerHTML = ""; // Clear existing content
    const imgElement = document.createElement("img");
    imgElement.src = imageUrl;
    imgElement.alt = "Selected Room Image";
    imgElement.style.width = "75%"; // Style it as needed
    imgElement.style.height = "20rem"; // Keep the aspect ratio
    headingImg.appendChild(imgElement);
  }

  // Fetch rooms when the page loads
  fetchRooms();
});
