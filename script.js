// Fetch data from the server and display it in the table
fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    const table = document.getElementById('userTable');
    data.forEach(user => {
      const row = table.insertRow();
      row.insertCell(0).innerText = user.id;
      row.insertCell(1).innerText = user.name;
      row.insertCell(2).innerText = user.email;
    });
  })
  .catch(error => console.error('Error fetching data:', error));
