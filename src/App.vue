
<template>
    <div class="space-y-20 mt-32">
        <div class="flex justify-center">
            <motion-div
                class="h-20 w-20 shadow bg-white rounded-lg"
                :initial="{ 
                        y: -20,
                        opacity: 0
                    }"
                :animate="{ 
                        y,
                        x,
                        scale: scale/4,
                        rotate,
                        opacity: 1
                    }"
            />
        </div>
        <div class="flex justify-center">
            <div class="flex flex-col space-y-5">
                <div>
                    <p>X</p>
                    <input v-model="x" type="range" min="-50" max="50">
                </div>
                
                <div>
                    <p>Y</p>
                    <input v-model="y" type="range" min="-50" max="50">
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
