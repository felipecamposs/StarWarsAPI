const container = document.querySelector(".container")
const params = new URLSearchParams(window.location.search)
const page = params.get('page')
const url = `https://swapi.dev/api/people`
const btnAll = document.querySelector('#btn-all')
const search = document.querySelector('#search')
var linkNext = ''
var linkPrevious = ''
var contagem = ''
var backgroundImage = ''

function getImageBackground(){
    fetch("./py/tweet.json")
        .then(response => {
            return response.json();
        })
            .then(returnJson => {
                backgroundImage = returnJson.url_image
                console.log(backgroundImage)
            })
        }
    
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


btnAll.addEventListener('click', listAllBtn)
search.setAttribute('hidden', true)

function listAllBtn(){
    container.innerHTML = ''
    search.removeAttribute('hidden')
    for (personagemID = 1; personagemID <= contagem; personagemID++) {
        let urlid = `https://swapi.dev/api/people/${personagemID}`
        getApiAll(urlid)
        } 
        
    }

function getApiAll(urlid){
        let fetchConfig = {
            method: "GET"
        }
    
        fetch(urlid, fetchConfig)
            .then(response => {
                response.json()
                .then(people => {
                    listAll(people)
                })
            }
        )}    

function listAll(people){
    var data = {
        name: people.name,
        height: people.height,
        hair_color: people.hair_color,
        skin_color: people.skin_color,
        eye_color: people.eye_color,
        birth_year: people.birth_year
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
search.addEventListener('input', filterSearch);

function filterSearch(){
    const filter = search.value.toLowerCase();
    const filterAll = container.querySelectorAll('.info')
    
    filterAll.forEach((jedis) => {
        let text = jedis.getAttribute("name");
        if(text.toLocaleLowerCase().includes(filter.toLowerCase())){
            jedis.style.display = '';
        }
        else{
            jedis.style.display = 'none';
        }
    })
}

function setButtons(people){
    
    var returnAPI = {
        count: people.count,
        next: people.next,
        previous: people.previous,
        results: people.results
    }
    
    contagem = returnAPI.count
    let htmlButtons = document.querySelector(".buttons")
    
    linkNext = returnAPI.next
    linkPrevious = returnAPI.previous
    
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

        let divCard = document.createElement("div")
        divCard.classList.add("card")
        divCard.setAttribute("class", 'card')

        // let img = document.createElement("img")
        // img.classList.add("img")
        // img.setAttribute('src', "./css/add/photo.jpg")
    
        let divDados = document.createElement("div")
        divDados.classList.add("dadosCard")
        divDados.setAttribute("class", "dadosCard")

        info.appendChild(divCard)
        // info.appendChild(img)
        info.appendChild(divDados)

        let container = document.querySelector(".container")
        container.appendChild(info)     
    } 
}

function cleanContainer(){
    let container = document.querySelector('.container')
    container.innerHTML = ''
}

getApi(url)
