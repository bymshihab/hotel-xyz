const apiUrl = "https://jsonserver-deploy.vercel.app";
const localApiUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", function () {
  showForm("login");

  // Handle login form submission
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const loginEmail = document.getElementById("loginEmail").value;
      const loginPassword = document.getElementById("loginPassword").value;

      // Fetch all users from the json-server and check credentials
      fetch(`${apiUrl}/users`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users");
          }
          return response.json();
        })
        .then((users) => {
          // Find the user with the matching email and password
          const user = users.find(
            (user) =>
              user.email === loginEmail && user.password === loginPassword
          );

          if (user) {
            // console.log(user.email, user.password);
            // alert("Login successful!");
            if (user.isActive === false) {
              alert(
                "You are no longer a valid user. Plase contact with +880111111 Number."
              );
            } else {
              if (user.name !== "admin") {
                window.location.href = "reservation.html"; // Redirect to reservation page
                localStorage.setItem("user", JSON.stringify(user));
              } else {
                window.location.href = "/admin_dasboard.html";
                // localStorage.setItem("user", JSON.stringify(user));
              }
            }
          } else {
            // console.log(user.email, user.password);
            alert("Invalid email or password.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        });
    });

  // Handle register form submission
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const registerName = document.getElementById("registerName").value;
      const registerEmail = document.getElementById("registerEmail").value;
      const registerPassword =
        document.getElementById("registerPassword").value;
      const confirmPassword = document.getElementById(
        "registerConfirmPassword"
      ).value;

      if (registerPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const user = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        isActive: true,
      };

      // Send the data to json-server
      fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to register user");
          }
          return response.json();
        })
        .then((data) => {
          alert("Registration successful! You can now log in.");
          // Optionally, switch to the login form or perform other actions
          document.getElementById("registerForm").reset();
          showForm("login");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Registration failed. Please try again.");
        });
    });
});

function showForm(formType) {
  const forms = document.querySelectorAll(".form-content");
  const buttons = document.querySelectorAll(".tab-button");

  forms.forEach((form) => {
    form.classList.remove("active");
  });

  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  document.getElementById(`${formType}-form`).classList.add("active");
  document
    .querySelector(`.tab-button[onclick="showForm('${formType}')"]`)
    .classList.add("active");
}
