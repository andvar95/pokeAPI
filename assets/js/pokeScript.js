//POKE_URL
const POKE_URL = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=00`;
pagNum = 0;

//CONSUMIR api

const getData = (POKE_URL) => {
  return fetch(POKE_URL)
    .then((response) => response.json())
    .then((json) => {
      drawData(json.results);
      paginacion(json.previous, json.next, json.count);
    })
    .catch((error) => console.log(error));
};

const getPokeDetail = (Poke_url) => {
  return new Promise((resolve, reject) => {
    fetch(Poke_url)
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => reject(error));
  });
};

const drawData = async (pokeData) => {
  let html = "";
  //geting all promises 
  const promesas = pokeData.map(
    async (pokePromesas) => await getPokeDetail(pokePromesas.url)
  );
  //geting waiting for all promises 
  const pokeDetail = await Promise.all(promesas);

  //draswing the pokemon
  pokeDetail.forEach((el) => {
    html += `
    <div class="col-md-4 mb-5">
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${el.sprites.front_default}" alt="Card image cap">
        <div class="card-body">
    <h5 class="card-title">${el.name}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Weight ${el.weight}</li>
    <li class="list-group-item">Height ${el.height}</li>

  </ul>
</div>
</div>`;
  });

  document.getElementById("pokeData").innerHTML = html;
};

const paginacion = (prev, next, count) => {
  let html = `<li class="page-item ${prev ? "" : "disabled"}">
    <a class="page-link" onclick="getData('${prev}')"> &lsaquo; </a> </li>
    <li class="page-item ${next ? "" : "disabled"}"> 
    <a class="page-link" onclick="getData('${next}')"> &rsaquo;</a></li>`;

  document.getElementById("paginacion").innerHTML = html;
};

getData(POKE_URL);
