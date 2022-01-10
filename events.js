import fetch from 'cross-fetch';
function getData() {
    // let tableBody = document.getElementById('vehicleListing');
    const fetchPromise = fetch("https://ghibliapi.herokuapp.com/people");
    fetchPromise.then(response => {
        return response.json();
    }).then(people => {
        for (const person of people) {
            console.log(person);
            // let row = document.createElement('tr')
            // let id = document.createElement('td');
            // id.innerText = person.id;
            // let name = document.createElement('td');
            // name.innerText = person.name;
            // let gendar = document.createElement('td');
            // gendar.innerText = person.gender;
            // let age = document.createElement('td');
            // age.innerText = person.age;
            // let eye_color = document.createElement('td');
            // eye_color.innerText = person.eye_color;
            // let hair_color = document.createElement('td');
            // hair_color.innerText = person.hair_color;
            // let actions = document.createElement('td');
            // actions.innerHTML =
            //     '<button class="primary button" onclick="openUpdateVehicleModal(' + vehicle.id + ')"><i class="fa fa-edit"></i></button>\n' +
            //     '<button class="alert button" onclick="deleteVehicle(' + vehicle.id + ')"><i class="fa fa-trash"></i></button>';
            // row.appendChild(id);
            // row.appendChild(name);
            // row.appendChild(gendar);
            // row.appendChild(age);
            // row.appendChild(eye_color);
            // row.appendChild(hair_color);
            // row.appendChild(actions);
            // tableBody.appendChild(row);
        }
    });
}

getData();