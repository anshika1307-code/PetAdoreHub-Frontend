import { useState, useContext, createContext, useEffect } from "react";

const FavContext = createContext();
const FavProvider = ({ children }) => {
  const [fav, setFav] = useState([]);

  useEffect(() => {
    let existingFavItem = localStorage.getItem("Fav");
    if (existingFavItem) setFav(JSON.parse(existingFavItem));
  }, []);

  return (
    <FavContext.Provider value={[fav, setFav]}>
      {children}
    </FavContext.Provider>
  );
};

// custom hook
const useFav = () => useContext(FavContext);

export { useFav, FavProvider };