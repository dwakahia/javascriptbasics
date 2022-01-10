let toyotaModels = ['Premio', 'Rav4', 'axio', 'crown', 'Harrier', 'Hiace'];
let nissanModels = ['Note', 'Juke', 'Sylphy', 'Tiida', 'Murano', 'X-trail'];
let hondaModels = ['Vezel', 'CR-V', 'Odyssey', 'Fit Shuttle', 'Insight', 'Fit'];
let mazdaModels = ['CX-5', 'Demio', 'Axela', 'Atenza', 'CX-3'];


function brandChange(value) {
    let select = document.getElementById('model');
    switch (value) {
        case 'toyota':
            appendOptions(toyotaModels, select)
            break;
        case 'nissan':
            appendOptions(nissanModels, select)
            break;
        case 'honda':
            appendOptions(hondaModels, select)
            break;
        case 'mazda':
            appendOptions(mazdaModels, select)
            break;
        default:
            clearModels(select);
    }
}

function appendOptions(models, select) {
    clearModels(select);
    for (const model of models) {
        let option = document.createElement('option');
        option.value = model;
        option.text = model;
        select.appendChild(option);
    }
}

function clearModels(select) {
    select.innerText = null;
    let option = document.createElement('option');
    option.value = '';
    option.text = 'Select model';
    option.setAttribute('selected', 'selected')
    option.setAttribute('disabled', 'disabled')
    select.appendChild(option);
}

function showVehicles(query) {
    let vehicles = [];
    let tableBody = document.getElementById('vehicleListing');
    let contentArea = document.getElementById('content');
    if (localStorage.getItem('vehicleList') !== null) {
        vehicles = JSON.parse(localStorage.getItem('vehicleList'));
        if (query) {
            vehicles = vehicles.filter((vehicle) => {
                if (vehicle.brand.toLowerCase().includes(query.toLowerCase()) || vehicle.model.toLowerCase().includes(query.toLowerCase()) || vehicle.description.toLowerCase().includes(query.toLowerCase()) || vehicle.seatNo.includes(query)) {
                    return vehicle;
                }
            })
        }
    }
    tableBody.innerText = '';
    contentArea.innerText = '';


    if (vehicles.length === 0) {
        let row = document.createElement('tr')
        let cell = document.createElement('td');
        cell.setAttribute('colspan', 6);
        cell.innerText = 'no vehicles found';
        row.appendChild(cell)
        tableBody.appendChild(row);
    } else {
        for (const [index, vehicle] of vehicles.entries()) {
            let row = document.createElement('tr')
            let no = document.createElement('td');
            no.innerText = index + 1;
            let brand = document.createElement('td');
            brand.innerText = vehicle.brand;
            let model = document.createElement('td');
            model.innerText = vehicle.model;
            let description = document.createElement('td');
            description.innerText = vehicle.description;
            let capacity = document.createElement('td');
            capacity.innerText = vehicle.seatNo;
            let actions = document.createElement('td');
            actions.innerHTML =
                '<button class="primary button" onclick="openUpdateVehicleModal(' + vehicle.id + ')"><i class="fa fa-edit"></i></button>\n' +
                '<button class="alert button" onclick="deleteVehicle(' + vehicle.id + ')"><i class="fa fa-trash"></i></button>';
            row.appendChild(no);
            row.appendChild(brand);
            row.appendChild(model);
            row.appendChild(description);
            row.appendChild(capacity);
            row.appendChild(actions);
            tableBody.appendChild(row);


            let card = document.createElement('div')
            card.classList.add('card');
            let brandItem = document.createElement('p');
            brandItem.innerText = 'Brand '
            let brandName = document.createElement('span')
            brandName.innerText = vehicle.brand;
            brandItem.appendChild(brandName)
            let modelItem = document.createElement('p');
            modelItem.innerText = 'Model '
            let modelName = document.createElement('span')
            modelName.innerText = vehicle.model;
            modelItem.appendChild(modelName)
            let descriptionTitle = document.createElement('p');
            descriptionTitle.innerText = 'Description';
            let desc = document.createElement('p');
            desc.innerText = vehicle.description
            let divider = document.createElement('hr');
            let buttonSection = document.createElement('div')
            buttonSection.classList.add('button-section');
            buttonSection.innerHTML = '<button class="alert button" onclick="deleteVehicle(' + vehicle.id + ')"><i class="fa fa-trash"></i></button>\n' +
                '            <button class="primary button" onclick="openUpdateVehicleModal(' + vehicle.id + ')"><i class="fa fa-edit"></i></button>'

            card.appendChild(brandItem)
            card.appendChild(modelItem)
            card.appendChild(descriptionTitle)
            card.appendChild(desc)
            card.appendChild(divider)
            card.appendChild(buttonSection)
            contentArea.appendChild(card)

        }
    }
}

showVehicles();


