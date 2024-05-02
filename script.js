function submitForm(event) {
  event.preventDefault(); // Prevent form submission
  
  // Collect form data
  const formData = {
      name: document.getElementById('name').value,
      nickname: document.getElementById('nickname').value,
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      dob: document.getElementById('dob').value,
      picture: document.getElementById('picture').value,

      // Add more fields as needed
  };

console.log(formData); // Log form data to console for debugging

  // Send form data to Airtable via API
  fetch('https://api.airtable.com/v0/appZ3E9Xgs8l3x0nz/tbloxV6gXcxOJLQn8', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer patVgKkf3HosfN2nL.cc57446678b5e7e29204ad23a5b9d55ab7b5275d38c6274c93d3e3e76534aa7d'
      },
      body: JSON.stringify({
          fields: formData
      })
  })
  .then(response => {
      if (response.ok) {
          // Display confirmation message
          document.getElementById("confirmation-message").style.display = "block";
      } else {
          // Handle error response
          console.error('Error submitting form:', response.statusText);
      }
  })
  .catch(error => {
      console.error('Error submitting form:', error);
      alert.error('Error submitting form:', error);
  });
}