import { ChildrenPropsModel } from 'models/contexts/contextModels';
import { SideBarContextModel } from 'models/contexts/contextModels';
import React, { createContext } from 'react'

export const SideBarContext = createContext<SideBarContextModel>({
    isToggled: false,
    setIsToggled: () => {},
    handleToggle: () => {}
});

const SideBarContextProvider: React.FC<ChildrenPropsModel> = ({children}) => {
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