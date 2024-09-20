<script setup>
import Attempt from './components/CountTypes/Attempt.vue';
import Points from './components/CountTypes/Points.vue';
import Counter from './components/Counter.vue';
// import FoulTracking from './components/FoulTracking.vue';
import { ref } from 'vue';

const pointTypes = [
    { name: 'F/T', multiplier: 1 },
    { name: '2', multiplier: 2 },
    { name: '3', multiplier: 3 },
];

// const foulTypes = [
//     { name: 'Foul', kind: 'foul', limit: 5 },
//     { name: 'T', kind: 'tech', limit: 2 },
// ];

// const fouls = ref(0);
// const technicals = ref(0);
// function onUpdateFouls(event) {
//     // let prevFouls = fouls.value;
//     fouls.value = fouls.value + event;

//     if (fouls.value <= 4) {
//         activity.value = 'A foul was recorded';
//     }

//     if (fouls.value >= 5) {
//         activity.value = 'fould out fool';
//         alert('boof');
//     }
// }

const totalAttempts = ref(0);
const totalPoints = ref(0);
const attemptBreakdown = [0, 0, 0];
const successBreakdown = [0, 0, 0];
const pointBreakdown = [0, 0, 0];
const hitPercentage = [0, 0, 0];

function updateHitPercentage(position) {
    hitPercentage[position] = (
        (successBreakdown[position] / attemptBreakdown[position]) *
        100
    )
        .toFixed(2)
        .replace(/[.,]00$/, '');
}

function resetStats() {
    totalAttempts.value = 0;
    totalPoints.value = 0;
    attemptBreakdown[0] = 0;
    attemptBreakdown[1] = 0;
    attemptBreakdown[2] = 0;
    successBreakdown[0] = 0;
    successBreakdown[1] = 0;
    successBreakdown[2] = 0;
    hitPercentage[0] = 0;
    hitPercentage[1] = 0;
    hitPercentage[2] = 0;
    pointBreakdown[0] = 0;
    pointBreakdown[1] = 0;
    pointBreakdown[2] = 0;
}

function evalHitClass(score) {
    if (score == 0) {
        return 'zero';
    }

    if (score >= 80) {
        return 'high';
    }

    if (score < 80 && score >= 50) {
        return 'mid';
    }

    if (score < 50 && score > 0) {
        return 'low';
    }
}

function onUpdatePoints(event) {
    let prevPoints = totalPoints.value;
    let newPoints = event.value;
    let countCorrect = event.value > 0 ? 1 : -1;

    switch (event.kind) {
        case 'F/T':
            pointBreakdown[0] = pointBreakdown[0] + countCorrect;
            attemptBreakdown[0] = attemptBreakdown[0] + countCorrect;
            successBreakdown[0] = successBreakdown[0] + countCorrect;
            updateHitPercentage(0);
            break;
        case '2':
            pointBreakdown[1] = pointBreakdown[1] + countCorrect;
            attemptBreakdown[1] = attemptBreakdown[1] + countCorrect;
            successBreakdown[1] = successBreakdown[1] + countCorrect;
            updateHitPercentage(1);
            break;
        case '3':
            pointBreakdown[2] = pointBreakdown[2] + countCorrect;
            attemptBreakdown[2] = attemptBreakdown[2] + countCorrect;
            successBreakdown[2] = successBreakdown[2] + countCorrect;
            updateHitPercentage(2);
            break;
        default:
            break;
    }

    totalAttempts.value =
        attemptBreakdown[0] + attemptBreakdown[1] + attemptBreakdown[2];
    totalPoints.value = prevPoints + newPoints;
}

function onUpdateAttempt(event) {
    let attemptCorrect = event.value;
    switch (event.kind) {
        case 'F/T':
            attemptBreakdown[0] = attemptBreakdown[0] + attemptCorrect;
            updateHitPercentage(0);
            break;
        case '2':
            attemptBreakdown[1] = attemptBreakdown[1] + attemptCorrect;
            updateHitPercentage(1);
            break;
        case '3':
            attemptBreakdown[2] = attemptBreakdown[2] + attemptCorrect;
            updateHitPercentage(2);
            break;
        default:
            break;
    }

    totalAttempts.value =
        attemptBreakdown[0] + attemptBreakdown[1] + attemptBreakdown[2];
}
</script>

<template>
    <div class="sports-app">
        <div class="count-wrapper">
            <div class="count-header">
                <p>
                    Points: {{ totalPoints }}:
                    {{ pointBreakdown[0] }}
                    {{ pointBreakdown[1] }}
                    {{ pointBreakdown[2] }}<br />
                    Attempts: {{ totalAttempts }}:
                    {{ attemptBreakdown[0] }}
                    {{ attemptBreakdown[1] }}
                    {{ attemptBreakdown[2] }}<br />
                    {{ successBreakdown[0] }}
                    {{ successBreakdown[1] }}
                    {{ successBreakdown[2] }}
                </p>
                <button @click="resetStats">RESET</button>
            </div>
            <div
                v-for="(point, index) in pointTypes"
                :key="index"
                class="count-item"
            >
                <h3 class="counter">{{ point.name }}</h3>
                <div class="tally">{{ attemptBreakdown[index] }}</div>
                <Attempt
                    class="counter"
                    :currentCount="attemptBreakdown[index]"
                    @updateAttempt="
                        onUpdateAttempt({ kind: point.name, value: $event })
                    "
                />
                <div class="tally">{{ pointBreakdown[index] }}</div>
                <Points
                    class="counter"
                    :currentCount="pointBreakdown[index]"
                    :kind="point.name"
                    :value="point.multiplier"
                    @updateAttempt="onUpdateAttempt"
                    @updatePoints="onUpdatePoints"
                />
                <h3 class="counter" :class="evalHitClass(hitPercentage[index])">
                    {{ hitPercentage[index] }} %
                </h3>
            </div>
        </div>
        <!-- <div class="foul-wrapper">
            <div class="foul-header">
                <h2>Fouls: {{ fouls }}</h2>
            </div>
            <div
                v-for="(foul, index) in foulTypes"
                :key="index"
                class="foul-item"
            >
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

.tally {
    width: 15px;
    color: dimgrey;
    font-weight: bold;
    text-align: center;
}

.low,
.mid,
.high {
    border: 1px solid blue;
}

.zero {
    background-color: dimgrey;
    color: #2d2d2d;
}

.low {
    background-color: orangered;
    color: #2d2d2d;
}

.mid {
    background-color: yellow;
    color: #2d2d2d;
}

.high {
    background-color: rgb(0, 255, 0);
    color: #2d2d2d;
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
