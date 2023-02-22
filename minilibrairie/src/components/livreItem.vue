<script setup>
import Livre from '../Livre.js';
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
const emit = defineEmits(["retirerC", "ajouterC"]);
defineProps(["livre"]);
</script>


<template>
    <tr>
        <td class="Titre">
            {{ livre.afficherTitre() }}
        </td>
        <td class="Prix">
            {{ livre.afficherPrix() }} €
        </td>
        <td class="Quantité">
            <button @click="$emit('retirerC', livre)">-</button>
            {{ livre.afficherQuantité() }}
            <button @click="$emit('ajouterC', livre)">+</button>
        </td>
    </tr>
</template>

<style>
    td{
        border-radius: 10px;
        color:rgb(255,140,0);
        font-family: Papyrus, fantasy;
        font-weight: bold;
    }
    button{
        margin-left: 20px;
        margin-right: 20px;
    }
    .Titre{
        padding-right: 100px;
    }

    .Prix{
        padding-right: 100px;
    }
</style>