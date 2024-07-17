<script setup>
import { watch } from 'vue';

const props = defineProps({
  count: Number,
  kind: String,
  limit: Number,
});

const emit = defineEmits(['fouledOut']);

let foulData = [];

function defineFoulData() {
  if (props.limit == undefined) {
    console.error('No limit provided by parent');
    return;
  }

  for (let i = 0; i < props.limit; i++) {
    foulData.push(0);
  }

  console.log('foulData populated', foulData.length);
}

watch(
  () => props.count,
  (currentCount) => {
    if (currentCount == props.limit) {
      alert('FOULED OUT');
      return;
    }

    if (foulData[currentCount - 1] == 0) {
      foulData[currentCount - 1] = 1;
    } else {
      foulData[currentCount] = 0;
    }
  }
);

defineFoulData();
</script>

<template>
  <div class="foul-track">
    <div
      v-for="(foul, index) in foulData"
      :key="index"
      :class="foul == 1 ? 'counted foul' : 'uncounted foul'"
    >
      <v-icon name="hi-solid-x-circle" scale="2" />
    </div>
  </div>
</template>

<style scoped>
.foul-track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.counted,
.uncounted {
  display: flex;
}

.counted.foul .ov-icon {
  fill: red;
}

.uncounted.foul .ov-icon {
  fill: rgba(222, 222, 222, 0.2);
}
</style>
