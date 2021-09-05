
<template>
    <div class="space-y-20 mt-32">
        <div class="flex justify-center space-x-10">
            <motion-div class="p-5 bg-white rounded-lg shadow" :initial="{scale: 0, rotate: -180}" :animate="{scale:1, rotate: 0,}">
                Motion Div
            </motion-div>
            <motion-div
                class="h-20 w-20 shadow bg-white rounded-lg"
                :initial="{ 
                        scale: 0.8,
                        rotate: 180,
                    }"
                :animate="{ 
                        y,
                        x,
                        scale: scale/4,
                        rotate,
                        opacity: 1
                    }"
                :while-hover="{
                        scale: 1.2,
                        rotate: 90
                    }"
            />
        </div>
        <div class="flex justify-start">
            <div v-for="data in graph" :key="data" :style="'height: ' + data*100 + 'px'" class="border-b border-red-500 w-1"/>
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col space-y-5">
                <div>
                    <p>X</p>
                    <input v-model="x" type="range" min="-100" max="100">
                </div>
                
                <div>
                    <p>Y</p>
                    <input v-model="y" type="range" min="-100" max="100">
                </div>

                <div>
                    <p>Rotate</p>
                    <input v-model="rotate" type="range" min="0" max="360">
                </div>

                <div>
                    <p>Scale</p>
                    <input v-model="scale" type="range" min="0" max="8">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import MotionDiv from "./components/motion/MotionDiv.vue";
import useMotion from "./composables/useMotion";

const { springEase } = useMotion(); 
const graph = ref([]);
for(let i = 0; i < 100; i++) {
    graph.value.push(springEase(i/100))
}

const y = ref(0);
const x = ref(0);
const scale = ref(4);
const rotate = ref(0);
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
