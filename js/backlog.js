function createTableHeaders() {
    let tableHead = document.getElementById('backlog').querySelector('thead');
    tableHead.innerHTML = '';

    // Crea los elementos th y los agrega al thead
    let headerRow = document.createElement('tr');
    let headers = ['Title', 'Platform', 'Total Time', 'Mark as finished'];

    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    tableHead.appendChild(headerRow); // Agrega la fila de encabezado al thead
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loadingIndicator').style.display = 'block';


    fetch('https://script.google.com/macros/s/AKfycbw1T8gq8qbhMDfuto2pW9O1zrxGsdwMbPA30qQtgItd7zUcnSl_jsSnn2XtC9sEzprlvQ/exec')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.data = data; // Guarda los datos en una variable global para el filtrado
            window.isAscending = true; // Variable global para el ordenamiento

            document.getElementById('loadingIndicator').style.display = 'none';
            document.getElementById('backlog').style.display = 'table';
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
    let tableBody = document.getElementById('backlog').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpia la tabla antes de mostrar los datos
    data.forEach(item => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        
        cell1.textContent = item.gametitle;
        cell2.textContent = item.platform;
        cell3.textContent = item.totaltime;
        addCompleteButton(row, item.gametitle, item.platform); // Agrega el botón de completar con plataforma
    });
}

function filterTable() {
    let filterName = document.getElementById('filterName').value.toLowerCase();
    let filteredData = window.data.filter(item => {
        return item.gametitle.toLowerCase().includes(filterName);
    });

    displayTable(filteredData);
}

function sortTableByDuration() {
    let sortedData = window.data.sort((a, b) => {
        return window.isAscending ? a.totaltime - b.totaltime : b.totaltime - a.totaltime;
    });

    window.isAscending = !window.isAscending; // Alternar el orden
    displayTable(sortedData);
}

function markAsCompleted(gametitle, platform) {
    let formData = new FormData();
    formData.append('gametitle', gametitle);
    formData.append('platform', platform);
    formData.append('move', 'true'); // Agregar el parámetro "move" al hacer POST

    fetch('https://script.google.com/macros/s/AKfycbw1T8gq8qbhMDfuto2pW9O1zrxGsdwMbPA30qQtgItd7zUcnSl_jsSnn2XtC9sEzprlvQ/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        // Actualiza la tabla local después de mover a completado
        window.data = window.data.filter(item => !(item.gametitle === gametitle && item.platform === platform)); // Filtra la data para remover el juego completado
        displayTable(window.data);
    })
    .catch(error => {
        console.error('Error al marcar como completado:', error);
    });
}

function addCompleteButton(row, gametitle, platform) {
    let cell = row.insertCell(3);
    let button = document.createElement('button');
    button.textContent = 'Finished';
    button.onclick = () => markAsCompleted(gametitle, platform); // Actualizar el evento del botón para incluir plataforma
    cell.appendChild(button);
}