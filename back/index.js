window.addEventListener("load", irAListaTareas);

function insertarTarea() {

    //Obetener valor del campo nombre tarea
    const nombreTarea = document.getElementById("nombreTarea").value;

    //Validación de valor del campo nombre tarea
    if (nombreTarea == "") {
        alert("El campo \"Nombre tarea\" es obligatorio y no puede estar vacío.");
        return true;
    }

    //Obetener valor del campo estado
    const estado = document.getElementById("estado").value;

    //Validación de valor del campo estado
    if (estado == "" || estado == "Seleccione") {
        alert("Seleccione el estado de la tarea.");
        return true;
    }

    //Obtener base de datos local del navegador
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    //Buscar tarea ingresada en base de datos local
    const isTareaExistente = tareas.find(tareas => tareas.nombreTarea === nombreTarea);
    //Validar existencia de tarea ingresada en base de datos local
    if (isTareaExistente) {
        return alert("La tarea ya existe.");
    }

    //Agregar tarea ingresada en base de datos local
    tareas.push({ id: (tareas.length + 1), nombreTarea: nombreTarea, estado: estado });
    localStorage.setItem("tareas", JSON.stringify(tareas));

    alert("Tarea registrada correctamente.");

}

function verTareas() {
    window.location.href = "./listaTareas.html";
    irAListaTareas();
}

function irAListaTareas() {
    //Validación para no cargar información de tareas
    if (!window.location.href.toString().includes("/listaTareas.html")) {
        return;
    }
    registrosTabla = document.querySelector("#bodyTablaTareas");
    registrosTabla.value = "";
    tareas = JSON.parse(localStorage.getItem("tareas") || []);
    for (i = 0; i < tareas.length; i++) {

        // Crear fila de la tabla
        fila = document.createElement("tr");

        //Crear botón eliminar y sus atributos
        botonEliminar = document.createElement("button");
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.type = "submit";
        botonEliminar.className = "btn btn-danger";
        botonEliminar.setAttribute("onclick", "javascript: eliminarTarea(this);");
        botonEliminar.id = tareas[i].id;

        //Crear check
        checkCompletar = document.createElement("input");
        checkCompletar.type = "checkbox";
        checkCompletar.className = "form-check-input";
        if (tareas[i].estado === "Completada") {
            checkCompletar.setAttribute("checked", true);
            checkCompletar.setAttribute("disabled", true);
        }

        //Crear columna id de la fila
        columnaId = document.createElement("td");
        columnaId.innerHTML = tareas[i].id;
        fila.appendChild(columnaId);
        registrosTabla.appendChild(fila);

        //Crear columna nombre tarea de la fila
        columnaNombreTarea = document.createElement("td");
        columnaNombreTarea.innerHTML = tareas[i].nombreTarea;
        fila.appendChild(columnaNombreTarea);
        registrosTabla.appendChild(fila);

        //Crear columna estado de la fila
        columnaEstado = document.createElement("td");
        columnaEstado.innerHTML = tareas[i].estado;
        fila.appendChild(columnaEstado);

        //Crear columna check completar de la fila
        columnaCompletar = document.createElement("td");
        columnaCompletar.appendChild(checkCompletar);
        fila.appendChild(columnaCompletar);

        //Crear columna de botón eliminar de la fila
        columnaEliminar = document.createElement("td");
        columnaEliminar.appendChild(botonEliminar);
        fila.appendChild(columnaEliminar);

        //Crear registro en la tabla
        registrosTabla.appendChild(fila);

    }
}

function irAFormInsertarTarea() {
    window.location.href = "./insertarTarea.html";
}

function eliminarTarea(boton) {
    idEliminar = parseInt(boton.id);
    //Obtener base de datos local del navegador
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    //Buscar id de tarea a eliminar
    isTareaExistente = false;
    for (i = 0; i < tareas.length; i++) {
        if (tareas[i].id === idEliminar) {
            isTareaExistente = true;
        }
    }

    //Validar existencia del id de tarea a eliminar
    if (!isTareaExistente) {
        alert("La tarea no existe en base de datos.");
        return;
    }
    //Eliminar id de tarea en base de datos local
    tareas = tareas.filter(tareas => tareas.id !== idEliminar)
    console.log(tareas);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    window.location.href = "./listaTareas.html";
}

function regresarAListaTareas() {
    window.location.href = "./listaTareas.html";
    irAListaTareas();
}

function marcarTareaComoCompletada() {

}