import React, { createContext, useState, useEffect } from "react";
import Papa from "papaparse";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/Data30k.csv"); // Path to your CSV file
        const csvData = await response.text();

        // Parse CSV data
        Papa.parse(csvData, {
          header: true, // Ensure the CSV headers are mapped to object keys
          skipEmptyLines: true,
          complete: (result) => {
            setRestaurants(result.data);
          },
          error: (error) => {
            console.error("Error parsing CSV data:", error);
          },
        });
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <DataContext.Provider value={{ restaurants }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
