let car: Car;

let carForm: any = <HTMLDivElement>document.getElementById("carForm");
let wheelForm: any = <HTMLDivElement>document.getElementById("wheelForm");
let carInfo: any = <HTMLDivElement>document.getElementById("carInfo");

// Crear un cotxe 
function createCar() {
  let plate: any = <HTMLInputElement>document.getElementById("plate");
  let brand: any = <HTMLInputElement>document.getElementById("brand");
  let color: any = <HTMLInputElement>document.getElementById("color");

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
    for (let i = 1; i <= 4; i++) {
      let diameter: any = (<HTMLInputElement>(
        document.getElementById("dWheel" + i)
      )).value;
      let brand: any = (<HTMLInputElement>document.getElementById("bWheel" + i))
        .value;
      car.addWheel(new Wheel(diameter, brand));
    }
    console.log(car.wheels);
    showWheel();

    //Reset formularis
    wheelForm.classList.remove("d-flex");
    wheelForm.classList.add("d-none");
    (<HTMLFormElement>document.getElementById("form2")).reset();
    carForm.classList.remove("d-none");
    carForm.classList.add("d-flex");
    (<HTMLFormElement>document.getElementById("form1")).reset();
  }
}

// Mostrar dades cotxe i rodes
function showCar() {
  let newDiv: any = document.createElement("div");
  carInfo.appendChild(newDiv).innerHTML = `
  <br>
  <div class="row col-12 text-center">
          <div class="col-4"><div class="font-weight-bold">PLATE</div>${car.plate}</div>
          <div class="col-4"><div class="font-weight-bold">BRAND</div>${car.brand}</div>
          <div class="col-4"><div class="font-weight-bold">COLOR</div>${car.color}</div>
  </div>
  `;
}
function showWheel() {
  let newDiv: any = document.createElement("div");
  carInfo.appendChild(newDiv).innerHTML = `
  <br>
  <div class="row col-12 text-center">
          <div class="col-3"><div class="font-weight-bold">Wheel 1</div>
              Brand: ${car.wheels[0].brand} 
              <p>Diameter: ${car.wheels[0].diameter}</p></div>
          <div class="col-3"><div class="font-weight-bold">Wheel 2</div>
              Brand: ${car.wheels[1].brand}
              <p>Diameter: ${car.wheels[1].diameter}</p></div>
          <div class="col-3"><div class="font-weight-bold">Wheel 3</div>
              Brand: ${car.wheels[2].brand}
              <p>Diameter: ${car.wheels[2].diameter}</p></div>
          <div class="col-3"><div class="font-weight-bold">Wheel 4</div>
              Brand: ${car.wheels[3].brand}
              <p>Diameter: ${car.wheels[3].diameter}</p></div>
          </div>`;
}
// Validació inputs del formulari cotxe
function validateCar(plate: any, color: any, brand: any) {
  let accumError: number = 0;

  plate.classList.remove("is-invalid");
  color.classList.remove("is-invalid");
  brand.classList.remove("is-invalid");

  let errorPlate: any = <HTMLDivElement>document.getElementById("errorPlate");
  let errorColor: any = <HTMLDivElement>document.getElementById("errorColor");
  let errorBrand: any = <HTMLDivElement>document.getElementById("errorBrand");

  if (plate.value == "") {
    plate.classList.add("is-invalid");
    errorPlate.textContent = "Plate value is required!";
    accumError ++;
  } else if (!validatePlate(plate.value)) {
    plate.classList.add("is-invalid");
    errorPlate.textContent = "Invalid Plate: 4 number + 3 letters";
    accumError ++;
  }
  if (color.value == "") {
    color.classList.add("is-invalid");
    errorBrand.textContent = "Color value is required!";
    accumError  ++;
  }
  if (brand.value == "") {
    brand.classList.add("is-invalid");
    errorColor.textContent = "Brand value is required!";
    accumError ++;
  }

  if (accumError > 0) {
    return false;
  } else {
    return true;
  }
}
//Validació format matrícula
function validatePlate(plate: string) {
  let plateReg: any = /^(\d{4}[b-df-hj-np-tv-z]{3})*$/gi;
  return plateReg.test(plate) ? true : false;
}

/*function required(inputId: any, errorId: any) {
  inputId.classList.add("is-invalid");
  errorId.textContent = "El campo es requerido";
}*/

function validateWheels() {
  let accumError: number = 0;

  //Validació de les rodes
  for (let i = 1; i <= 4; i++) {
    let diameter: any = <HTMLInputElement>document.getElementById("dWheel" + i);
    let brandW: any = <HTMLInputElement>document.getElementById("bWheel" + i);

    let errorDiameter: any = <HTMLDivElement>(
      document.getElementById("errorDwheel" + i)
    );
    let errorBrandW: any = <HTMLDivElement>(
      document.getElementById("errorBwheel" + i)
    );

    diameter.classList.remove("is-invalid");
    brandW.classList.remove("is-invalid");

    if (diameter.value == "") {
      diameter.classList.add("is-invalid");
      errorDiameter.textContent = "Diameter value is required!";
      accumError ++;
    } else if (diameter.value < 0.4 || diameter.value > 2) {
      diameter.classList.add("is-invalid");
      errorDiameter.textContent = "The diameter must be between 0.4 & 2";
      accumError ++;
    }
    if (brandW.value == "") {
      brandW.classList.add("is-invalid");
      errorBrandW.textContent = "Brand value is required!";
    }
  }

  if (accumError > 0) {
    return false;
  } else {
    return true;
  }
}
if(carForm){
  carForm.addEventListener ('blur', (event:any) =>{
    if (event.target.value != '') event.target.classList.remove('is-invalid');
    },  true); 
  
}
if(wheelForm){
  wheelForm.addEventListener ('blur', (event:any) =>{
    if (event.target.value != '') event.target.classList.remove('is-invalid');
    },  true); 
  
}
