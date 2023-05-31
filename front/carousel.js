var data
const xhr = new XMLHttpRequest();


// recupere la premiere page des mieux note
xhr.open('GET', "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", true);
xhr.onload = function() {
  if (xhr.status === 200) {
    data = JSON.parse(xhr.responseText)
    var listeMeilleurFilm = data.results
    meilleurFilm(listeMeilleurFilm)
  }
}
xhr.send();


const divMeilleurFilm = document.querySelector('.meilleurFilm')

function meilleurFilm(listeMeilleurFilm){
  film = listeMeilleurFilm.shift()
  // recupere plus d'info sur le premier pour en afficher plus
  xhr.open('GET', "http://localhost:8000/api/v1/titles/"+film.id, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText)
      // recupere les info et les affiche
      divMeilleurFilm.querySelector(".imageMeil").src = data.image_url
      divMeilleurFilm.querySelector(".titreMeil").innerHTML = data.title
      divMeilleurFilm.querySelector(".descMeil").innerHTML = data.description
      // creer le lien avec la div et la modale
      clickmodale(divMeilleurFilm, film)
      // commence les carousel
      carouMeilleursFilms(listeMeilleurFilm, 0)
    }
  }
  xhr.send();
}

function deuxiemeCarou(){
  // carousel des meilleurs film d'action, premiere page, il y en a 5 par pages
  xhr.open('GET', "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score", true);
  xhr.onload = function() {
  if (xhr.status === 200) {
    data = JSON.parse(xhr.responseText)
    listeMeilleurFilm = data.results
    carouMeilleursFilms(listeMeilleurFilm, 1)
  }
}
xhr.send();
}

function troisiemeCarou(){
  // carousel des meilleurs film d'action, premiere page, il y en a 5 par pages
  xhr.open('GET', "http://localhost:8000/api/v1/titles/?genre=romance&sort_by=-imdb_score", true);
  xhr.onload = function() {
  if (xhr.status === 200) {
    data = JSON.parse(xhr.responseText)
    listeMeilleurFilm = data.results
    carouMeilleursFilms(listeMeilleurFilm, 2)
  }
}
xhr.send();
}

function quatriemeCarou(){
  // carousel des meilleurs film d'action, premiere page, il y en a 5 par pages
  xhr.open('GET', "http://localhost:8000/api/v1/titles/?genre=biography&sort_by=-imdb_score", true);
  xhr.onload = function() {
  if (xhr.status === 200) {
    data = JSON.parse(xhr.responseText)
    listeMeilleurFilm = data.results
    carouMeilleursFilms(listeMeilleurFilm, 3)
  }
}
xhr.send();
}

// const itemMeilFilms = document.querySelectorAll(".itemMeilFilm")

