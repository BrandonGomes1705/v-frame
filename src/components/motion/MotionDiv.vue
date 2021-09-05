<template>
    <div ref="element" @mouseenter="onHover" @mouseleave="reset">
        <slot/>
    </div>
</template>
<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import UseMotion from '../../composables/useMotion'

const props = defineProps({
    initial: {
        type: Object,
        default: {},
    },
    animate: {
        type: Object,
        default: {},
    },
    whileHover: {
        type: Object,
        default: {},
    }
})

const currentStyles = computed(() => {
    return props.animate;
});

const element = ref(null)
let setStylesFn = null;

const onHover = () => {
    setStylesFn(props.whileHover);
}

const reset = () => {
    setStylesFn(props.animate);
}

onMounted(async () => {
    let {setInitialStyles, setStyles} = UseMotion(element.value);
    setInitialStyles(props.initial);

    setStylesFn = setStyles;
    setStylesFn(props.animate);
})

watch(currentStyles, (newVal) => {
        setStylesFn(newVal)
})
</script>