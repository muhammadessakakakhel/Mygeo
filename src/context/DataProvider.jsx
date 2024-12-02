// import React, { createContext, useState, useEffect } from "react";
// import Papa from "papaparse";

// export const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch("/Data30k.csv"); // Path to your CSV file
//         const csvData = await response.text();

//         // Parse CSV data
//         Papa.parse(csvData, {
//           header: true, // Ensure the CSV headers are mapped to object keys
//           skipEmptyLines: true,
//           complete: (result) => {
//             setRestaurants(result.data);
//           },
//           error: (error) => {
//             console.error("Error parsing CSV data:", error);
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching restaurant data:", error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   return (
//     <DataContext.Provider value={{ restaurants }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export default DataProvider;



////////////////////////////////////

// import React, { createContext, useState, useEffect } from "react";
// import Papa from "papaparse";

// export const DataContext = createContext();

// const DataProvider = ({ children }) => {
//   const [restaurants, setRestaurants] = useState([]); // Stores restaurant data
//   const [chains, setChains] = useState([]); // Stores unique chain names

//   useEffect(() => {
//     const fetchRestaurants = async () => {
//       try {
//         const response = await fetch("/30k_Data_Chain.csv"); // Fetch CSV file from public folder
//         const csvData = await response.text();

//         // Parse CSV data using PapaParse
//         Papa.parse(csvData, {
//           header: true,
//           skipEmptyLines: true,
//           complete: (result) => {
//             console.log("Parsed CSV Data:", result.data); // Log parsed data
//             setRestaurants(result.data); // Set restaurant data
        
//             // Extract unique chain names
//             const uniqueChains = Array.from(
//               new Set(result.data.map((item) => item.Chain))
//             );
//             console.log("Unique Chains:", uniqueChains); // Log unique chains
//             setChains(["All", ...uniqueChains]); // Add "All" for default option
//           },
//           error: (error) => {
//             console.error("Error parsing CSV data:", error);
//           },
//         });
//       } catch (error) {
//         console.error("Error fetching restaurant data:", error);
//       }
//     };

//     fetchRestaurants();
//   }, []);

//   return (
//     <DataContext.Provider value={{ restaurants, setRestaurants, chains }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

// export default DataProvider;



// ///////////////////////////////////////
import React, { createContext, useState, useEffect } from "react";
import Papa from "papaparse";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [chains, setChains] = useState([]);
  const [chainCounts, setChainCounts] = useState({});

  // Fetch CSV data and calculate chain counts
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/Final_Data_But_need_changes.csv");
        const csvData = await response.text();

        // Parse CSV data using PapaParse
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const data = result.data;
            setRestaurants(data);

            // Calculate the count for each chain
            const counts = data.reduce((acc, restaurant) => {
              const chain = restaurant.Chain || "Independent";
              acc[chain] = (acc[chain] || 0) + 1;
              return acc;
            }, {});

            setChainCounts(counts); // Set chain counts in state
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

  // Sort chains in descending order by count
  useEffect(() => {
    if (Object.keys(chainCounts).length > 0) {
      const sortedChains = Object.keys(chainCounts).sort(
        (a, b) => chainCounts[b] - chainCounts[a] // Sort in descending order by count
      );
      setChains(sortedChains); // Save the sorted chains
    }
  }, [chainCounts]);

  return (
    <DataContext.Provider value={{ restaurants, chains, chainCounts }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;



