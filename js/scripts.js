const params = new URLSearchParams(window.location.search)
const page = params.get('page')

const url = `https://swapi.dev/api/people?page=${page}`

let fetchConfig = {
    method: "GET"
}

function getApi(url){
    fetch(url, fetchConfig)
        .then(response => {
            response.json()
            .then(people => {
                getInfos(people.results)
            })
        }
    )}
        

function getInfos(people){
    for (let i = 0; i < people.length; i++) {
        var namePerson = people[i].name;

        var info = document.createElement("div")
        info.classList.add("info")
        info.setAttribute("name", namePerson)
        
        let namePeople = document.createElement("div")
        namePeople.classList.add("namePeople")
        namePeople.innerHTML = `<span>${namePerson}</span>`

        info.appendChild(namePeople)
        let container = document.querySelector(".container")
        container.appendChild(info)
        
    } 
}
getApi(url)