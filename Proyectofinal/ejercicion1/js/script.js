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

    document.getElementById("resultado").innerHTML =

        "<h2 style='color:" + color + "'>" + clasificacion + "</h2>" +

        "<p><strong>IMC:</strong> " + imc.toFixed(2) + "</p>" +

        "<p><strong>Información:</strong><br>" +
        mensaje +
        "</p>";
}