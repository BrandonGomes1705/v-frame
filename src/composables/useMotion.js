import { onMounted } from "vue"

export default function useMotion(element) {

    let transformProperties = {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
    }
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
            transformProperties[style] = value;
        }
    }

    const generateStyles = () => {
        let transform = '';
        for (const [key, value] of Object.entries(transformProperties)) {
            transform += ` ${transformString(key, value)}`;
        }
        element.style.transform = transform;
    }

    const setStyles = (initial) => {
        for (const [key, value] of Object.entries(initial)) {
            setStyle(key, value);
        }

        generateStyles();
    }

    return {
        setStyles,
    }
}