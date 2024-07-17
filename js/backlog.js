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
    //crea la fila de encabezado de la tabla
    createTableHeaders();

    fetch('https://script.google.com/macros/s/AKfycbxrhL7un2AE62e5r1NEbUNctgTtEPZHeu4IR3mnBW5ERD349KYWV63SOhAR8XImxafmlg/exec')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      let tableBody = document.getElementById('backlog').getElementsByTagName('tbody')[0];
      data.forEach(item => {
          let row = tableBody.insertRow();
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          
          cell1.textContent = item.gametitle;
          cell2.textContent = item.platform;
          cell3.textContent = item.totaltime;
      });
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
});