function validateForm() {
    let brand = document.getElementById('brand');
    let brandValue = brand.value;
    let brandErrorMessage = document.getElementById('brandmsg');

    let model = document.getElementById('model');
    let modelValue = model.value;
    let modelErrorMessage = document.getElementById('modelmsg');

    let description = document.getElementById('description');
    let descriptionValue = description.value;
    let descErrorMessage = document.getElementById('descriptionmsg');

    let seatNo = document.getElementById('seatnumber');
    let seatNoValue = seatNo.value;
    let seatnoErrorMessage = document.getElementById('seatnumbermsg');

    if (!brandValue) {
        addErrorClasses(brand, brandErrorMessage);
    } else {
        removeErrorClasses(brand, brandErrorMessage)
    }

    if (!modelValue) {
        addErrorClasses(model, modelErrorMessage);
    } else {
        removeErrorClasses(model, modelErrorMessage)
    }

    if (!descriptionValue) {
        addErrorClasses(description, descErrorMessage);
    } else {
        removeErrorClasses(description, descErrorMessage);
    }

    if (!seatNoValue) {
        addErrorClasses(seatNo, seatnoErrorMessage);
    } else {
        removeErrorClasses(seatNo, seatnoErrorMessage)
    }

    if (brandValue && modelValue && descriptionValue && seatNoValue) {
        saveValue(brandValue, modelValue, descriptionValue, seatNoValue);
    }


}


function saveValue(brandValue, modelValue, descriptionValue, seatNoValue) {

    let vehicleId = document.getElementById('vehicleId').value;
    console.log(vehicleId);

    if (vehicleId) {
        let vehicles = JSON.parse(localStorage.getItem('vehicleList'));
        let newVehicles = vehicles.map((vehicle) => {
            if (vehicle.id == vehicleId) {
                return {
                    'id': vehicleId,
                    'brand': brandValue,
                    'model': modelValue,
                    'description': descriptionValue,
                    'seatNo': seatNoValue
                };
            }
            return vehicle;
        });
        localStorage.setItem('vehicleList', JSON.stringify(newVehicles))
    } else {
        let vehicle = {
            'id': Date.now(),
            'brand': brandValue,
            'model': modelValue,
            'description': descriptionValue,
            'seatNo': seatNoValue
        };
        if (localStorage.getItem('vehicleList') === null) {
            let vehicles = [];
            vehicles.push(vehicle);
            localStorage.setItem('vehicleList', JSON.stringify(vehicles))
        } else {
            let vehicles = JSON.parse(localStorage.getItem('vehicleList'));
            vehicles.push(vehicle);
            localStorage.setItem('vehicleList', JSON.stringify(vehicles));
        }
    }
    closeModal();
    showVehicles();
}


function addErrorClasses(inputElement, feedbackMsgElement) {
    inputElement.classList.add('is-invalid-input');
    feedbackMsgElement.classList.add('is-visible');
}

function removeErrorClasses(inputElement, feedbackMsgElement) {
    inputElement.classList.remove('is-invalid-input');
    feedbackMsgElement.classList.remove('is-visible');
}

function openUpdateVehicleModal(vehicleId) {
    let vehicles = JSON.parse(localStorage.getItem('vehicleList'));
    let vehicle = vehicles.find((vehicle) => parseInt(vehicle.id) === parseInt(vehicleId));
    document.getElementById('brand').value = vehicle.brand;
    document.getElementById('model').value = vehicle.model;
    document.getElementById('description').value = vehicle.description;
    document.getElementById('seatnumber').value = vehicle.seatNo;
    document.getElementById('vehicleId').value = vehicle.id;

    document.getElementById('modalTitle').innerText = 'Update Vehicle Details';
    document.getElementById('modalAddBtn').innerText = 'Update';

    openModal();
}

function deleteVehicle(vehicleId) {
    let result = confirm('Delete vehicle details?')
    if (result) {
        let vehicles = JSON.parse(localStorage.getItem('vehicleList'));
        vehicles = vehicles.filter((vehicle) => vehicle.id != vehicleId);
        localStorage.setItem('vehicleList', JSON.stringify(vehicles))
        showVehicles()
    }
}


//modal

var modal = document.getElementById('myModal');


function openModal() {
    modal.style.display = "block";
}


function closeModal() {
    document.getElementById('brand').value = '';
    document.getElementById('model').value = '';
    document.getElementById('description').value = '';
    document.getElementById('seatnumber').value = null;
    document.getElementById('vehicleId').value = null;

    document.getElementById('modalTitle').innerText = 'Add Vehicle';
    document.getElementById('modalAddBtn').innerText = 'Add';
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function mouseOverEvent() {
    alert('This is a vehicle listing site');
}

function onPageLoad() {
    alert('Good to see you!');
}

function onBeforeUnload() {
    return confirm('Do you wanna leave?');
}

let addButton = document.getElementById('addVehicle');
let addVehicleText = document.getElementById('addVehicleText');

addButton.addEventListener('mouseover', function () {
    addVehicleText.style.display = 'block';
})

addButton.addEventListener('mouseout', function () {
    addVehicleText.style.display = 'none';
})

const anEvent = new Event('start');

document.addEventListener('start', event => {
    loader.style.display = 'block';
})

let searchTxt = document.getElementById('searchTxt');
let loader = document.getElementById('loader');


searchTxt.addEventListener('keyup', function () {
    document.dispatchEvent(anEvent)
});


loader.addEventListener('mouseover', function () {
    loader.style.display = 'none';
});


let result = document.getElementById('result');

function firePromise() {
    const myPromise = new Promise((resolve, reject) => {
        let a = false;
        setTimeout(() => {
            return (a) ? resolve('a is found!') : reject('sorry, no a');
        }, 3000);
    });

    myPromise
        .then(value => {
            result.innerHTML = value.toString()
        })
        .catch(err => {
            result.innerHTML = err
        });
}

// var name = 'dennis';
//
// name = 34;
//
// console.log(name)

