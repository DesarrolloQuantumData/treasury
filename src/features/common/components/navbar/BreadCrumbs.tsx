import React, { useState, useEffect } from 'react';

export let ModulePage: string = "";
export let SubModulePage: String = "";
export let SubSubmodulePage: String = "";

export const Module = (name: string) => {
    ModulePage = name
}

export const Submodule = (name: string) => {
    SubModulePage = name
}

export const SubSubmodule = (name: string) => {
    SubSubmodulePage = name
}

export const clear = () => {
    ModulePage = "";
    SubModulePage = "";
    SubSubmodulePage = "";
}

export const BreadCrumbs: React.FC = () => {
    const [page, setPage] = useState(ModulePage);

    useEffect(() => {
        setPage(ModulePage)
    }, [Module]);

    return (
        <>
        </>
    );
};