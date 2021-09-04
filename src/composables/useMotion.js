import { Tween, Easing } from "@tweenjs/tween.js";
import { onMounted, watch, ref } from "vue"

export default function useMotion(element) {

    const transformProperties = ref({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
    })

    const isTransformProperty = (style) => {
        return ['x', 'y', 'rotate', 'scale'].includes(style);
    }

    const transformString = (style, value) => {
        if(style === 'x' || style === 'y') {
            return `translate${style.toUpperCase()}(${value}px)`
        }

        if(style === 'rotate') {
            return `rotate(${value}deg)`
        }

        if(style === 'scale') {
            return `scale(${value})`
        }
    }

    const setStyle = (style, value) => {
        if(isTransformProperty(style)) {
            transformProperties.value[style] = value;
        }
    }

    const animateTo = (style, value) => {
        if(transformProperties.value[style] !== value) {
        
            let data = {value: transformProperties.value[style]};
            let tween = new Tween(data)
                            .to({value: value})
                            .easing(Easing.Elastic.Out)
                            .onUpdate((e) => {
                                transformProperties.value[style] = data.value;
                            })
                            .start();

            let animate = (time) => {
                requestAnimationFrame(animate)
                tween.update(time)
            }

            requestAnimationFrame(animate)
        }
        

    }

    const generateStyles = () => {
        let transform = '';
        for (const [key, value] of Object.entries(transformProperties.value)) {
            transform += ` ${transformString(key, value)}`;
        }
        element.style.transform = transform;
    }

    const setStyles = (initial) => {
        for (const [key, value] of Object.entries(initial)) {
            animateTo(key, value);
        }
    }

    watch(transformProperties, 
        () => {
            generateStyles();
        },
        {deep: true,}
    )

    return {
        setStyles,
    }
}