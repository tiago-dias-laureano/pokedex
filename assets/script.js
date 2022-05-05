let ulWrapper = document.querySelector('.content-poke-ul')
let loaderWrapper = document.querySelector('.loader')
let searchInputWrapper = document.getElementById('search-poke')

let listPoke = []
let html = ''
let filter = 150

function showError(erro){
    return `<li class="li-items"><h3 class="name-poke-error">${erro}</h3></li>`
}

function loaderDisplay(action){
    loaderWrapper.style.display = action
}

async function fetchData(urlToFetch){
    return await fetch(urlToFetch).then(function(response){
        if(response.status == 200) {
            return response.json()
        }else{
            return false
        }
    })
}

function listGenerator(imgId, namePokeInfo){
    return `
        <li class="li-items">
            <img src="https://cdn.traction.one/pokedex/pokemon/${imgId}.png" class="img-poke" alt="" srcset="">
            <h3 class="name-poke">${namePokeInfo}</h3>
            <button class="btn-info-poke">Saber mais</button>
        </li>`
}

async function getPokeList(){
    try{
        for(let i=1; i <= filter; i++){
            let response = await fetchData(`https://pokeapi.co/api/v2/pokemon/${i}`)
            if(response){
                listPoke.push(response)
            }else{
                html = showError('Impossível se conectar com a api.')
                break
            }
        }
        for(let i=0; i <= listPoke.length; i++){
            html += listGenerator(i+1, listPoke[i].forms[0].name)
        }
    }catch{}
    ulWrapper.innerHTML = html
    loaderDisplay('none')
}

async function getPokeByName(){
    let searchPokeWrapper = document.getElementById('search-poke').value
    let liItems = document.querySelectorAll('.li-items')

    liItems.forEach(pokemon => { 
        const pokeName = pokemon.querySelector('.name-poke').textContent.toLowerCase()
            
        if (pokeName.includes(searchPokeWrapper)){
            pokemon.style.display = 'flex'
            return
        }
        pokemon.style.display = 'none'
    })
}

searchInputWrapper.addEventListener('input', getPokeByName)

getPokeList()