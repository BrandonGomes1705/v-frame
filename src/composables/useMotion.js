import { Tween, Easing } from "@tweenjs/tween.js";
import { watch, ref } from "vue"

export default function useMotion(element) {

    // store the current styles for the element.
    const animatableProperties = ref({
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
    })

    // store all current instances of Tween for each property.
    const tweens = ref({
        x: null,
        y: null,
        rotate: null,
        scale: null,
        opacity: null,
    })

    /**
     * Checks if the specified style is a transform property.
     * 
     * @param {String} style 
     * @returns {Boolean}
     */
    const isTransformProperty = (style) => {
        return ['x', 'y', 'rotate', 'scale'].includes(style);
    }

    /**
     * Generates a the string required for the specified transform property.
     *
     * @param {String} style 
     * @param {Number} value 
     * @returns {String}
     */
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

    /**
     * Gets the transition easing for the specified style.
     * 
     * @param {String} style 
     * @returns {*}
     */
    const getEasingForStyle = (style) => {
        if(['x', 'y', 'rotate'].includes(style)) {
            return Easing.Elastic.Out;
        }
        if(style == 'opacity') {
            return Easing.Linear.None;
        }
        return Easing.Exponential.Out;
    }

    /**
     * Transitions the specified property to the specified value.
     * 
     * @param {String} style 
     * @param {Number} value 
     */
    const transitionTo = (style, value) => {
        // check if the new value is different to the existing value.
        if(animatableProperties.value[style] !== value) {
            // check if the property is already being transitioned.
            if(tweens.value[style] !== null) {
                // stop the existing transition.
                tweens.value[style].stop();
                tweens.value[style] = null;
            }

            // initialise the data to be transitioned.
            let data = {value: animatableProperties.value[style]};

            // create the transition instance.
            tweens.value[style] = new Tween(data)
                .to({value: value})
                .easing(getEasingForStyle(style))
                .onUpdate(() => {
                    animatableProperties.value[style] = data.value;
                })
                .start();

            let animate = (time) => {
                // check if the transition has not ended.
                if(tweens.value[style] !== null) {
                    requestAnimationFrame(animate)
                    tweens.value[style].update(time)
                } else {
                    tweens.value[style].stop();
                    tweens.value[style] = null;
                }
            }
            
            // start the transition.
            requestAnimationFrame(animate)
        }
        

    }

    /**
     * Generates the styles and applies them to the element.
     */
    const generateStyles = () => {
        let transform = '';
        for (const [key, value] of Object.entries(animatableProperties.value)) {
            if(isTransformProperty(key)) {
                transform += ` ${transformString(key, value)}`;
            }

            if(key === 'opacity') {
                element.style.opacity = value;
            }
        }
        element.style.transform = transform;
    }

    /**
     * Set the element to transition the sepecified properties to the specified values.
     * 
     * @param {Object} styles 
     */
    const setStyles = (styles) => {
        for (const [key, value] of Object.entries(styles)) {
            transitionTo(key, parseInt(value));
        }
    }

    /**
     * Sets the initial styles to the element.
     * 
     * @param {Object} initial 
     */
    const setInitialStyles = (initial) => {
        for (const [key, value] of Object.entries(initial)) {
            animatableProperties.value[key] = value;
        }
    }

    // update the elements styles whenever the properties are changed.
    watch(animatableProperties, 
        () => {
            generateStyles();
        },
        {deep: true,}
    )

    return {
        setStyles,
        setInitialStyles,
    }
}