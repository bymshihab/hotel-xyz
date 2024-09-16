// document.addEventListener('DOMContentLoaded', function () {
//     showForm('login');

//     document.getElementById('loginForm').addEventListener('submit', function (event) {
//         event.preventDefault();
//         // Add login form submission logic here
//         alert('Login form submitted!');
//     });

//     document.getElementById('registerForm').addEventListener('submit', function (event) {
//         event.preventDefault();

//         const password = document.getElementById('registerPassword').value;
//         const confirmPassword = document.getElementById('registerConfirmPassword').value;

//         if (password !== confirmPassword) {
//             alert('Passwords do not match!');
//             return;
//         }

//         // Add registration form submission logic here
//         alert('Registration form submitted!');
//     });
// });

// function showForm(formType) {
//     const forms = document.querySelectorAll('.form-content');
//     const buttons = document.querySelectorAll('.tab-button');

//     forms.forEach(form => {
//         form.classList.remove('active');
//     });

//     buttons.forEach(button => {
//         button.classList.remove('active');
//     });

//     document.getElementById(`${formType}-form`).classList.add('active');
//     document.querySelector(`.tab-button[onclick="showForm('${formType}')"]`).classList.add('active');
// }

document.addEventListener("DOMContentLoaded", function () {
  showForm("login");

  // Handle login form submission
  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const loginEmail = document.getElementById("loginEmail").value;
      const loginPassword = document.getElementById("loginPassword").value;

      // Get user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser) {
        if (
          storedUser.email === loginEmail &&
          storedUser.password === loginPassword
        ) {
          alert("Login successful!");
        } else {
          alert("Invalid email or password.");
        }
      } else {
        alert("No user found. Please register first.");
      }
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

      // Save user data to localStorage
      const user = {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      };

      localStorage.setItem("user", JSON.stringify(user));
      alert("Registration successful! You can now log in.");

      // Clear the form
      document.getElementById("registerForm").reset();
      showForm("login"); // Automatically switch to login form after registration
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
