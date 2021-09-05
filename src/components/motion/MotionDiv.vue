<template>
    <div ref="element">
        <slot/>
    </div>
</template>
<script setup>
import {computed, nextTick, onMounted, ref, watch} from 'vue';
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
let setStylesFn = null;

onMounted(async () => {
    let {setInitialStyles, setStyles} = UseMotion(element.value);
    setInitialStyles(props.initial);

    setStylesFn = setStyles;
    requestAnimationFrame(() => setStylesFn(props.animate))
})

watch(currentStyles, (newVal) => {
        requestAnimationFrame(() => setStylesFn(newVal))
})
</script>