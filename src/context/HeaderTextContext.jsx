import React, {Fragment ,createContext, ReactNode, useContext, useEffect, useState } from "react";

const headerContextDefaultValues  = {
    text: '',
    updateHeaderText: (data) => { },
};

const HeaderTextContext = createContext(headerContextDefaultValues);

export function useHeaderText() {
    return useContext(HeaderTextContext);
}

export function HeaderTextProvider({ children }) {
    const [text, setText] = useState('');

    const updateHeaderText = (data = '') => {
        setText(data);
    };

    const value = {
        text,
        updateHeaderText,
    };

    return (
        <Fragment>
            <HeaderTextContext.Provider value={value}>
                {children}
            </HeaderTextContext.Provider>
        </Fragment>
    );
}