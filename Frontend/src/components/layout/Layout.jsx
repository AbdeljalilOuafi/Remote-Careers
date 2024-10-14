import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children, className }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full h-auto flex flex-col  ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default Layout