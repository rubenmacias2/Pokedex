const inputSearch = document.getElementById("inputPokemon");
const image = document.getElementById("pokeImg");
const pokeType = document.getElementById("pokeType");
const titleName = document.getElementById("name");
const pokeId = document.getElementById("pokeId");
const pokestats = document.getElementById("pokeStats");

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const serachPokemon = event => {
    event.preventDefault();
    inputSearch.value.length > 0 
    ? fetch(`https://pokeapi.co/api/v2/pokemon/${inputSearch.value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemon(response)).catch(err => renderNotFound())
    : emtyinput();
}

const renderPokemon= data => {
    const {stats,types}= data;
    titleName.innerHTML = data.name;
    pokeId.innerHTML = "Id: " + data.id + "°";
    image.src = data.sprites.front_default;
    pokeCard(types);
    colorBackImag(types);
    divpokestats(stats);
}

const pokeCard = types => {
    pokeType.innerHTML = "";
    types.forEach(type => {
        const divPoketype = document.createElement("div");
        divPoketype.style.color = typeColors[type.type.name];
        divPoketype.textContent = type.type.name;
        pokeType.appendChild(divPoketype);
    });
}

const colorBackImag = types => {
    const color1 = typeColors[types[0].type.name];
    const color2 = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    image.style.background = `radial-gradient(${color2} 33%, ${color1} 33%)`;
    image.style.backgroundSize = '5px 5px';
}
const divpokestats = stats =>{
    pokestats.innerHTML = "";
    stats.forEach(stat =>{
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.innerHTML = stat.stat.name;
        statElementAmount.innerHTML = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokestats.appendChild(statElement); 
    });
}

const renderNotFound = () => {
    const quest = document.createElement("div");
    const rest = document.createElement("h3");
    titleName.innerHTML="";
    quest.innerHTML = "¿Quien es ese Pokemon?";
    rest.innerHTML = "FUCK!!!!";
    rest.style.fontWeight = "bold";
    rest.style.color = "red";
    image.setAttribute("src","img/poke-shadow.png");
    image.style.background = "#fff";
    pokeType.innerHTML = "";
    titleName.appendChild(quest);
    titleName.appendChild(rest);
    pokeId.innerHTML ="";
    pokestats.innerHTML="";
}

const emtyinput = () =>{
    const quest = document.createElement("div");
    const rest = document.createElement("h4");
    titleName.innerHTML="";
    quest.innerHTML = "¿Quien es ese Pokemon?";
    rest.innerHTML = "No se a digitado el Pokemon";
    rest.style.fontWeight = "bold";
    rest.style.color = "blue";
    image.setAttribute("src","img/poke-shadow.png");
    image.style.background = "#fff";
    pokeType.innerHTML = "";
    titleName.appendChild(quest);
    titleName.appendChild(rest);
    pokeId.innerHTML ="";
    pokestats.innerHTML="";
} 