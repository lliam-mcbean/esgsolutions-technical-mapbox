import { createContext, useState, useContext, useEffect } from "react";

const InfoContext = createContext();

export function InfoProvider({ children }) {
  const [info, setInfo] = useState(false);
  const [earthquakeRange, setEarthquakeRange] = useState(0)
  const [displacementRange, setDisplacementRange] = useState(0)

  return (
    <InfoContext.Provider value={{ info, setInfo, displacementRange, setDisplacementRange, earthquakeRange, setEarthquakeRange }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  return useContext(InfoContext);
}