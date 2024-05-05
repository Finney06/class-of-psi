// Define submitForm function
function submitForm(event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    const formData = {
        Name: document.getElementById('name').value,
        Nickname: document.getElementById('nickname').value,
        whatsappUsername: document.getElementById('username').value,
        email: document.getElementById('email').value,
        dateOfBirth: document.getElementById('dob').value,
        Picture: [
            { url: '' } // Placeholder for the Cloudinary URL
        ]
    };

 //   if (formData.whatsappUsername.trim() === '' || formData.whatsappUsername.trim() === '@') {
//        alert('Please enter a valid Whatsapp username.');
     //   return;
  //  }

    // Upload image to Cloudinary
    const fileInput = document.getElementById('picture');
    const file = fileInput.files[0];
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dhiegatc6/upload';
    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', file);
    formDataCloudinary.append('upload_preset', 'hct18iyo'); // Set Cloudinary upload preset

    // Fetch request to upload image to Cloudinary
    fetch(cloudinaryUrl, {
        method: 'POST',
        body: formDataCloudinary,
    })
    .then(response => response.json())
    .then(data => {
        const imageUrl = data.secure_url; // Extract the URL of the uploaded image from Cloudinary response
        console.log(imageUrl);
        formData.Picture[0].url = imageUrl; // Update the Picture URL in the formData object
        
        // Send form data to Airtable via API
        return fetch('https://api.airtable.com/v0/appufz5VPar7viZy0/tblmXStbPbBj88Z5E', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer patMBlQYlVo3H5wZU.5a353c102f5a4090215697499350e6d7bfcf285e61c3592e663cf6692a483fac'
            },
            body: JSON.stringify({
                records: [
                    {
                        fields: formData
                    }
                ]
            })
        });
    })
    .then(response => {
        if (response.ok) {
            // Display confirmation message
            showPopup(); // Call showPopup function if form submission is successful
            // Reset the form
            document.getElementById('form').reset();
        } else {
            // Handle error response
            console.error('Error submitting form:', response.statusText);
            alert('Error submitting form:', response.statusText); // Show error message
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert('Error submitting form: ' + error); // Show error message with full error details
    });
}

// Show the popup when the form is successfully submitted
function showPopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    popupOverlay.style.display = 'flex';
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    const okButton = document.getElementById('ok-button');
    const popupOverlay = document.querySelector('.popup-overlay');
  
    // Reload the page when the OK button is clicked and hide the popup
    okButton.addEventListener('click', function () {
        location.reload();
        popupOverlay.style.display = 'none';
    });

    // Call submitForm function when the form is submitted
    document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior
        submitForm(event); // Call submitForm function
    });
});
