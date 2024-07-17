function createTableHeaders() {
    let tableHead = document.getElementById('backlog').querySelector('thead');
    tableHead.innerHTML = '';

    //Crea los elementos th y los agrega al thead
    let headerRow = document.createElement('tr');
    let headers = ['Title', 'Platform', 'Total Time'];

    headers.forEach(headerText => {
      let th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });    
}


document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('loadingIndicator').style.display = 'block';
    //crea la fila de encabezado de la tabla
    createTableHeaders();

    fetch('https://script.google.com/macros/s/AKfycbw5IGxglhIn2f-osGAuGVwMLZWPKagAbM1fjGt9VkuP5j_dQHEUasYdqbF67MzWZYUZ7g/exec')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.data = data; //Guarda los datos en una variable global para el filtrado
      window.isAscending = true //Variable global para el ordenamiento
      
      document.getElementById('loadingIndicator').style.display = 'none';
      document.getElementById('backlog').style.display = 'table';
      
      displayTable(data);
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
      // Ocultar indicador de carga de caso de error
      document.getElementById('loadingIndicator').style.display= 'none';
    });
});

function displayTable(data) {
    let tableBody = document.getElementById('backlog').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; //limpia la tabla antes de mostrar los datos
    data.forEach(item => {
        let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        
        cell1.textContent = item.gametitle;
        cell2.textContent = item.platform;
        cell3.textContent = item.totaltime;
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