function carouMeilleursFilms(listeMeilleurFilm, carouselvoulu){
  // setup les variable selon le carousel
  if (carouselvoulu==0){
    nomdivun = "mieuxnote"
    nomitem = "itemMeilFilm"
    lien = "http://localhost:8000/api/v1/titles/?page=2&sort_by=-imdb_score"
    nomcate = "Meilleur film"
  }else if (carouselvoulu==1){
    nomdivun = "action"
    nomitem = "itemaction"
    lien = "http://localhost:8000/api/v1/titles/?genre=action&page=2&sort_by=-imdb_score"
    nomcate = "Meilleur film d'action"
  }else if (carouselvoulu==2){
    nomdivun = "romance"
    nomitem = "itemromance"
    lien = "http://localhost:8000/api/v1/titles/?genre=romance&page=2&sort_by=-imdb_score"
    nomcate = "Meilleur film de romance"
  }else if (carouselvoulu==3){
    nomdivun = "biography"
    nomitem = "itembiography"
    lien = "http://localhost:8000/api/v1/titles/?genre=biography&page=2&sort_by=-imdb_score"
    nomcate = "Meilleur film biographique"
  }
  // va chercher la deuxieme page pour en avoir 7
  xhr.open('GET', lien, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText)
      // pour le meilleur film le premier de la premiere page est deja afficher
      // donc ne l'affiche pas et en prends un de plus dans la deuxieme page
      if(carouselvoulu==0){
        listeMeilleurFilm.push(data.results[0], data.results[1], data.results[2])
      }else{
        listeMeilleurFilm.push(data.results[0], data.results[1])
      }
      i = 0
      // creer les different elements du carousel et les setup
      const divUn = document.createElement("div")
      divUn.className = nomdivun
      const divDeux = document.createElement("div")
      divDeux.className = "carousel"
      const divTrois = document.createElement("div")
      divTrois.className = "carousel-container"
      flecheGauche = document.createElement("div")
      flecheGauche.className = "flecheGauche"
      flecheGauche.innerHTML = "&#10094;";
      divTrois.appendChild(flecheGauche)
      let divQuatre
      let img
      let text
      let divtext
      for (const film of listeMeilleurFilm){
        divQuatre = document.createElement("div")
        // numero dans les class pour connaitre leurs place dans le carousel pour les placer en css
        if (i==0){
          divQuatre.className = nomitem+" un"
        }else if (i==1){
          divQuatre.className = nomitem+" deux"
        }else if (i==2){
          divQuatre.className = nomitem+" trois"
        }else if (i==3){
          divQuatre.className = nomitem+" quatre"
        }else{
          divQuatre.className = nomitem+" cache"
        }
        img = document.createElement("img")
        img.setAttribute('src', film.image_url)
        img.setAttribute('alt', "film "+i)
        img.className = "imgCarou"
        divtext = document.createElement("div")
        divtext.className = "divtitleCarou"
        text = document.createElement("p")
        text.className = "titleCarou"
        text.innerHTML = film.title
        divtext.appendChild(text)
        divQuatre.appendChild(divtext)
        divQuatre.appendChild(img)
        clickmodale(divQuatre,film)
        divTrois.appendChild(divQuatre, film)
        i++
      }
      flecheDroite = document.createElement("div")
      flecheDroite.className = "flecheDroite"
      flecheDroite.innerHTML = "&#10095;";
      divTrois.appendChild(flecheDroite)
      divDeux.appendChild(divTrois)
      divUn.appendChild(divDeux)
      // nom des carousel 
      pnomcate = document.createElement("p")
      pnomcate.className="nomcate"
      pnomcate.innerHTML=nomcate
      document.body.appendChild(pnomcate)
      document.body.appendChild(divUn)
      // les fonction clicl pour les fleches pour faire defiler le carousel
      ajoutlistenerBack(flecheGauche, carouselvoulu)
      ajoutlistenerNext(flecheDroite, carouselvoulu)
      // appel de l'autre carousel jusqu'en avoir 3
      if (carouselvoulu==0){
        deuxiemeCarou()
      }else if (carouselvoulu==1){
        troisiemeCarou()
      }else if (carouselvoulu==2){
        quatriemeCarou()
      }
    }
  }
  xhr.send();
}

let c_meil = [0, 0, 0, 0]
let itemMeilFilm
// fonction pour les fleches
function ajoutlistenerBack(b_meil_Back, num) {
  // on click
  b_meil_Back.addEventListener('click', () => {
    // regarde le carousel a qui il appartient
    if(num==0){
      qui = "itemMeilFilm"
    }else if (num==1){
      qui = "itemaction"
    }else if (num==2){
      qui = "itemromance"
    }else if (num==3){
      qui = "itembiography"
    }
    itemMeilFilm = document.querySelectorAll("."+qui)
    // decremente
    c_meil[num]--
    // attention je suis sur une liste donc a ne pas sortir en index
    if (c_meil[num]==-1){
      c_meil[num] = itemMeilFilm.length-1
    }
    // bouge tout le monde
    for(const item of itemMeilFilm){
      if (item.classList[1] == "un"){
        item.className = qui+" deux"
      }else if (item.classList[1] == "deux"){
        item.className = qui+" trois"
      }else if (item.classList[1] == "trois"){
        item.className = qui+" quatre"
      }else if (item.classList[1] == "quatre"){
        item.className = qui+" cache"
      }
    }
    // un nouveau apparait
    itemMeilFilm[c_meil[num]].className = qui+" un"
  })
}

