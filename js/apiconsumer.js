document.getElementById("submit").addEventListener("click", callAPIs);

let nameField = document.getElementById("name");

nameField.onkeydown = function(e) {
    if(e.keyCode === 13) {
        callAPIs();
    }
}

function callAPIs() {
    
    let name = nameField.value;
    
    let urls = ["https://api.agify.io?name=" + name,
                "https://api.genderize.io?name=" + name,
                "https://api.nationalize.io/?name=" + name];

    let requests = new Array(urls.length);
    for(let i = 0; i < urls.length; i++) {
        requests[i] = new XMLHttpRequest();
        requests[i].open("GET", urls[i]);
        requests[i].onload = function () {
            let data = JSON.parse(requests[i].responseText);
            switch(i) {
                case 0:
                    document.getElementById("name-text").innerHTML = `You entered the name ${name}.`;
                    document.getElementById("age-text").innerHTML = `You have an expected age of ${data.age} years.`
                    break;
                case 1:
                    document.getElementById("gender-text").innerHTML = `You are most likely ${data.gender}.`;
                    break;
                case 2:
                    document.getElementById("nat-text").innerHTML = "";
                    data.country.forEach(country => {
                        fetch("https://restcountries.eu/rest/v2/alpha/" + country.country_id)
                            .then(response => response.json())
                            .then(json => {
                                document.getElementById("nat-text").innerHTML += `You are likely from ${json.name}<br>`
                                 + `<img src="https://www.countryflags.io/${country.country_id}/shiny/64.png"/><br>`;
                            });
                    });
                    break;
            }
        };
        requests[i].send();
        nameField.value = "";
        nameField.focus();
    }  

}