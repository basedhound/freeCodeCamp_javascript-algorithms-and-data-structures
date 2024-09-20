// Dom
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const pName = document.getElementById('pokemon-name');
const pId = document.getElementById('pokemon-id');
const sprite = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// Fetch
const getPokemon = async () => {
  try {
    const nameOrId = searchInput.value.toLowerCase();
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
    );
    const data = await res.json();

    // Hydrate infos
    
    pName.textContent = data.name?.toUpperCase() || 'N/A';
    pId.textContent = `#${data.id || 'N/A'}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    sprite.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default || ''}" alt="${data.name} front sprite">
    `;

    // Hydrate stats
    const [hpStat, atk, def, spAtk, spDef, spd] = data.stats;
    hp.textContent = hpStat.base_stat;
    attack.textContent = atk.base_stat;
    defense.textContent = def.base_stat;
    specialAttack.textContent = spAtk.base_stat;
    specialDefense.textContent = spDef.base_stat;
    speed.textContent = spd.base_stat;

  // Hydrate types
    types.innerHTML = data.types
      .map(({ type }) => `<span class="type">${type.name}</span>`)
      .join('');
  } catch (err) {
    remove();
    alert('Pokémon not found');
  }
};

// CLEAN
const remove = () => {
  document.getElementById('sprite')?.remove();
  
  // Reset stats
  [pName, pId, height, weight, hp, attack, defense, specialAttack, specialDefense, speed].forEach(el => el.textContent = '');
  types.innerHTML = '';
};

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  getPokemon();
  searchForm.reset();  // Clears the input field after submission
});