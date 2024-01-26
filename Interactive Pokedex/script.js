
const backButton = document.getElementById("left-button")
const forwardButton = document.getElementById("right-button");
const movesButton = document.getElementById("moves-button");
const infoButton = document.getElementById("info-button");
const pokemonPicture = document.getElementById("pokemon-image");
const pokemonName = document.getElementById("pokemon-name");
const pokemonInfo = document.getElementById("info");
const infoheader = document.getElementById("info-header");
const pokemonTypes = document.getElementById("types");

let pokemonNumber = 1;
let display = "info";

updateContent(pokemonNumber);

movesButton.addEventListener('click', () => {
    movesButton.style.backgroundColor = "#7CFF79";
    infoButton.style.backgroundColor = "#E8E8E8";
    display = "moves"
    updateContent(pokemonNumber)
})

infoButton.addEventListener('click', () => {
    infoButton.style.backgroundColor = "#7CFF79";
    movesButton.style.backgroundColor = "#E8E8E8";
    display = "info"
    updateContent(pokemonNumber)
})

forwardButton.addEventListener('click', () => {
    pokemonNumber += 1;
    if (pokemonNumber > 1017) {
        pokemonNumber = 1;
    }
    updateContent(pokemonNumber);
})

backButton.addEventListener('click', () => {
    if (pokemonNumber > 1) {
        pokemonNumber -= 1;
        updateContent(pokemonNumber);
    }
})

let colorKeys = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
  }

async function updateContent(pokemonNumber) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
    const data = await response.json();

    pokemonName.textContent = data.name;
    pokemonPicture.src = data.sprites.front_default

    pokemonTypes.innerHTML = '';
    for (let i = 0; i < data.types.length; i++) {
        t = document.createElement("p");
        t.innerHTML = data.types[i].type.name;
        t.style.backgroundColor = colorKeys[data.types[i].type.name];
        pokemonTypes.appendChild(t)
    }

    if (display === "info") {
        infoheader.textContent = "Info";
        pokemonInfo.innerHTML = '';
        pokemonInfo.innerHTML = `<p>height: ${(data.height / 10).toFixed(1)} m</p>
        <p>weight: ${(data.weight / 10).toFixed(1)} kg</p>
        <p>hp: ${data.stats[0].base_stat}</p>
        <p>attack: ${data.stats[1].base_stat}</p>
        <p>defense: ${data.stats[2].base_stat}</p>
        <p>special-attack: ${data.stats[3].base_stat}</p>
        <p>special-defense: ${data.stats[4].base_stat}</p>
        <p>speed: ${data.stats[5].base_stat}</p>`;
    }

    if (display === "moves") {
        infoheader.textContent = "Moves";
        pokemonInfo.innerHTML = '';
        for (let i = 0; i < 10; i++) {
            p = document.createElement("p")
            p.innerHTML += data.moves[i].move.name + '<br>'
            pokemonInfo.appendChild(p);
        }
    }

}
