<script setup>
import Counter from '../Counter.vue';

const props = defineProps({
    currentCount: Number,
    kind: String,
    value: Number,
});

const emit = defineEmits(['updatePoints']);

function sendUpdate(event) {
    emit('updatePoints', { kind: props.kind, value: event });
}
</script>

<template>
    <Counter
        :count="currentCount"
        :kind="props.kind"
        :value="props.value"
        @updateCount="sendUpdate"
    />
</template>

<style></style>
