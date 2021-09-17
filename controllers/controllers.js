"use strict";
var car;
var carForm = document.getElementById("carForm");
var wheelForm = document.getElementById("wheelForm");
var carInfo = document.getElementById("carInfo");
// Crear un cotxe 
function createCar() {
    var plate = document.getElementById("plate");
    var brand = document.getElementById("brand");
    var color = document.getElementById("color");
    if (validateCar(plate, color, brand)) {
        car = new Car(plate.value, color.value, brand.value);
        console.log(car);
        // Ocultar formulari cotxe , mostrar formulari rodes 
        carForm.classList.remove("d-flex");
        carForm.classList.add("d-none");
        wheelForm.classList.remove("d-none");
        wheelForm.classList.add("d-flex");
        showCar();
    }
}
// afegir rodes
function addWheels() {
    if (validateWheels()) {
        for (var i = 1; i <= 4; i++) {
            var diameter = (document.getElementById("dWheel" + i)).value;
            var brand = document.getElementById("bWheel" + i)
                .value;
            car.addWheel(new Wheel(diameter, brand));
        }
        console.log(car.wheels);
        showWheel();
        //Reset formularis
        wheelForm.classList.remove("d-flex");
        wheelForm.classList.add("d-none");
        document.getElementById("form2").reset();
        carForm.classList.remove("d-none");
        carForm.classList.add("d-flex");
        document.getElementById("form1").reset();
    }
}
// Mostrar dades cotxe i rodes
function showCar() {
    var newDiv = document.createElement("div");
    carInfo.appendChild(newDiv).innerHTML = "\n  <br>\n  <div class=\"row col-12 text-center\">\n          <div class=\"col-4\"><div class=\"font-weight-bold\">PLATE</div>" + car.plate + "</div>\n          <div class=\"col-4\"><div class=\"font-weight-bold\">BRAND</div>" + car.brand + "</div>\n          <div class=\"col-4\"><div class=\"font-weight-bold\">COLOR</div>" + car.color + "</div>\n  </div>\n  ";
}
function showWheel() {
    var newDiv = document.createElement("div");
    carInfo.appendChild(newDiv).innerHTML = "\n  <br>\n  <div class=\"row col-12 text-center\">\n          <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 1</div>\n              Brand: " + car.wheels[0].brand + " \n              <p>Diameter: " + car.wheels[0].diameter + "</p></div>\n          <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 2</div>\n              Brand: " + car.wheels[1].brand + "\n              <p>Diameter: " + car.wheels[1].diameter + "</p></div>\n          <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 3</div>\n              Brand: " + car.wheels[2].brand + "\n              <p>Diameter: " + car.wheels[2].diameter + "</p></div>\n          <div class=\"col-3\"><div class=\"font-weight-bold\">Wheel 4</div>\n              Brand: " + car.wheels[3].brand + "\n              <p>Diameter: " + car.wheels[3].diameter + "</p></div>\n          </div>";
}
// Validació inputs del formulari cotxe
function validateCar(plate, color, brand) {
    var accumError = 0;
    plate.classList.remove("is-invalid");
    color.classList.remove("is-invalid");
    brand.classList.remove("is-invalid");
    var errorPlate = document.getElementById("errorPlate");
    var errorColor = document.getElementById("errorColor");
    var errorBrand = document.getElementById("errorBrand");
    if (plate.value == "") {
        plate.classList.add("is-invalid");
        errorPlate.textContent = "Plate value is required!";
        accumError++;
    }
    else if (!validatePlate(plate.value)) {
        plate.classList.add("is-invalid");
        errorPlate.textContent = "Invalid Plate: 4 number + 3 letters";
        accumError++;
    }
    if (color.value == "") {
        color.classList.add("is-invalid");
        errorBrand.textContent = "Color value is required!";
        accumError++;
    }
    if (brand.value == "") {
        brand.classList.add("is-invalid");
        errorColor.textContent = "Brand value is required!";
        accumError++;
    }
    if (accumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
//Validació format matrícula
function validatePlate(plate) {
    var plateReg = /^(\d{4}[b-df-hj-np-tv-z]{3})*$/gi;
    return plateReg.test(plate) ? true : false;
}
/*function required(inputId: any, errorId: any) {
  inputId.classList.add("is-invalid");
  errorId.textContent = "El campo es requerido";
}*/
function validateWheels() {
    var accumError = 0;
    //Validació de les rodes
    for (var i = 1; i <= 4; i++) {
        var diameter = document.getElementById("dWheel" + i);
        var brandW = document.getElementById("bWheel" + i);
        var errorDiameter = (document.getElementById("errorDwheel" + i));
        var errorBrandW = (document.getElementById("errorBwheel" + i));
        diameter.classList.remove("is-invalid");
        brandW.classList.remove("is-invalid");
        if (diameter.value == "") {
            diameter.classList.add("is-invalid");
            errorDiameter.textContent = "Diameter value is required!";
            accumError++;
        }
        else if (diameter.value < 0.4 || diameter.value > 2) {
            diameter.classList.add("is-invalid");
            errorDiameter.textContent = "The diameter must be between 0.4 & 2";
            accumError++;
        }
        if (brandW.value == "") {
            brandW.classList.add("is-invalid");
            errorBrandW.textContent = "Brand value is required!";
        }
    }
    if (accumError > 0) {
        return false;
    }
    else {
        return true;
    }
}
if (carForm) {
    carForm.addEventListener('blur', function (event) {
        if (event.target.value != '')
            event.target.classList.remove('is-invalid');
    }, true);
}
if (wheelForm) {
    wheelForm.addEventListener('blur', function (event) {
        if (event.target.value != '')
            event.target.classList.remove('is-invalid');
    }, true);
}
