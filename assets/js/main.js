const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <a href="javascript:;" onmousedown="toggleDiv('${pokemon.number}');">
            expandir</a>
          
            
            <div id="${pokemon.number}" style="display:none">
            Habilidades:
            <ol class="types">
            ${pokemon.abilities.map((ability) => `<li class="type ${ability}">${ability}</li>`).join('')}
        </ol>

            <span>Peso:${pokemon.weight}00g</span>
            </br>
            <span>Altura:${pokemon.height}0cm</span>
            </br>
            <span>Experiencia Base:${pokemon.base_experience}</span>
            </div>
        </li>
    `
}

//div expansível   
function toggleDiv(divid){
    if(document.getElementById(divid).style.display == 'none'){
      document.getElementById(divid).style.display = 'block';
     
    }else{
      document.getElementById(divid).style.display = 'none';
    }
  }

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')//mapeia os pokemons - converte em lista e os junta
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})