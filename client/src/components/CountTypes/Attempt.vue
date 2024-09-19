<script setup>
import Counter from '../Counter.vue';
import { ref } from 'vue';

const props = defineProps({
    currentCount: Number,
});

const emit = defineEmits(['updateAttempt']);

const attemptType = { name: 'attempt', value: 1 };

function sendUpdate(event) {
    emit('updateAttempt', event);
}
</script>

<template>
    <Counter
        :count="props.currentCount"
        :kind="attemptType.name"
        :value="attemptType.value"
        @updateCount="sendUpdate"
    />
</template>

<style></style>
