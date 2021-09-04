<template>
    <div ref="element" class="transition-all ease-out duration-200">
        <slot/>
    </div>
</template>
<script setup>
import {computed, defineProps, nextTick, onMounted, ref, watch} from 'vue';
import UseMotion from '../../composables/useMotion'

const props = defineProps({
    initial: {
        type: Object,
        default: {},
    },
    animate: {
        type: Object,
        default: {},
    }
})

const currentStyles = computed(() => {
    return props.animate;
});

const element = ref(null)
let setStyles = null;

onMounted(async () => {
    setStyles = UseMotion(element.value).setStyles;
    setStyles(props.initial);
    requestAnimationFrame(() => setStyles(props.animate))
})

watch(currentStyles, (newVal) => {
        requestAnimationFrame(() => setStyles(newVal))
})
</script>