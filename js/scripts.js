const url = `https://swapi.dev/api/people/?page=1`
const container = document.querySelector(".container")

let fetchConfig = {
    method: "GET"
}

function getApi(url){
    fetch(url, fetchConfig)
        .then(response => response.json()) 
        .then(resp=> resp.results.forEach(people => {
            getInfos(people.name)
            })
            .catch(error => {console.log(error)})
        .catch(error => {console.log(error)})
)}

function getInfos(people){
    var info = document.createElement("div")
    info.classList.add("info")
    info.setAttribute("name", people)
     
    let namePeople = document.createElement("div")
    namePeople.classList.add("namePeople")
    namePeople.innerHTML = `<span>${people}</span>`





    info.appendChild(namePeople)
    console.log(info)

}

getApi(url)