const container = document.querySelector(".container")
const params = new URLSearchParams(window.location.search)
const page = params.get('page')
const url = `https://swapi.dev/api/people`
var linkNext = ''
var linkPrevious = ''

function getApi(url){
    let fetchConfig = {
        method: "GET"
    }

    fetch(url, fetchConfig)
        .then(response => {
            response.json()
            .then(people => {
                setButtons(people)
            })
        }
    )}

function setButtons(people){
    
    var returnAPI = {
        count: people.count,
        next: people.next,
        previous: people.previous,
        results: people.results
    }
    
    let htmlButtons = document.querySelector(".buttons")
    
    linkNext = returnAPI.next
    linkPrevious = returnAPI.previous
    
    console.log(linkNext, linkPrevious)
    htmlButtons.innerHTML = '<input type="button" value="next" id="linkNext" onclick="getApi(linkNext);cleanContainer();"> <br> <input type="button" value="previous" id="linkPrevious" onclick="getApi(linkPrevious);cleanContainer();">'

    if (linkNext === null ){
        document.getElementById('linkNext').style.display = "none";
    }

    if (linkPrevious === null ){
        document.getElementById('linkPrevious').style.display = "none";
    }

    getInfos(returnAPI.results)
}


function getInfos(people){
    for (let i = 0; i < people.length; i++) {
        var data = {
            name: people[i].name,
            height: people[i].height,
            hair_color: people[i].hair_color,
            skin_color: people[i].skin_color,
			eye_color: people[i].eye_color,
			birth_year: people[i].birth_year
        }
        
        var info = document.createElement("div")
        info.classList.add("info")
        info.setAttribute("name", data.name)
        
        ///////
        let name = document.createElement("span")
        name.classList.add("name")
        name.innerHTML = `Nome: ${data.name}`

        let height = document.createElement("span")
        height.classList.add("height")
        height.innerHTML = `Altura: ${data.height}`
        
        let hair_color = document.createElement("span")
        hair_color.classList.add("hair_color")
        hair_color.innerHTML = `Cabelo: ${data.hair_color}`

        let skin_color = document.createElement("span")
        skin_color.classList.add("skin_color")
        skin_color.innerHTML = `Cor do cabelo: ${data.skin_color}`

        let eye_color = document.createElement("span")
        eye_color.classList.add("eye_color")
        eye_color.innerHTML = `Cor olhos: ${data.eye_color}`

        let birth_year = document.createElement("span")
        birth_year.classList.add("birth_year")
        birth_year.innerHTML = `Data de nascimento: ${data.birth_year}`
        ///////

        info.appendChild(name)
        info.appendChild(height)
        info.appendChild(hair_color)
        info.appendChild(skin_color)
        info.appendChild(eye_color)
        info.appendChild(birth_year)

        let container = document.querySelector(".container")
        container.appendChild(info)
        
    } 
}

//// FAZER TODOS --- 
// function listAllPeople(){
//     let container = document.querySelector('.container')
//     container.innerHTML = ''
    
//     for (let i = 1; i < 10; i++) {
//         num = i
//         let urlTodos = `https://swapi.dev/api/people/?page=${num}`
//         getApi(urlTodos)
//     }
// }

function cleanContainer(){
    let container = document.querySelector('.container')
    container.innerHTML = ''
}
getApi(url)
