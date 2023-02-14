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
            <button @click="$emit('retirerC', Livre.id)">-</button>
            {{ livre.afficherQuantité() }}
            <button @click="$emit('ajouterC', Livre.id)">+</button>
        </td>
    </tr>
</template>