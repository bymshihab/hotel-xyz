let apiUrl = "https://jsonserver-deploy.vercel.app";
let localApiUrl = "http://localhost:3000";

fetch(`${apiUrl}/foods`)
  .then((response) => response.json())
  .then((data) => {
    // Filter only active food items
    const activeFoods = data.filter((food) => food.isActive === true);

    // Get the container element where the food items will be rendered
    const menuContainer = document.getElementById("menu-container");

    // Loop through active foods and dynamically create menu items
    activeFoods.forEach((food) => {
      const foodItem = `
            <div class="col-md-6 my-1 ">
              <div class="border rounded p-4 ">
                <div class="d-flex justify-content-between">
                  <h5 class="fw-bold">${food.name}</h5>
                  <span class="fw-bold text-success">$${food.price}</span>
                </div>
                <p class="text-muted">${food.description}</p>
              </div>
            </div>
          `;

      // Insert the food item HTML into the container
      menuContainer.innerHTML += foodItem;
    });
  })
  .catch((error) => console.error("Error:", error));
