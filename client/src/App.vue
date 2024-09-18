<script setup>
import Counter from './components/Counter.vue';
// import FoulTracking from './components/FoulTracking.vue';
import { ref } from 'vue';

const pointTypes = [
  { name: 'F/T', multiplier: 1 },
  { name: '2', multiplier: 2 },
  { name: '3', multiplier: 3 },
];
// const foulTypes = [
//   { name: 'Foul', kind: 'foul', limit: 5 },
//   { name: 'T', kind: 'tech', limit: 2 },
// ];

const attempts = ref(0);
// const fouls = ref(0);
// const technicals = ref(0);
const points = ref(0);
const activity = ref('none');

// function onUpdateFouls(event) {
//   // let prevFouls = fouls.value;
//   fouls.value = fouls.value + event;

//   if (fouls.value <= 4) {
//     activity.value = 'A foul was recorded';
//   }

//   if (fouls.value >= 5) {
//     activity.value = 'fould out fool';
//     alert('boof');
//   }
// }

function onUpdatePoints(event) {
  let prevPoints = points.value;
  let newPoints = event;
  points.value = prevPoints + newPoints;
  attempts.value = attempts.value + 1;
}

function onUpdateAttempt(event) {
  attempts.value = attempts.value + event;
}
</script>

<template>
  <div class="sports-app">
    <div class="count-wrapper">
      <div class="count-header">
        <p>
          Points: {{ points }}<br />
          Attempts: {{ attempts }}<br />
          Activity: {{ activity }}
        </p>
      </div>
      <div v-for="(point, index) in pointTypes" :key="index" class="count-item">
        <h3 class="counter">{{ point.name }}</h3>
        <Counter
          class="counter"
          kind="'attempt'"
          value="attempts"
          @updateAttmept="onUpdateAttempt"
        />
        <Counter
          class="counter"
          :kind="point.name"
          :value="point.multiplier"
          @updatePoints="onUpdatePoints"
        />
      </div>
    </div>
    <!-- <div class="foul-wrapper">
      <div class="foul-header"><h2>Fouls: {{ fouls }}/h2></div>
      <div v-for="(foul, index) in foulTypes" :key="index" class="foul-item">
        <h3 class="counter">{{ foul.name }}</h3>
        <Counter
          class="counter"
          :key="index"
          :kind="foul.kind"
          @updateFouls="onUpdateFouls"
        />
        <FoulTracking
          class="timeline"
          :count="fouls"
          :key="index"
          :kind="foul.kind"
          :limit="foul.limit"
        />
      </div>
    </div> -->
  </div>
</template>

<style scoped>
h2,
h3 {
  margin-bottom: 0;
}

.sports-app {
  width: 100vw;
  height: 100vh;
  background-color: #2d2d2d;
  color: #f7f7f7;
}

.count-wrapper,
.foul-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 2em;
}

.count-header,
.foul-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
}

.count-item .counter,
.foul-item .counter {
  border-right: 1px solid rgba(222, 222, 222, 0.6);
  height: 2em;
  width: 25%;
  margin: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.count-item h3.counter,
.foul-item h3.counter {
  width: 10%;
}

.counter {
  width: 25%;
  border: 1px solid red;
}

.timeline {
  width: 50%;
  border: 1px solid red;
  margin: 1em;
}

.count-item,
.foul-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.count-header,
.foul-header {
  border-bottom: 1px solid #f7f7f7;
}
</style>
