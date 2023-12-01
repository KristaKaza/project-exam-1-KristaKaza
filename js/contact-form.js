document.getElementById("submitButton").addEventListener("click", function () {
  // Retrieve input values
  const name = document.getElementById("name").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validation criteria
  const nameValid = name.length > 5;
  const subjectValid = subject.length > 15;
  const emailValid = validateEmail(email);
  const messageValid = message.length > 25;

  // Display error messages if validation fails
  document.getElementById("nameError").textContent = nameValid
    ? ""
    : "Name should be more than 5 characters";
  document.getElementById("subjectError").textContent = subjectValid
    ? ""
    : "The subject should be more than 15 characters";
  document.getElementById("emailError").textContent = emailValid
    ? ""
    : "Please enter a valid email address (e.g. hello@gmail.com)";
  document.getElementById("messageError").textContent = messageValid
    ? ""
    : "Message should be more than 25 characters";

  if (nameValid && subjectValid && emailValid && messageValid) {
    alert("Form submitted successfully!");
  }
});

// Email validation function
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
