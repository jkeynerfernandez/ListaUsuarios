let botonBorrar     = document.getElementsByClassName("borrar");
let botonActualizar = document.getElementsByClassName("actualizar");
let botonMostrar    = document.getElementsByClassName("mostrar");
let listaDeIDs=[];
let body = document.getElementById("body");

/////buscador///////////////////
let busqueda = document.createElement("div");
body.appendChild(busqueda);

let formularioBusqueda = document.createElement("form");
busqueda.appendChild(formularioBusqueda);

let cuadroDeBusqueda = document.createElement("input");
cuadroDeBusqueda.setAttribute("type","text");
cuadroDeBusqueda.setAttribute("placeholder","palabra clave");
cuadroDeBusqueda.setAttribute("id","cuadroDeBusqueda");
cuadroDeBusqueda.setAttribute("onkeyup","buscar()");
busqueda.appendChild(cuadroDeBusqueda);









////////////////////////////






/////////////////////////////////////////////////////////
let divFormulario  = document.createElement("div");
divFormulario.classList.add("formulario")
body.appendChild(divFormulario);

let formulario =  document.createElement("form");
formulario.setAttribute("method","post")
divFormulario.appendChild(formulario);
////nombre
let leabelNombre = document.createElement("leabel");
leabelNombre.setAttribute("for","name");
leabelNombre.innerText="Nombre:";
formulario.appendChild(leabelNombre);

let cajaNombre = document.createElement("input");
cajaNombre.setAttribute("type","text");
cajaNombre.setAttribute("name","nombre");
formulario.appendChild(cajaNombre);
/// correo
let leabelCorreo = document.createElement("leabel");
leabelCorreo.setAttribute("for","email");
leabelCorreo.innerText="Email:";
formulario.appendChild(leabelCorreo);

let cajaEmail = document.createElement("input");
cajaEmail.setAttribute("type","email");
cajaEmail.setAttribute("name","email");
formulario.appendChild(cajaEmail);
//contraseña
let leabelPassword = document.createElement("leabel");
leabelPassword.setAttribute("for","password");
leabelPassword.innerText="PASSWORD:";   
formulario.appendChild(leabelPassword);

let cajaPassword = document.createElement("input");
cajaPassword.setAttribute("type","password");
cajaPassword.setAttribute("name","password");
formulario.appendChild(cajaPassword);


///caja vacia
let cajaVacia = document.createElement("input");
cajaVacia.setAttribute("type","hidden");
cajaVacia.setAttribute("name","nombre");
cajaVacia.setAttribute("id","id");
formulario.appendChild(cajaVacia);

/////submit actualizar////////////////
let buttonSubmit = document.createElement("button");
buttonSubmit.classList.add("submit");
buttonSubmit.setAttribute("type","button");

buttonSubmit.innerText="Enviar";
buttonSubmit.setAttribute("onclick","enviar()");
formulario.appendChild(buttonSubmit);

////submit crear///////////////////////
let buttonSubmitCrear = document.createElement("button");
buttonSubmitCrear.classList.add("submitCrear");
buttonSubmitCrear.setAttribute("type","button");

buttonSubmitCrear.innerText="Crear";
buttonSubmitCrear.setAttribute("onclick","nuevo()");
formulario.appendChild(buttonSubmitCrear);

///////caja de mensajes

let parrafoInformacion = document.createElement("p");
formulario.appendChild(parrafoInformacion)








/////////////////////////////////////////////////////////


let table = document.createElement("table");
table.classList.add("tablaDeUsuarios");
table.setAttribute("id","tablaDeUsuarios")
body.appendChild(table);

let thead= document.createElement("thead");
thead.classList.add("encabezado");
table.appendChild(thead);

let tr =document.createElement("tr");
thead.appendChild(tr);

let thName  = document.createElement("th");
thName.classList.add("titulo");
thName.innerText="NOMBRE";

let thEmail = document.createElement("th");
thEmail.classList.add("titulo");
thEmail.innerText="EMAIL";

let thID    = document.createElement("th");
thID.classList.add("titulo");
thID.innerText="ID";

let thAcciones= document.createElement("th");
thAcciones.classList.add("titulo");
thAcciones.innerText="ACCION";


tr.appendChild(thID);
tr.appendChild(thName);
tr.appendChild(thEmail);
tr.appendChild(thAcciones);
/////////////////////////////////////////////////
let tbody= document.createElement("tbody");
tbody.classList.add("cuerpoDeLaTabla");
table.appendChild(tbody);

