<script setup>
import { reactive, onMounted } from "vue";
import Livre from "../Livre.js";
import livre from "./livre.vue";

const listeC = reactive([]);
const url ="https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/16/livres"


function handlerAjouter(Li) {
  console.log(Li);
  Li.ajouterStock();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(Livre),
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
  console.log(Li);
  ch.supprimerStock();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(Livre),
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




function getLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)

    .then((response) => {
      return response.json();
    })

    .then((dataJSON) => {
      console.log(dataJSON);
      listeC.splice(0, listeC.length);
      dataJSON.forEach((v) => listeC.push(new Livre(v.titre, v.quantité, v.prix)));
    })

    .catch((error) => console.log(error));
}
onMounted(() => {
  getLivres();
});
</script>

<template>
    <table>
        <thead>

        </thead>
        <tbody>
            <livre
                v-for="Livre of listeC"
                :key="Livre.id"
                :Livre="Livre"
                @retirerC="handlerRetirer"
                @ajouterC="handlerAjouter"
            />
        </tbody>
    </table>
</template>