const fs = require('fs');
const path = require('path');

// var text = fs.readFileSync('E:/Repos/electron-quick-start/zcrm_oauthtokens.txt', 'utf8');

const zcrmsdk = require('zcrmsdk');
// const test_module = require('./file_persistence.js');

// console.log(test_module.PI);
console.log('OK');
var config = {
    "client_id": "1000.BUFGCCXG6O7Y4KNBHKK8QAFYF7WP1V",
    "client_secret": "80b9335a7fbe8496e65d98014f13d639e1cc262ee3",
    "redirect_uri": "https://www.thealiens.org",
    // "refresh_token": "1000.6957e5e043f65b0435ef3117964d1ba8.0cad71154842d0ec85420b12c2c61d5c",
    // "iamurl": "optional {string}",
    // "base_url": "optional {string}",
    "user_identifier": "akash@thealiens.org",
    // "mysql_module": "optional {string}",
    // "mysql_username": "optional {string}",
    // "mysql_password": "optional {string}
};

var user_identifier = 'akash@thealiens.org';
var grant_token = '1000.ba237411757dbc934222b9ff8893cd72.adbd23ce82fd8671f5d37ce54063fbe1'; //is the spontaenous code generated from self client
// var refresh_token;
// zcrmsdk.setClientId(config.client_id);
// zcrmsdk.setClientSecret(config.client_secret);
// zcrmsdk.setRedirectURL(config.redirect_uri);
// zcrmsdk.setUserIdentifier(config.user_identifier);
zcrmsdk.setBaseURL('www.zohoapis.in');
zcrmsdk.initialize();
console.log('initialized');

var data;
var input = {};
input.module = "Leads";
var params = {};
params.page = 0;
params.per_page = 5;
input.params = params;
zcrmsdk.API.MODULES.get(input).then(function (response) {
    var result = "Leads";
    data = response.body;
    console.log(data);
    data = JSON.parse(data);
    // data = data.data ;
    /* for (i in data) {
        var record = data[i];
        var name = record.Full_Name;
        result += "" + name + "";
    }
    result += ""; */
    addListeners();
    clearTable();
    populateTable(data.data, {
        Full_Name: 'Full Name',
        Email: 'Email',
        Phone: 'Phone'
    });
}).catch(function (error) {
    console.log(error);
});




function populateTable(records, keys) {
    if (!Array.isArray(records)) {
        records = records.data;
    }
    mainTable = document.getElementById('maintable');
    thead = document.createElement('thead');
    tr = document.createElement('tr');
    for (const [key, value] of Object.entries(keys)) {
        var th = document.createElement('th');
        th.textContent = value;
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    mainTable.appendChild(thead);


    tbody = document.createElement('tbody');
    /*   for (const [key, value] of Object.entries(records)) {
          var td = document.createElement('td');
          td.textContent = value;
          tr.appendChild(td);
      } */
    for (var record of records) {
        tr = document.createElement('tr');

        var td = document.createElement('td');
        td.textContent = record.Full_Name;
        tr.appendChild(td);

        var td = document.createElement('td');
        td.textContent = record.Email;
        tr.appendChild(td);

        var td = document.createElement('td');
        td.textContent = record.Phone;
        tr.appendChild(td);

        thead.appendChild(tr);
    }

    mainTable.appendChild(tbody);



}

function clearTable() {
    var mainTable = document.getElementById('maintable');
    var first = mainTable.firstElementChild;
    while (first) {
        first.remove();
        first = mainTable.firstElementChild;
    }
}

function addListeners() {
    var searchButton = document.getElementById('searchbutton');
    searchButton.addEventListener('click', onSearchClick);
    document.getElementById('emailsearch').addEventListener('click', onEmailSearch);
    document.getElementById('phonesearch').addEventListener('click', onPhoneSearch);
    document.getElementById('namesearch').addEventListener('click', onNameSearch);
}

function onSearchClick(type) {
    var searchBar = document.getElementById('searchbar');
    var value = searchBar.value;
    var promises = [];
    var data;
    var input = {};
    
    input.module = "Leads";
    var params = {};
    params.criteria = 'Email:contains:t';
    input.params = params;
    // promises.push(zcrmsdk.API.MODULES.search(input));


    zcrmsdk.API.MODULES.search(input).then(function (response) {
        data = response.body;
        console.log(data);
        data = JSON.parse(data);
        clearTable();
        populateTable(data, {
            Full_Name: 'Full Name',
            Email: 'Email',
            Phone: 'Phone'
        });
    }).catch(function (error) {
        console.log(error);
    });
    


}

function onEmailSearch() {

}

function onPhoneSearch() {

}

function onNameSearch() {

}

