// Function to display error message in a specified div
function displayError(errorMessage, targetDivId) {
  const errorDisplay = document.getElementById(targetDivId);
  if (errorDisplay) {
    errorDisplay.textContent = errorMessage;
  } else {
    console.error(`Error: Div with ID ${targetDivId} not found.`);
  }
}

// Export the function to make it accessible to other JavaScript files
export { displayError };
