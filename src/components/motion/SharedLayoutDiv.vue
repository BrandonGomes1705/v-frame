<template>
    <div ref="container">
        <slot/>
    </div>
</template>

<script setup>
import { computed, onBeforeUpdate, onUpdated, ref, watch } from "vue";
import { Tween } from "@tweenjs/tween.js";
import useMotion from "../../composables/useMotion"

const container = ref(null);

const initial = ref({
    height: 0,
    width: 0,
})
const final = ref({
    height: 0,
    width: 0,
})

const tweens = ref({
    height: null,
    width: null,
})

const transitionProperty = (property, to) => {
    if(tweens.value[property]) {
        tweens.value[property].stop();
        tweens.value[property] = null;
    }

    const {springEase} = useMotion();
    let data = {value: initial.value[property]};
    container.value.style.overflow = 'hidden';
    tweens.value[property] = new Tween(data)
            .to({value: to})
            .easing(springEase)
            .onUpdate(() => {
                if(property === 'height') {
                    container.value.style.height = data.value + 'px';
                }
                if(property === 'width') {
                    container.value.style.width = data.value + 'px';
                }
            })
            .onComplete(() => {
                container.value.style.height = '';
                container.value.style.width = '';
                tweens.value[property].stop();
            })
            .start();

    let animate = (time) => {
        if(tweens.value[property]) {
            requestAnimationFrame(animate)
            tweens.value[property].update(time);
        }
    }
        
    // start the transition.
    requestAnimationFrame(animate)
}


onBeforeUpdate(() => {
    initial.value.height = container.value.offsetHeight;
    container.value.style.height = initial.value.height + 'px';

    initial.value.width = container.value.offsetWidth;
    container.value.style.width = initial.value.width + 'px';
})

onUpdated(() => {
    container.value.style.height = 'auto';
    final.value.height = container.value.offsetHeight;
    container.value.style.height = initial.value.height + 'px';


    if(initial.value.height !== final.value.height) {
        transitionProperty('height', final.value.height)
    } 

    container.value.style.width = 'auto';
    final.value.width = container.value.offsetWidth;
    container.value.style.width = initial.value.width + 'px';

    if(initial.value.width !== final.value.width) {
        transitionProperty('width', final.value.width)
    } 
})
</script>