let promesa = fetch("https://memin.io/public/api/v2/users")
.then(response =>{
    return response.json()
}).then(data =>{
    data.data.forEach(function (elemento) {
        listaDeIDs.push(elemento.id)
        let trContenido = document.createElement("tr");
        tbody.appendChild(trContenido);

            let tdID= document.createElement("td");
            tdID.innerText=elemento.id;

            let tdName= document.createElement("td");
            tdName.innerText=elemento.name;

            let tdEmail= document.createElement("td");
            tdEmail.innerText=elemento.email;

            let tdAcciones= document.createElement("td");
                let buttonDelete  = document.createElement("button");
                buttonDelete.classList.add("borrar")
                tdAcciones.appendChild(buttonDelete);
                buttonDelete.setAttribute("type","button");
                buttonDelete.setAttribute("value",elemento.id);
                buttonDelete.setAttribute("onclick",`eliminar(${elemento.id})`);
                
                buttonDelete.innerText="Eliminar";

                

                let buttonUpdate  = document.createElement("button");
                buttonUpdate.classList.add("actualizar");
                tdAcciones.appendChild(buttonUpdate);

                buttonUpdate.setAttribute("type","button");
                buttonUpdate.setAttribute("value",elemento.id);
                buttonUpdate.innerText="Actualizar";
                buttonUpdate.setAttribute("onclick",`actualizar(${elemento.id})`);

                let buttonDetails = document.createElement("button");
                buttonDetails.classList.add("crear");
                tdAcciones.appendChild(buttonDetails);
                buttonDetails.setAttribute("type","button");
                buttonDetails.setAttribute("value",elemento.id);
                buttonDetails.innerText="Ver detalles";
                buttonDetails.setAttribute("onclick",`mostrar(${elemento.id})`);

            trContenido.appendChild(tdID);
            trContenido.appendChild(tdName);
            trContenido.appendChild(tdEmail);
            trContenido.appendChild(tdAcciones);


        
        
    });
})

function eliminar(elementoID){
    
    fetch(`https://memin.io/public/api/v2/users/${elementoID}`,{
        method: "DELETE"
    })

    

    console.log("eliminar ", elementoID);
    
}

function mostrar(elementoID){
    console.log("ingreso a mostrar");
    fetch(`https://memin.io/public/api/v2/users/${elementoID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
        
    })
    .then(data => {
        console.log(data);
        parrafoInformacion.innerText = `ID: ${data.id}\nNombre: ${data.name}\nEmail: ${data.email}\nPassword: ${data.password}`;
    })
    
}

function actualizar(elementoID){
    let nombre = cajaNombre.value;
    let correo = cajaEmail.value;
    console.log("ingreso a actualizar");
    fetch(`https://memin.io/public/api/v2/users/${elementoID}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
        
    })
    .then(data => {
       cajaNombre.value=data.name;
       cajaEmail.value =data.email;
       cajaVacia.value= data.id;
       
       
     
       
       
    })
    
    
        
    
    
}
function enviar(){
    
    let nombre = cajaNombre.value;
    let correo = cajaEmail.value;
    console.log("ingresò a enviar");
    let id = document.getElementById("id");
    console.log(id.value);

    
    console.log("ingreso a actualizar");
    fetch(`https://memin.io/public/api/v2/users/${id.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nombre,
            email: correo
        })


    })
    .then(response => {
        return response.json();
        
        
    })
    // .then(data => {
   
    //    data.name = cajaNombre.value;
    //    data.email =cajaEmail.value;
       
    // })
    

        
    
    
}
function nuevo(){
    console.log("ingresó a crear usurio");
    let nombre = cajaNombre.value;
    let correo = cajaEmail.value;
    let password= cajaPassword.value;
   
    let id = document.getElementById("id");
    console.log(id.value);

    
    
    fetch("https://memin.io/public/api/v2/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
            name: nombre,
            email: correo,
            password: password
            
        })


    })
    .then(response => {
        
        return response.json();
        
        
    })
    // .then(data => {
   
    //    data.name = cajaNombre.value;
    //    data.email =cajaEmail.value;
       
    // })
    

        
    
    
}

function buscar(){
    var num_cols, display, input, filter, table_body, tr, td, i, txtValue;
    num_cols = 3;
    input = document.getElementById("cuadroDeBusqueda");
    filter = input.value.toUpperCase();
    table_body = document.getElementById("tablaDeUsuarios");
    tr = table_body.getElementsByTagName("tr");

    for(i=0; i< tr.length; i++){				
        display = "none";
        for(j=0; j < num_cols; j++){
            td = tr[i].getElementsByTagName("td")[j];
            if(td){
                txtValue = td.textContent || td.innerText;
                if(txtValue.toUpperCase().indexOf(filter) > -1){
                    display = "";
                }
            }
        }
        tr[i].style.display = display;
    }
}		