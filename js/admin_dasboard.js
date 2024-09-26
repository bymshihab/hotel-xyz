// Get references to the buttons and the table divs
const userListBtn = document.getElementById("userListBtn");
const foodMenuBtn = document.getElementById("foodMenuBtn");
const userList = document.getElementById("userList");
const foodMenu = document.getElementById("foodMenu");

// Function to set the active tab, apply the active class, and save to localStorage
function setActiveTab(tabName) {
  localStorage.setItem("activeTab", tabName); // Save the active tab in localStorage

  if (tabName === "userList") {
    userList.style.display = "block";
    foodMenu.style.display = "none";
    userListBtn.classList.add("active-tab");
    foodMenuBtn.classList.remove("active-tab");
  } else if (tabName === "foodMenu") {
    userList.style.display = "none";
    foodMenu.style.display = "block";
    foodMenuBtn.classList.add("active-tab");
    userListBtn.classList.remove("active-tab");
  }
}

// Add event listeners to the buttons
userListBtn.addEventListener("click", () => setActiveTab("userList"));
foodMenuBtn.addEventListener("click", () => setActiveTab("foodMenu"));

// for user
document.addEventListener("DOMContentLoaded", function () {
  const activeTab = localStorage.getItem("activeTab") || "userList"; // Default to "userList" if no value is found
  setActiveTab(activeTab);

  const userTableBody = document.getElementById("userTableBody");

  // Fetch data from the API
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      // Loop through users and create table rows
      data.forEach((user, index) => {
        const row = document.createElement("tr");

        // Create cells for each column
        const rowIndexCell = document.createElement("th");
        rowIndexCell.scope = "row";
        rowIndexCell.textContent = index + 1;

        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = user.email;

        const idCell = document.createElement("td");
        idCell.textContent = user.id;

        // Status cell
        const statusCell = document.createElement("td");
        statusCell.textContent = user.isActive ? "Active" : "Inactive";

        // Action cell (toggle button)
        const actionCell = document.createElement("td");
        const toggleButton = document.createElement("button");
        toggleButton.textContent = user.isActive ? "Deactivate" : "Activate";
        toggleButton.classList.add(
          "btn",
          user.isActive ? "btn-danger" : "btn-success"
        );

        // Add event listener for toggling the status
        toggleButton.addEventListener("click", () => {
          user.isActive = !user.isActive; // Toggle the status
          statusCell.textContent = user.isActive ? "Active" : "Inactive";
          toggleButton.textContent = user.isActive ? "Deactivate" : "Activate";
          toggleButton.classList.toggle("btn-danger");
          toggleButton.classList.toggle("btn-success");

          // Send a PATCH/PUT request to update the user status (mock)
          fetch(`http://localhost:3000/users/${user.id}`, {
            method: "PATCH", // Use PATCH to update part of the user object
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isActive: user.isActive }),
          }).catch((error) => console.error("Error updating user:", error));
        });

        // Append button to action cell
        actionCell.appendChild(toggleButton);

        // Append cells to the row
        row.appendChild(rowIndexCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(idCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);

        // Append row to the table body
        userTableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching user data:", error));

  //for food menu
  const foodTableBody = document.getElementById("foodTableBody");
  const foodForm = document.getElementById("foodForm");
  const foodFormHeader = document.getElementById("foodFormHeader");

  let currentFoodId = 1;

  // Fetch and display existing foods from the server on page load
  fetch("http://localhost:3000/foods")
    .then((response) => response.json())
    .then((data) => {
      currentFoodId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      foodList = data;
      renderFoodTable();
    });

  // Function to render the food table
  function renderFoodTable() {
    foodTableBody.innerHTML = "";
    foodList.forEach((food, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${index + 1}</td>
                <td>${food.name}</td>
                <td>${food.description}</td>
                <td>$${food.price}</td>
                <td>
                    <span class="${
                      food.isActive ? "badge bg-success" : "badge bg-danger"
                    }">
                        ${food.isActive ? "Active" : "Inactive"}
                    </span>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="toggleFoodStatus(${
                      food.id
                    })">
                        ${food.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button class="btn btn-info btn-sm" onclick="editFood(${
                      food.id
                    })">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteFood(${
                      food.id
                    })">Delete</button>
                </td>
            `;
      foodTableBody.appendChild(row);
    });
  }

  // Function to toggle food status (Activate/Deactivate)
  window.toggleFoodStatus = function (id) {
    console.log("clicked", id);

    const food = foodList.find((f) => parseInt(f.id) === id);
    if (food) {
      food.isActive = !food.isActive;

      // Send PUT request to update the food status on the server
      fetch(`http://localhost:3000/foods/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(food),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated Food Data:", data); // Log the updated food data
          renderFoodTable(); // Re-render the table after status change
        });
    }
  };

  let editingFoodId = null; // Global variable to track editing state

  // Add or Update Food (common submission handler)
  foodForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const foodName = document.getElementById("foodName").value;
    const foodDescription = document.getElementById("foodDescription").value;
    const foodPrice = document.getElementById("foodPrice").value;

    const newFood = {
      id: editingFoodId === null ? currentFoodId++ : editingFoodId,
      name: foodName,
      description: foodDescription,
      price: foodPrice,
      isActive: true,
    };

    // Determine whether it's an 'Add' or 'Update' operation
    const method = editingFoodId === null ? "POST" : "PUT";
    const url =
      editingFoodId === null
        ? "http://localhost:3000/foods"
        : `http://localhost:3000/foods/${editingFoodId}`;

    // Send POST/PUT request to server
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (editingFoodId === null) {
          // Add new food to local list
          foodList.push(data);
        } else {
          // Update the existing food item in the local list
          const index = foodList.findIndex((f) => f.id === editingFoodId);
          foodList[index] = data;
        }

        renderFoodTable(); // Re-render the table
        foodForm.reset(); // Reset form fields
        foodFormHeader.textContent = "Add Food"; // Reset header text
        editingFoodId = null; // Clear editing state
      })
      .catch((error) => {
        console.error("Error handling food item:", error);
      });
  });

  // Function to edit food item
  window.editFood = function (id) {
    const food = foodList.find((f) => parseInt(f.id) === id);

    if (food) {
      // Pre-fill form with existing food data
      document.getElementById("foodName").value = food.name || "";
      document.getElementById("foodDescription").value = food.description || "";
      document.getElementById("foodPrice").value = food.price || "";

      // Set the global editingFoodId
      editingFoodId = id;

      foodFormHeader.textContent = "Update Food"; // Change header text
    } else {
      console.error(`Food item with id ${id} not found`);
    }
  };

  // Function to delete food
  window.deleteFood = function (id) {
    // Send DELETE request to remove food from the server
    fetch(`http://localhost:3000/foods/${id}`, {
      method: "DELETE",
    }).then(() => {
      foodList = foodList.filter((food) => parseInt(food.id) !== id);
      renderFoodTable(); // Re-render the table after deletion
    });
  };
});
