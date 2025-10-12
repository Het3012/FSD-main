const API_URL = 'http://localhost:5000/api/contact';

// Form elements
const contactForm = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const formMessage = document.getElementById('formMessage');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoader = submitButton.querySelector('.button-loader');

// Input elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName(name) {
    const trimmedName = name.trim();
    if (!trimmedName) {
        return 'Name is required';
    }
    if (trimmedName.length < 2 || trimmedName.length > 100) {
        return 'Name must be between 2 and 100 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
        return 'Name can only contain letters and spaces';
    }
    return null;
}

function validateEmail(email) {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return 'Please provide a valid email address';
    }
    return null;
}

function validateSubject(subject) {
    const trimmedSubject = subject.trim();
    if (!trimmedSubject) {
        return 'Subject is required';
    }
    if (trimmedSubject.length < 3 || trimmedSubject.length > 200) {
        return 'Subject must be between 3 and 200 characters';
    }
    return null;
}

function validateMessage(message) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
        return 'Message is required';
    }
    if (trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
        return 'Message must be between 10 and 2000 characters';
    }
    return null;
}

// Show error message
function showError(input, errorElement, message) {
    input.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear error message
function clearError(input, errorElement) {
    input.classList.remove('invalid');
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        showError(nameInput, nameError, error);
    } else {
        clearError(nameInput, nameError);
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        showError(emailInput, emailError, error);
    } else {
        clearError(emailInput, emailError);
    }
});

subjectInput.addEventListener('blur', () => {
    const error = validateSubject(subjectInput.value);
    if (error) {
        showError(subjectInput, subjectError, error);
    } else {
        clearError(subjectInput, subjectError);
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    if (error) {
        showError(messageInput, messageError, error);
    } else {
        clearError(messageInput, messageError);
    }
});

// Clear errors on input
nameInput.addEventListener('input', () => clearError(nameInput, nameError));
emailInput.addEventListener('input', () => clearError(emailInput, emailError));
subjectInput.addEventListener('input', () => clearError(subjectInput, subjectError));
messageInput.addEventListener('input', () => clearError(messageInput, messageError));

// Show message (success or error)
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message show ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.classList.remove('show');
    }, 5000);
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    formMessage.classList.remove('show');
    
    // Get form values
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim()
    };
    
    // Validate all fields
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const subjectValidation = validateSubject(formData.subject);
    const messageValidation = validateMessage(formData.message);
    
    let hasErrors = false;
    
    if (nameValidation) {
        showError(nameInput, nameError, nameValidation);
        hasErrors = true;
    }
    
    if (emailValidation) {
        showError(emailInput, emailError, emailValidation);
        hasErrors = true;
    }
    
    if (subjectValidation) {
        showError(subjectInput, subjectError, subjectValidation);
        hasErrors = true;
    }
    
    if (messageValidation) {
        showError(messageInput, messageError, messageValidation);
        hasErrors = true;
    }
    
    if (hasErrors) {
        showMessage('Please correct the errors in the form', 'error');
        return;
    }
    
    // Disable submit button and show loader
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    
    try {
        // Send data to backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            // Success
            showMessage(result.message, 'success');
            contactForm.reset();
            
            // Clear any remaining error states
            clearError(nameInput, nameError);
            clearError(emailInput, emailError);
            clearError(subjectInput, subjectError);
            clearError(messageInput, messageError);
        } else {
            // Server returned an error
            if (result.errors && Array.isArray(result.errors)) {
                showMessage(result.errors.join(', '), 'error');
            } else {
                showMessage(result.message || 'Failed to send message. Please try again.', 'error');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Unable to connect to the server. Please check your connection and try again.', 'error');
    } finally {
        // Re-enable submit button and hide loader
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoader.style.display = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});