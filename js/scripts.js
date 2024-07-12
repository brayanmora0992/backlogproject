//función para tomar el texto del campo 'title', dividirlo y agregarle entre cada espacio el modificador necesario para la búsqueda en hltb.
function processSearch() {
    //define un array gametitle
    let gametitle = [];
    //define una variable title para tomar el valor del campo 'title'
    let title = document.getElementById('title').value;
    //define una variable donde guardar el título dividido
    let splitTitle = title.split(' ');
    //al array gametitle le guarda el título unido por el string '%2520
    gametitle = splitTitle.join('%2520');
    console.log(gametitle);
    //define una variable para que se abra la página de hltb con la búsqueda
    let howlongtobeat = window.open('https://howlongtobeat.com/?q='+gametitle)


}

document.addEventListener('DOMContentLoaded', function() {
    //Capturar el envio del formulario
    document.getElementById('backlogForm').addEventListener('submit', function(event){
        event.preventDefault(); //previene que se envie el formulario

        //obtiene datos del formulario
        let form = document.getElementById('backlogForm');
        let formData = new FormData(form);

        //Envia los datos a Google usando fetch
        fetch('https://script.google.com/macros/s/AKfycbxcUdUr1yyoIqJPk2WOmtwwSMo4n8I03wKaeo-HrGM2Xsr-Y5zmNxGdUP2pR14sM6wqYQ/exec', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Formulario enviado correctamente');
                window.alert('Save data complete');
            } else {
                console.error('Error al enviar form');
            }
        })
        .catch(error => {
            console.error('Error en la slicitud:', error);
        });
    });
    //procesa la búsqueda para hltb
    document.getElementById('search').addEventListener('click', ()=>{
        processSearch();        
    });

    document.getElementById('viewBacklog').addEventListener('click', ()=>{
        fetch('https://script.google.com/macros/s/AKfycbxcUdUr1yyoIqJPk2WOmtwwSMo4n8I03wKaeo-HrGM2Xsr-Y5zmNxGdUP2pR14sM6wqYQ/exec')
        .then(response => response.json())
        .then(data => {
          // Aquí puedes procesar los datos recibidos, por ejemplo, mostrarlos en tu página
          console.log(data); // Muestra los datos en la consola para verificar
        })
        .catch(error => {
          console.error('Error al obtener los datos:', error);
        });
    });

});