function ajoutlistenerNext(b_meil_Next,num) {
  // on click
  b_meil_Next.addEventListener('click', () => {
    // regarde le carousel a qui il appartient
    if(num==0){
      qui = "itemMeilFilm"
    }else if (num==1){
      qui = "itemaction"
    }else if (num==2){
      qui = "itemromance"
    }else if (num==3){
      qui = "itembiography"
    }
    itemMeilFilm = document.querySelectorAll("."+qui)
    // incremente
    c_meil[num]++
    // attention je suis sur une liste donc a ne pas sortir en index
    if (c_meil[num]==itemMeilFilm.length){
      c_meil[num] = 0
    }
    // bouge tout le monde
    for(const item of itemMeilFilm){
      if (item.classList[1] == "un"){
        item.className = qui+" cache"
      }else if (item.classList[1] == "deux"){
        item.className = qui+" un"
      }else if (item.classList[1] == "trois"){
        item.className = qui+" deux"
      }else if (item.classList[1] == "quatre"){
        item.className = qui+" trois"
      }
    }
    // l'index est celui du premier hors la on veut afficher le dernier du carousel
    let lebon = c_meil[num] + 3
    if (lebon >= itemMeilFilm.length){
      lebon -= itemMeilFilm.length
    }
    // un nouveau apparait
    itemMeilFilm[lebon].className = qui+" quatre"
  })
}

// appel affiche carousel
function clickmodale(div, film){
  div.addEventListener('click', () => {
    affichemodale(film)
  })
}

// affiche carousel
function affichemodale(film){
  xhr.open('GET', "http://localhost:8000/api/v1/titles/"+film.id, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.responseText)
      modale = document.querySelector('.modale')
      img = modale.querySelector("img")
      img.setAttribute("src", data.image_url)
      titre = modale.querySelector(".titre_modale")
      titre.innerHTML=data.title
      genre = modale.querySelector(".genre_modale")
      listeGenre = ""
      // passe de liste en phrase
      for(const genre of data.genres){
        listeGenre += genre+", "
      }
      genre.innerHTML=listeGenre.slice(0, -2)
      date = modale.querySelector(".date_modale")
      date.innerHTML = data.date_published
      rated = modale.querySelector(".rated_modale")
      rated.innerHTML = data.rated
      score = modale.querySelector(".score_modale")
      score.innerHTML = data.imdb_score
      real = modale.querySelector(".rea_modale")
      listeReal = ""
      // passe de liste en phrase
      for(const nom of data.directors){
        listeReal += nom+", "
      }
      // retire le ', ' a la fin
      real.innerHTML = listeReal.slice(0, -2)
      acteurs = modale.querySelector(".acteurs_modale")
      listeActeurs = ""
      // passe de liste en phrase
      for(const nomActeur of data.actors){
        listeActeurs+=nomActeur+", "
      }
      // retire le ', ' a la fin
      acteurs.innerHTML = listeActeurs.slice(0, -2)
      time = modale.querySelector(".time_modale")
      time.innerHTML = data.duration+" min"
      pays = modale.querySelector(".pays_modale")
      listePays = ""
      // passe de liste en phrase
      for(const countrie of data.countries){
        listePays+=countrie+", "
      }
      // retire le ', ' a la fin
      pays.innerHTML = listePays.slice(0,-2)
      box = modale.querySelector(".box_modale")
      box.innerHTML = data.reviews_from_users
      desc = modale.querySelector(".desc_modale")
      // affiche la modale
      desc.innerHTML = data.long_description
      modale.className = "modale"
      // monte en haut de la page pour voir la modale
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      // ne plus pouvoir scroller
      body = document.querySelector("body")
      body.className = "noScroll"
    }
  }
  xhr.send();
}

const croix = document.querySelector(".croix_modale")
// functoin fermé par croix
croix.addEventListener('click', () => {
  modale = document.querySelector('.modale')
  modale.className = "modale cache"
  // pour pouvoir rescroller
  body = document.querySelector("body")
  body.className = ""
})

window.onclick = function(event) {
  // verifie qu'on ne click pas dans la modale car tout html dans modale a '...modale' dans ses class
  if (!event.target.className.includes('modale')) {
    modale = document.querySelector('.modale')
    modale.className = "modale cache"
    // pour pouvoir rescroller
    body = document.querySelector("body")
    body.className = ""
  }
};
