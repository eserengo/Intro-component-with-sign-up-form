window.addEventListener("DOMContentLoaded", () => {
  (function labelVisibility() {
    document.querySelectorAll(".input").forEach(input => {
      input.addEventListener("focus", () => {
        input.nextElementSibling.classList.add("hidden");
      })
      input.addEventListener("blur", () => {
        if (input.value === "") input.nextElementSibling.classList.remove("hidden");
        if (input.parentElement.querySelector(".error, .success") !== null) input.nextElementSibling.classList.add("hidden");
      })
    })
  })()
  
  function validateInput(regEx, length) {
    this.parentElement.querySelectorAll(".error, .success").forEach(item => { item.remove() });
    if (this.value === "") {
      this.parentElement.insertAdjacentHTML("beforeend", `<div class="message error">${this.name} cannot be empty</div>`);
      this.parentElement.insertAdjacentHTML("beforeend", `<i class="fa fa-exclamation-circle error"></i>`);
      this.classList.contains("valid") ? (this.classList.remove("valid"), this.classList.add("invalid")) : this.classList.add("invalid");
    } else if (this.value.length < length) {
      this.parentElement.insertAdjacentHTML("beforeend", `<div class="message error">${this.name} must contain at least ${length} characters</div>`);
      this.parentElement.insertAdjacentHTML("beforeend", `<i class="fa fa-exclamation-circle error"></i>`);
      this.classList.contains("valid") ? (this.classList.remove("valid"), this.classList.add("invalid")) : this.classList.add("invalid");
    } else if (!this.value.match(regEx)) {
      this.parentElement.insertAdjacentHTML("beforeend", `<div class="message error">you must enter a valid ${this.name}</div>`);
      this.parentElement.insertAdjacentHTML("beforeend", `<i class="fa fa-exclamation-circle error"></i>`);
      this.classList.contains("valid") ? (this.classList.remove("valid"), this.classList.add("invalid")) : this.classList.add("invalid");
    } else {
      this.parentElement.insertAdjacentHTML("beforeend", `<i class="fa fa-check-circle success"></i>`);
      this.classList.contains("invalid") ? (this.classList.remove("invalid"), this.classList.add("valid")) : this.classList.add("valid");
    }
  }

  const nameRegEx = /^([a-zA-Z\-\'\s])+([a-zA-Z\-\'\s]+)+$/;
  const emailRegEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const passwordRegEx = /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  const fName = document.getElementById("fname");
  const lName = document.getElementById("lname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  fName.addEventListener("change", validateInput.bind(fName, nameRegEx, 4));
  lName.addEventListener("change", validateInput.bind(lName, nameRegEx, 4));
  email.addEventListener("change", validateInput.bind(email, emailRegEx, 0));
  password.addEventListener("change", validateInput.bind(password, passwordRegEx, 8));
  document.getElementById("submitBtn").addEventListener("click", event => {
    document.querySelectorAll(".input").forEach(input => {
      if(input.parentElement.querySelector(".error") !== null) event.preventDefault();
    })
  })
  document.getElementById("eye").addEventListener("click", () => {
    document.getElementById("password").type === "password" ? document.getElementById("password").type = "text" : document.getElementById("password").type = "password";
    document.getElementById("eye").classList.toggle("fa-eye-slash");
  })
})