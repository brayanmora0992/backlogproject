document.addEventListener('DOMContentLoaded', function() {

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
    document.getElementById('search').addEventListener('click', ()=>{
        processSearch();
        
    });

});


