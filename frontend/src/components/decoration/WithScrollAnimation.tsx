import React, { ComponentType } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const withScrollAnimation = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
    return (props: P) => {
        const [ref, controls, variants] = useScrollAnimation();

        return (
            <motion.div ref={ref} initial="hidden" animate={controls} variants={variants}>
                <WrappedComponent {...props} />
            </motion.div>
        );
    };
};

export default withScrollAnimation;
