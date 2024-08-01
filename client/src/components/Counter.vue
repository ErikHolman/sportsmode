<script setup>
import { ref } from 'vue';

const props = defineProps({
  kind: String,
  value: Number,
});

const emit = defineEmits(['updateFouls', 'updatePoints']);

const count = ref(0);
const pointKind = ref(props.value);
const buttonDisabled = ref(true);

function addCount() {
  // Toggle disabled button becuase count is now greater than 0
  buttonDisabled.value = false;

  // Update count, applying modifier if provided
  if (props.value != undefined) {
    count.value = count.value + props.value;
  } else {
    count.value++;
  }

  // Update parent with new data
  if (props.kind == 'foul') {
    emit('updateFouls', count.value);
  } else {
    emit('updatePoints', pointKind.value);
    emit('updateAttempts', 1);
  }
}

function subCount() {
  // Update count, applying modifier if provided
  if (props.value != undefined) {
    count.value = count.value - props.value;
  } else {
    count.value--;
  }

  // Update parent with new data
  if (props.kind == 'foul') {
    emit('updateFouls', count.value);
  } else {
    emit('updatePoints', -pointKind.value);
    emit('updateAttempts', -1);
  }

  // Disable button if '0' and don't go negative
  if (count.value == 0) {
    buttonDisabled.value = true;
  }
}
</script>

<template>
  <div class="count-contains">
    <div class="counter">
      <button
        class="minus-button"
        title="Remove {{ kind }}"
        :disabled="buttonDisabled"
        @click="subCount()"
      >
        <v-icon name="hi-solid-minus-circle" fill="red" scale="2" />
      </button>
      <h2 class="number">{{ count }}</h2>
      <button class="plus-button" @click="addCount()">
        <v-icon name="hi-solid-plus-circle" fill="green" scale="2" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.count-contains {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.counter {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: fit-content;
}

.counter .number {
  display: flex;
  justify-content: center;
  width: 1em;
}

.plus-button,
.minus-button {
  display: flex;
  padding: 0.5em;
  margin: 0.5em;
  cursor: pointer;
  border-radius: 1em;
  touch-action: manipulation;
}

.plus-button {
  border: 1px solid rgba(0, 128, 0, 0.05);
  background-color: rgba(0, 128, 0, 0.05);
}
.plus-button:hover {
  border: 1px solid rgba(0, 128, 0, 0.75);
  background-color: rgba(0, 128, 0, 0.75);
}

.plus-button:hover .ov-icon {
  fill: white;
}

.minus-button {
  border: 1px solid rgba(255, 0, 0, 0.05);
  background-color: rgba(255, 0, 0, 0.05);
}
.minus-button:hover {
  border: 1px solid rgba(255, 0, 0, 0.75);
  background-color: rgba(255, 0, 0, 0.75);
}

.minus-button:hover .ov-icon {
  fill: white;
}

.minus-button:disabled {
  border: 1px solid rgba(55, 55, 55, 0.15);
  background-color: rgba(55, 55, 55, 0.15);
  pointer-events: none;
  touch-action: manipulation;
}

.minus-button:disabled .ov-icon {
  fill: white;
}
</style>
