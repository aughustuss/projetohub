export interface SideBarContextModel {
    isToggled: boolean;
    setIsToggled: (val: boolean) => void;
    handleToggle: () => void
}