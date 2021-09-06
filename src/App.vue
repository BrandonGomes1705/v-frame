
<template>
    <div class="space-y-20 mt-32">
        <!-- <div class="flex justify-center space-x-10">
            <test-motion-div/>
        </div> -->
        <div class="flex justify-center">
            <shared-layout-div class="grid grid-cols-8 gap-2 p-5 bg-red-500 rounded-lg select-none" @click.native="count++">
                <motion-div :initial="{ scale: 0}" 
                    :animate="{ scale: 1}" 
                    v-for="n in count" 
                    :key="n" 
                    class="p-5 rounded-lg bg-white shadow-xl h-10 w-10"
                >
                        {{ n }}
                    </motion-div>
            </shared-layout-div>
        </div>
    </div>
</template>

<script setup>
import useMotion from "./composables/useMotion";
import TestMotionDiv from "./components/TestMotionDiv.vue"
import SharedLayoutDiv from "./components/motion/SharedLayoutDiv.vue"
import MotionDiv from "./components/motion/MotionDiv.vue"
import {ref} from 'vue';

const count = ref(1);


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
