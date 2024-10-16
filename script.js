const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id')
const weight = document.getElementById('weight')
const height = document.getElementById('height')
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const specialAttack = document.getElementById('special-attack')
const specialDefense = document.getElementById('special-defense')
const speed = document.getElementById('speed')
const spriteContainer = document.getElementById('sprite-container')
const types = document.getElementById('types')

const searchPokemon = async () => {
  resetDisplay()
  // user input transformation
  const input = searchInput.value.replace(/\s/, '-')
    .replace(/♀/, '-f')
    .replace(/♂/, '-m')
    .replace(/[^\da-z-]/ig, '')
    .toLowerCase()

  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${input}`

  try {
    // get json data
    const res = await fetch(url)
    // convert json data into js object
    const data = await res.json()

    // set pokemon info and stats
    pokemonName.textContent = data.name.toUpperCase()
    pokemonId.textContent = `#${data.id}`
    weight.textContent = `Weight: ${data.weight}`
    height.textContent = `Height: ${data.height}`
    hp.textContent = data.stats[0].base_stat
    attack.textContent = data.stats[1].base_stat
    defense.textContent = data.stats[2].base_stat
    specialAttack.textContent = data.stats[3].base_stat
    specialDefense.textContent = data.stats[4].base_stat
    speed.textContent = data.stats[5].base_stat

    // create image
    const img = document.createElement('img')
    img.id = 'sprite'
    img.src = data.sprites.front_default
    spriteContainer.appendChild(img)

    // set pokemon types
    types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`)
      .join('')
  } catch (err) {
    resetDisplay()
    alert('Pokémon not found')
    console.log(`Pokémon not found: ${err}`);
  }
}

const resetDisplay = () => {
  pokemonName.textContent = ''
  pokemonId.textContent = ''
  weight.textContent = ''
  height.textContent = ''
  spriteContainer.innerHTML = ''
  types.innerHTML = ''
  hp.textContent = ''
  attack.textContent = ''
  defense.textContent = ''
  specialAttack.textContent = ''
  specialDefense.textContent = ''
  speed.textContent = ''
}

searchBtn.addEventListener('click', event => {
  event.preventDefault()
  searchPokemon()
})
