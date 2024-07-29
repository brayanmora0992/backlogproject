function createTableHeaders() {
    let tableHead = document.getElementById('completed').querySelector('thead');
    tableHead.innerHTML = '';

    // Crea los elementos th y los agrega al thead
    let headerRow = document.createElement('tr');
    let headers = ['Title', 'Platform', 'Total Time', 'Completed'];

    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    tableHead.appendChild(headerRow); // Agrega la fila de encabezado al thead
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadingIndicator').style.display = 'block';

    
    fetch('https://script.google.com/macros/s/AKfycbw1T8gq8qbhMDfuto2pW9O1zrxGsdwMbPA30qQtgItd7zUcnSl_jsSnn2XtC9sEzprlvQ/exec?sheet=completed') // Agrega el parámetro de hoja
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.data = data; // Guarda los datos en una variable global para el filtrado

            document.getElementById('loadingIndicator').style.display = 'none';
            document.getElementById('completed').style.display = 'table';
            // Crea la fila de encabezado de la tabla
            createTableHeaders();
            displayTable(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
            // Ocultar indicador de carga en caso de error
            document.getElementById('loadingIndicator').style.display = 'none';
        });
});

function displayTable(data) {
    let tableBody = document.getElementById('completed').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpia la tabla antes de mostrar los datos
    data.forEach(item => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        
        cell1.textContent = item.gametitle;
        cell2.textContent = item.platform;
        cell3.textContent = item.totaltime;
        cell4.textContent = item.completed || 'Not Completed';
    });
}