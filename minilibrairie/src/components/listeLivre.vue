<script setup>
import { reactive, onMounted } from "vue";
import Livre from "../Livre.js";
import livreItem from "./livreItem.vue";
import { ref } from "vue";
const titre = ref("");
const prix = ref("");
const motclé = ref("")
const rechercheId = ref("")

const listeC = reactive([]);
const url ="https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/14/livres";


function handlerAjouter(Li) {
  console.log(Li);
  let id=Li._id;
  console.log(id)
  let titre=Li.titre;
  let prix=Li.prix;
  Li.ajouterStock();
  let qtestock=Li.quantité;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: id, titre: titre, qtestock: qtestock, prix: prix}),
  };

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}

function handlerRetirer(Li) {
  let id=Li._id;
  let titre=Li.titre;
  let prix=Li.prix;
  if(Li.quantité>1){
    Li.supprimerStock();
    let qtestock=Li.quantité;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: id, titre: titre, qtestock: qtestock, prix: prix}),
   };

    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        getLivres();
      })
      .catch((error) => console.log(error));
    }

    else{
      let id=Li._id;
      console.log(id);
      const fetchOptions = {
        method: "DELETE",
      };
      fetch(url + "/" + id, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
      getLivres();
      })
      .catch((error) => console.log(error));
  }
}

function ajouterLivre(Nom, prix){
  let cree= new Livre(Nom, prix)
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre: Nom, qtestock: 1, prix: prix }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}

function getLivreMotClé(idrecherche){
  let lien=url+"?search="+idrecherche;
  console.log(lien)
  const fetchOptions = { method: "GET" };
  fetch(lien, fetchOptions)
    .then((response) => {
      return response.json();
    })

    .then((dataJSON) => {
      console.log(dataJSON);
      listeC.splice(0, listeC.length);
      dataJSON.forEach((v) => listeC.push(new Livre(v.id, v.titre, v.qtestock, v.prix)));
      console.log(listeC)
    })
}

function getLivreId(id) {
    const fetchOptions = {
        method: 'GET'

    }
    console.log(url + '/' + id)
    fetch(url + '/' + id, fetchOptions)
        
        .then((response) => {
            return response.json();
        })
        .then((dataJSON) => {
          console.log(dataJSON);
            listeC.splice(0, listeC.length);
            listeC.push(new Livre(dataJSON.id, dataJSON.titre, dataJSON.qtestock, dataJSON.prix));
            console.log(listeC);
        })
    }
function getLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)

    .then((response) => {
      return response.json();
    })

    .then((dataJSON) => {
      console.log(dataJSON);
      listeC.splice(0, listeC.length);
      dataJSON.forEach((v) => listeC.push(new Livre(v.id, v.titre, v.qtestock, v.prix)));
      console.log(listeC)
    })

    .catch((error) => console.log(error));
}
onMounted(() => {
  getLivres();
});
</script>




<template>
  <div class="recherche">
    <input v-model="motclé" id="inputRecherche" placeholder="Vous Cherchez..."/>
    <button type="button" id="buttonRecherche" v-on:click="getLivreMotClé(motclé)"> Rechercher </button>
  </div>
  <div class="inputId">
    <input v-model="rechercheId" placeholder="Recherche par Id"/><button type="button" id="buttonId" v-on:click="$event => getLivreId(rechercheId)"> Rechercher </button>
  </div>
    <div class="ajout">
      Vous ne trouvez pas ce que vous cherchez? Ajoutez-le!
      <form class="barreajout">
        <input v-model="titre" placeholder="Nom"/><input v-model="prix" placeholder="Prix"/>
        <button type="button" v-on:click="ajouterLivre(titre, prix)"> Ajouter </button>
      </form>
    </div>
    <div>
      <img src="../assets/pngegg.png" id="imagePoisson">
    </div>
    
    <div>
    <table id="Tableau">
        <thead>
          <tr>
            <th class="Titre">Titre</th>
            <th class="Prix">Prix</th>
            <th class="Quantité">Quantité En Stock</th>
          </tr>
        </thead>
        <tbody>
            <livreItem
                v-for="livre of listeC"
                :key="livre.id"
                :livre="livre"
                @retirerC="handlerRetirer"
                @ajouterC="handlerAjouter"
            />
        </tbody>
    </table>
    </div>
</template>

<style>

#Tableau{
display: block;
position:absolute;
top: 50%;
left: 18%;
background-color: rgb(150,150,150,0.6);
padding-left: 50px;
padding-right: 50px;
border-radius: 3%;
}

.ajout{
  font-family: Papyrus, fantasy;
}

.inputId{
  position: absolute;
  left: 70%;
  top: 30%;
}

.barreajout{
  margin-top: 10px;
}

#imagePoisson{
  position: absolute;
  top: 150%;
}

#inputRecherche{
  margin-top: 40px;
  width: 250px;
  margin-right: 40px;
}

.recherche{
  display: block;
  position: absolute;
  top: 35%;
  left: 25%;
}
</style>