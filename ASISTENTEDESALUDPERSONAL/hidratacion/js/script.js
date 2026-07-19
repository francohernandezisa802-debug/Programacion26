function calcularAgua() {

    let peso = parseFloat(document.getElementById("peso").value);

    if (isNaN(peso) || peso <= 0) {

        document.getElementById("resultado").innerHTML =
        "<h3 style='color:red'>Ingrese un peso válido</h3>";

        return;
    }

    let aguaML = peso * 35;

    let aguaLitros = aguaML / 1000;

    let fecha = new Date().toLocaleString();

    let mensaje = "";

    if (aguaLitros < 2) {

        mensaje =
        "⚠️ Debe prestar atención a su hidratación diaria.";

    } else if (aguaLitros < 3) {

        mensaje =
        "✅ Su requerimiento hídrico es adecuado para un adulto promedio.";

    } else {

        mensaje =
        "💪 Recuerde distribuir el consumo de agua durante todo el día.";

    }

    document.getElementById("resultado").innerHTML =

        "<h2 style='color:blue'>Resultado</h2>" +

        "<p><strong>Fecha:</strong> " +
        fecha +
        "</p>" +

        "<p><strong>Peso:</strong> " +
        peso +
        " kg</p>" +

        "<p><strong>Agua recomendada:</strong> " +
        aguaML.toFixed(0) +
        " ml por día</p>" +

        "<p><strong>Equivalente:</strong> " +
        aguaLitros.toFixed(2) +
        " litros diarios</p>" +

        "<p><strong>Información:</strong><br>" +
        mensaje +
        "</p>";

    let historial =
    JSON.parse(localStorage.getItem("historialAgua")) || [];

    historial.push({
        fecha: fecha,
        peso: peso,
        litros: aguaLitros.toFixed(2)
    });

    localStorage.setItem(
        "historialAgua",
        JSON.stringify(historial)
    );

    mostrarHistorial();
}

function mostrarHistorial() {

    let historial =
    JSON.parse(localStorage.getItem("historialAgua")) || [];

    let html =
    "<h2>📋 Historial de Consultas</h2>";

    if (historial.length === 0) {

        html += "<p>Sin registros.</p>";

    } else {

        for (let i = historial.length - 1; i >= 0; i--) {

            html +=
            "<p>" +
            historial[i].fecha +
            "<br>Peso: " +
            historial[i].peso +
            " kg | Agua: " +
            historial[i].litros +
            " L</p><hr>";
        }
    }

    document.getElementById("historial").innerHTML = html;
}

function limpiarCampos() {

    document.getElementById("peso").value = "";

    document.getElementById("resultado").innerHTML = "";
}

function borrarHistorial() {

    let confirmar = confirm(
        "¿Está seguro de borrar todo el historial?"
    );

    if (confirmar) {

        localStorage.removeItem("historialAgua");

        mostrarHistorial();
    }
}

window.onload = mostrarHistorial;