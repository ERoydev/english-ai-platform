import { useEffect, useState } from 'react';
import { useAnimation, AnimationControls, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const useScrollAnimation = (threshold: number = 0.1): [React.RefObject<HTMLDivElement>, AnimationControls, Variants] => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (inView && !hasAnimated) {
            controls.start('visible');
            setHasAnimated(true)
        } 
    }, [controls, inView, hasAnimated]);

    const variants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5 } }
    };

    return [ref, controls, variants];
};

export default useScrollAnimation;