function validateForm() {
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  let isValid = true;
  let errorMessage = "";

  // Create validation tracker to provide comprehensive feedback
  const validationErrors = [];
  
  // Check for empty fields
  if (!email) {
    validationErrors.push("Email address is required");
    highlightInvalidField("email");
    isValid = false;
  }
  
  if (!password) {
    validationErrors.push("Password is required");
    highlightInvalidField("password");
    isValid = false;
  }
  
  // If fields are empty, return early with basic validation error
  if (validationErrors.length > 0) {
    showValidationError(validationErrors.join("<br>"));
    return false;
  }
  
  // Email domain validation
  if (!email.endsWith("@vit.edu")) {
    validationErrors.push("Only VIT email addresses are allowed (must end with @vit.edu)");
    highlightInvalidField("email");
    isValid = false;
  }
  
  // Password strength validation
  if (password.length < 6) {
    validationErrors.push("Password must be at least 6 characters long");
    highlightInvalidField("password");
    isValid = false;
  }
  
  // Show validation errors if any
  if (validationErrors.length > 0) {
    showValidationError(validationErrors.join("<br>"));
    return false;
  }
  
  return isValid;
}

// Function to highlight invalid fields with visual feedback
function highlightInvalidField(fieldId) {
  const field = document.getElementById(fieldId);
  field.classList.add("invalid-input");
  
  // Add shake animation for better user feedback
  field.classList.add("shake-field");
  
  // Remove animation class after it completes
  setTimeout(() => {
    field.classList.remove("shake-field");
  }, 500);
  
  // Listen for input to remove error styling when user starts fixing the issue
  field.addEventListener("input", function removeInvalidClass() {
    field.classList.remove("invalid-input");
    field.removeEventListener("input", removeInvalidClass);
  });
}

// Function to show validation errors in a user-friendly way
function showValidationError(message) {
  // Create or get error container
  let errorContainer = document.getElementById("validation-error");
  
  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.id = "validation-error";
    errorContainer.className = "validation-error";
    
    // Insert before the form
    const form = document.getElementById("loginForm");
    form.parentNode.insertBefore(errorContainer, form);
  }
  
  // Set error message
  errorContainer.innerHTML = `
    <div class="error-icon">❌</div>
    <div class="error-message">${message}</div>
  `;
  
  // Animate in
  errorContainer.style.display = "flex";
  setTimeout(() => {
    errorContainer.style.opacity = "1";
    errorContainer.style.transform = "translateY(0)";
  }, 10);
  
  // Add close button functionality
  const closeButton = document.createElement("button");
  closeButton.className = "close-error";
  closeButton.innerHTML = "×";
  closeButton.addEventListener("click", function() {
    errorContainer.style.opacity = "0";
    errorContainer.style.transform = "translateY(-20px)";
    setTimeout(() => {
      errorContainer.style.display = "none";
    }, 300);
  });
  
  errorContainer.appendChild(closeButton);
}

// Add CSS styles for validation UI
document.addEventListener("DOMContentLoaded", function() {
  // Add styles only if they don't exist yet
  if (!document.getElementById("validation-styles")) {
    const styleElement = document.createElement("style");
    styleElement.id = "validation-styles";
    styleElement.textContent = `
      .invalid-input {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.2) !important;
      }
      
      .shake-field {
        animation: shake-animation 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      
      @keyframes shake-animation {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
      }
      
      .validation-error {
        background-color: rgba(231, 76, 60, 0.9);
        color: white;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 20px;
        display: flex;
        align-items: flex-start;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        position: relative;
      }
      
      .error-icon {
        margin-right: 10px;
        font-size: 18px;
      }
      
      .error-message {
        flex-grow: 1;
        line-height: 1.5;
      }
      
      .close-error {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0 5px;
        margin-left: 10px;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      
      .close-error:hover {
        opacity: 1;
      }
    `;
    
    document.head.appendChild(styleElement);
  }
});