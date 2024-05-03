function submitForm(event) {
    event.preventDefault(); 


    const formData = {
        Name: document.getElementById('name').value,
        Nickname: document.getElementById('nickname').value,
        "Whatsapp Username": document.getElementById('username').value,
        Email: document.getElementById('email').value,
        "Date of Birth": document.getElementById('dob').value,
        Picture: [
            {
                url: document.getElementById('picture').value
            }
        ]
    };

    console.log(formData);


    fetch('https://api.airtable.com/v0/appufz5VPar7viZy0/tblmXStbPbBj88Z5E', {
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
    })
    .then(response => {
        if (response.ok) {

            document.getElementById("confirmation-message").style.display = "block";
            form.reset();
        } else {

            console.error('Error submitting form:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        alert.error('Error submitting form:', error);
    });
}
