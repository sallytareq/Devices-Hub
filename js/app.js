'use strict';

let devices = [];
let allDevices = [];
let sum;

function Devices(name, quantity, category) {
  this.name = name;
  this.quantity = Number(quantity);
  this.price = Number(getRandomIntInclusive(350, 750));
  this.total = this.quantity*this.price;
  this.category = category;

  devices.push(this);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function store() {
  const string = JSON.stringify(devices);
  const storeString = localStorage.setItem('Devices', string);
}
function retrieve() {
  const storedString = localStorage.getItem('Devices');
  const array = JSON.parse(storedString);

  if (array !== null){
    for (let i = 0; i < array.length; i++) {
      new Devices(array[i].name, array[i].quantity, array[i].category);
    }
  }
}

const resultsSection = document.getElementById('results');

function render() {
  const table = document.createElement('table');
  resultsSection.appendChild(table);
  table.setAttribute('id', 'table')
  const headerRow = document.createElement('tr');
  table.appendChild(headerRow);
  const nameTh = document.createElement('th');
  headerRow.appendChild(nameTh);
  nameTh.textContent = 'Device Name';
  const quantityTh = document.createElement('th');
  headerRow.appendChild(quantityTh);
  quantityTh.textContent = 'Quantity';
  const priceTh = document.createElement('th');
  headerRow.appendChild(priceTh);
  priceTh.textContent = 'Unit Price';
  const categoryTh = document.createElement('th');
  headerRow.appendChild(categoryTh);
  categoryTh.textContent = 'Category';

  for (let i = 0; i < devices.length; i++) {
    const dataRow = document.createElement('tr');
    table.appendChild(dataRow);
    const nameTd = document.createElement('td');
    dataRow.appendChild(nameTd);
    nameTd.textContent = devices[i].name;
    const quantityTd = document.createElement('td');
    dataRow.appendChild(quantityTd);
    quantityTd.textContent = devices[i].quantity;
    const priceTd = document.createElement('td');
    dataRow.appendChild(priceTd);
    priceTd.textContent = devices[i].price;
    const categoryTd = document.createElement('td');
    dataRow.appendChild(categoryTd);
    categoryTd.textContent = devices[i].category;
  }

  const totalEl = document.createElement('h3');
  resultsSection.appendChild(totalEl);
  totalEl.setAttribute('id', 'total');
  totalEl.textContent = 'Total: ' + total();
}
retrieve();
render();

const form = document.getElementById('form');

form.addEventListener('submit', submitHandler);

function submitHandler(event) {
  event.preventDefault();
  const table = document.getElementById('table');
  const total = document.getElementById('total');
  if (devices.length !== null){
    table.remove();
    total.remove();
  }

  const name = document.getElementById('name').value;
  const quantity = document.getElementById('quantity').value;
  const categoryList = document.getElementById('category');
  const input = categoryList.selectedIndex;
  const category = categoryList[input].text;

  new Devices(name, quantity, category);


  render();
  store();
  // form.reset();
  form.removeEventListener('submit', submitHandler);
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  });
}

function total() {
  for (let i = 0; i < devices.length; i++) {
    // let x = Number(devices[i].quantity) * Number(devices[i].price);
    sum += devices[i].total;
  }
  return sum;
}

