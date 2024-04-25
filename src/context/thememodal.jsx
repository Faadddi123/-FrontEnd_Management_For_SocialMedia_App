import React, { createContext, useContext, useState , useEffect} from 'react';

const ThemeModalContext = createContext();

export function useThemeModal() {
    return useContext(ThemeModalContext);
}

export const ThemeModalProvider = ({ children }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    
    const openModal = () => {
        console.log("Opening modal");
        setModalOpen(true);
    };
    const closeModal = () => {
        console.log("Closing modal");
        setModalOpen(false);
    };


    useEffect(() => {
        console.log(`Modal is now ${isModalOpen ? 'open' : 'closed'}`);
    }, [isModalOpen]);


    return (
        <ThemeModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ThemeModalContext.Provider>
    );
};