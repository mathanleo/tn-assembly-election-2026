document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("token")) {
    const container = document.querySelector(".container");
    const loginContainer = document.querySelector(".login-container");
    container.style.display = "block";
    loginContainer.style.display = "none";
  }

  const form = document.querySelector(".login-container");
  const loginInput = document.getElementById("login-input");
  const pwdInput = document.getElementById("password-input");
  const loginBtn = document.getElementById("login-btn");
  loginInput.focus();

  loginInput.addEventListener("keydown", (event) => {
    const { key } = event;
    if (key === "Enter" && document.activeElement.id === event.target.id) {
      event.preventDefault();
      pwdInput.focus();
    }
  });

  loginBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    validateCredentials(formData.get("username"), formData.get("password"));
  });

  async function validateCredentials(username, password) {
    try {
      console.log("Entered...");
      const response = await fetch(
        `https://p375fe996c.execute-api.ap-south-1.amazonaws.com/Prod/login?userId=${username}&pwd=${password}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const token = await response.text();
        localStorage.setItem("token", token);
        const container = document.querySelector(".container");
        const loginContainer = document.querySelector(".login-container");
        container.style.display = "block";
        loginContainer.style.display = "none";

        const searchInput = document.getElementById("searchInput");
        searchInput.focus();
      } else {
        alert("Login failed...Invalid Credentials.");
      }
    } catch (error) {
      console.log(error);
    }
  }
});
