import React from "react";
import { ChildrenPropsModel } from "models/contexts/ContextModels";

interface FavoriteListContextModel {
  setUserFavoriteListCount: React.Dispatch<React.SetStateAction<number>>;
  userFavoriteListCount: number;
}

export const FavoriteListContext =
  React.createContext<FavoriteListContextModel>({
    setUserFavoriteListCount: () => {},
    userFavoriteListCount: 0
  });

const FavoriteListContextProvider: React.FC<ChildrenPropsModel> = ({
  children,
}) => {
  const [userFavoriteListCount, setUserFavoriteListCount] = React.useState<number>(0);

  return (
    <FavoriteListContext.Provider
      value={{
        setUserFavoriteListCount,
        userFavoriteListCount,
      }}
    >
      {children}
    </FavoriteListContext.Provider>
  );
};

export default FavoriteListContext;
export { FavoriteListContextProvider };
