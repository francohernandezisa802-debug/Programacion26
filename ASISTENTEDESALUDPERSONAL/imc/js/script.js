function calcularIMC() {

    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (isNaN(peso) || isNaN(altura) || altura <= 0) {

        document.getElementById("resultado").innerHTML =
        "<h3 style='color:red'>Ingrese valores válidos</h3>";

        return;
    }

    let imc = peso / (altura * altura);

    let clasificacion = "";
    let mensaje = "";
    let color = "";

    if (imc < 18.5) {

        clasificacion = "Bajo peso";
        color = "blue";

        mensaje =
        "Su peso está por debajo del rango recomendado. Se recomienda consultar un profesional de salud y fortalecer la alimentación.";

    } else if (imc < 25) {

        clasificacion = "Peso normal ✅";
        color = "green";

        mensaje =
        "Excelente. Su peso está dentro del rango saludable. Continúe con hábitos saludables y actividad física regular.";

    } else if (imc < 30) {

        clasificacion = "Sobrepeso ⚠️";
        color = "orange";

        mensaje =
        "Se recomienda mejorar los hábitos alimenticios, aumentar la actividad física y realizar controles periódicos.";

    } else {

        clasificacion = "Obesidad 🚨";
        color = "red";

        mensaje =
        "Es recomendable buscar orientación médica y nutricional para disminuir riesgos cardiovasculares y metabólicos.";

    }

    let fecha = new Date().toLocaleString();

    document.getElementById("resultado").innerHTML =

        "<h2 style='color:" + color + "'>" +
        clasificacion +
        "</h2>" +

        "<p><strong>Fecha:</strong> " +
        fecha +
        "</p>" +

        "<p><strong>Peso:</strong> " +
        peso +
        " kg</p>" +

        "<p><strong>Altura:</strong> " +
        altura +
        " m</p>" +

        "<p><strong>IMC:</strong> " +
        imc.toFixed(2) +
        "</p>" +

        "<p><strong>Información:</strong><br>" +
        mensaje +
        "</p>";

    let historial =
    JSON.parse(localStorage.getItem("historialIMC")) || [];

    historial.push({
        fecha: fecha,
        peso: peso,
        altura: altura,
        imc: imc.toFixed(2),
        clasificacion: clasificacion
    });

    localStorage.setItem(
        "historialIMC",
        JSON.stringify(historial)
    );

    mostrarHistorial();
}

function mostrarHistorial() {

    let historial =
    JSON.parse(localStorage.getItem("historialIMC")) || [];

    let html =
    "<h2>📋 Historial de Consultas IMC</h2>";

    if (historial.length === 0) {

        html += "<p>Sin registros.</p>";

    } else {

        for (let i = historial.length - 1; i >= 0; i--) {

            html +=
            "<p>" +
            historial[i].fecha +

            "<br><strong>IMC:</strong> " +
            historial[i].imc +

            "<br><strong>Clasificación:</strong> " +
            historial[i].clasificacion +

            "</p><hr>";
        }
    }

    document.getElementById("historial").innerHTML = html;
}

function limpiarCampos() {

    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    document.getElementById("resultado").innerHTML = "";
}

function borrarHistorial() {

    let confirmar = confirm(
        "¿Está seguro de borrar todo el historial de IMC?"
    );

    if (confirmar) {

        localStorage.removeItem("historialIMC");

        mostrarHistorial();
    }
}

window.onload = mostrarHistorial;