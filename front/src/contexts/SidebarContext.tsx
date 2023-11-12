import { SideBarContextModel } from 'models/SideBarContext';
import React, { createContext } from 'react'

interface SideBarContextProps {
    children: React.ReactNode
}
export const SideBarContext = createContext<SideBarContextModel>({
    isToggled: false,
    setIsToggled: () => {},
    handleToggle: () => {}
});

const SideBarContextProvider: React.FC<SideBarContextProps> = ({children}) => {
    const [isToggled, setIsToggled] = React.useState<boolean>(false);
    const handleToggle = () => {
        setIsToggled(!isToggled);
    }

    return (
        <>
            <SideBarContext.Provider value={{
                isToggled, handleToggle, setIsToggled
            }}>
                {children}
            </SideBarContext.Provider>
        </>
    )
}

export default SideBarContext
export {SideBarContextProvider}