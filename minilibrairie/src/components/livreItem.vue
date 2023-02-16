<script setup>
import Livre from '../Livre.js';
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
const emit = defineEmits(["retirerC", "ajouterC"]);
defineProps(["livre"]);
</script>


<template>
    <tr>
        <td>
            {{ livre.afficherTitre() }}
        </td>
        <td>
            {{ livre.afficherPrix() }}
        </td>
        <td>
            <button @click="$emit('retirerC', livre)">-</button>
            {{ livre.afficherQuantité() }}
            <button @click="$emit('ajouterC', livre)">+</button>
        </td>
    </tr>
</template>