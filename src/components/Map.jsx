// import React, { useContext, useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import styled from "styled-components";

// import { MapContext } from "../context/MapContext";
// import Popup from "./Popup";
// import PopupContent from "./PopupContent";

// const StyledContainer = styled.div`
//   width: 100%;
//   height: 97vh; /* Full viewport height */
//   margin:  0;
//   padding:0;
// `;

// const Map = () => {
//   const [content, setContent] = useState([]);
//   const [popupLngLat, setPopupLngLat] = useState(null);
//   const { setMap, map } = useContext(MapContext);
//   const mapContainer = useRef(null);

//   function onPopupClose() {
//     setContent([]);
//     setPopupLngLat(null);
//   }

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoibXVoYW1tYWRlc3Nha2FrYWtoZWw5NjYiLCJhIjoiY2x2aHZyeXFtMThmODJpcGUybTU4am92bSJ9.BvyI0TitDCFSTYDcPTLdVA";

//     const mapInstance = new mapboxgl.Map({
//       container: mapContainer.current, // Reference to the map container
//       style: "mapbox://styles/mapbox/light-v11", // Map style
//       center: [-98.5795, 39.8283], // Approximate geographical center of the USA
//       zoom: 3.5 ,// Lower zoom level to show the entire country
//       projection: "mercator", // Set the map projection to flat
//     });

// // Create a custom dot element for the marker
// const dotElement = document.createElement('div');
// dotElement.style.width = '10px';
// dotElement.style.height = '10px';
// dotElement.style.backgroundColor = '#ff0000'; // Red color for the dot
// dotElement.style.borderRadius = '50%'; // Makes it circular
// dotElement.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)'; // Optional shadow for better visibility

// // Make the cursor a clickable hand by default
// dotElement.style.cursor = 'pointer'; // Automatically shows a hand-click icon when hovered

// // Add the custom dot marker to the map
// const marker = new mapboxgl.Marker({ element: dotElement })
//   .setLngLat([-78.137343, 41.137451]) // Set the marker coordinates
//   .setPopup(
//     new mapboxgl.Popup().setHTML(
//       `<div>
//          <h3>PJ Fresh </h3>
//          <p><strong>Address:</strong> 224 Daniel Payne Drive, Birmingham, AL, 35207</p>
//          <p><strong>Category:</strong> Burgers, American, Sandwiches</p>
//          <p><strong>Avg Rating:</strong> 4.7</p>
//        </div>`) // Attach a popup
//   )
//   .addTo(mapInstance);

//     // // Optional: Open the popup by default
//     // marker.getPopup().addTo(mapInstance);
//   }, []);

//   return (
//     <>
//       {popupLngLat && (
//         <Popup lngLat={popupLngLat} onClose={onPopupClose}>
//           {content}
//         </Popup>
//       )}
//       <StyledContainer ref={(el) => (mapContainer.current = el)} />
//     </>
//   );
// };

// export default Map;

// data is coming real time from AWS RDS

///////////////////////////////////////////////////
// import React, { useContext, useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import styled from "styled-components";
// import { DataContext } from "../context/DataProvider";

// const StyledContainer = styled.div`
//   width: 100%;
//   height: 97vh;
//   margin: 0;
//   padding: 0;
// `;

// const Map = () => {
//   const { restaurants } = useContext(DataContext); // Fetch restaurant data
//   const mapContainer = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoibXVoYW1tYWRlc3Nha2FrYWtoZWw5NjYiLCJhIjoiY2x2aHZyeXFtMThmODJpcGUybTU4am92bSJ9.BvyI0TitDCFSTYDcPTLdVA";

//     mapInstance.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/light-v11",
//       center: [-86.8307025, 33.5623653],
//       zoom: 5,
//     });

//     return () => mapInstance.current.remove(); // Cleanup map instance on unmount
//   }, []);

//   useEffect(() => {
//     if (restaurants.length > 0 && mapInstance.current) {
//       restaurants.forEach((restaurant) => {
//         const marker = new mapboxgl.Marker()
//           .setLngLat([restaurant.lng, restaurant.lat])
//           .setPopup(
//             new mapboxgl.Popup().setHTML(`
//               <div>
//                 <h3>${restaurant.name}</h3>
//                 <p><strong>Address:</strong> ${restaurant.full_address}</p>
//                 <p><strong>Category:</strong> ${restaurant.category}</p>
//                 <p><strong>Avg Rating:</strong> ${restaurant.score}</p>
//               </div>
//             `)
//           )
//           .addTo(mapInstance.current);
//       });
//     }
//   }, [restaurants]); // Add markers whenever restaurant data changes

//   return <StyledContainer ref={mapContainer} />;
// };

// export default Map;

///////////////////////////////////////////Third trial, shwing in clustring
// import React, { useContext, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import styled from "styled-components";
// import { DataContext } from "../context/DataProvider";

// const StyledContainer = styled.div`
//   width: 100%;
//   height: 97vh;
//   margin: 0;
//   padding: 0;
// `;

// const Map = () => {
//   const { restaurants } = useContext(DataContext); // Fetch restaurant data
//   const mapContainer = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoibXVoYW1tYWRlc3Nha2FrYWtoZWw5NjYiLCJhIjoiY2x2aHZyeXFtMThmODJpcGUybTU4am92bSJ9.BvyI0TitDCFSTYDcPTLdVA";

//     // Initialize the Map
//     mapInstance.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/light-v11",
//       center: [-86.8307025, 33.5623653],
//       zoom: 5,
//     });

//     if (restaurants.length > 0) {
//       const geojsonData = {
//         type: "FeatureCollection",
//         features: restaurants.map((restaurant) => ({
//           type: "Feature",
//           geometry: {
//             type: "Point",
//             coordinates: [restaurant.lng, restaurant.lat],
//           },
//           properties: {
//             name: restaurant.name,
//             address: restaurant.full_address,
//             category: restaurant.category,
//             rating: restaurant.score,
//           },
//         })),
//       };

//       mapInstance.current.on("load", () => {
//         mapInstance.current.addSource("restaurants", {
//           type: "geojson",
//           data: geojsonData,
//           cluster: true,
//           clusterMaxZoom: 14, // Maximum zoom level for clustering
//           clusterRadius: 50, // Radius of each cluster
//         });

//         mapInstance.current.addLayer({
//           id: "clusters",
//           type: "circle",
//           source: "restaurants",
//           filter: ["has", "point_count"],
//           paint: {
//             "circle-color": [
//               "step",
//               ["get", "point_count"],
//               "#51bbd6",
//               100,
//               "#f28cb1",
//               750,
//               "#f1f075",
//             ],
//             "circle-radius": ["step", ["get", "point_count"], 15, 100, 20, 750, 25],
//           },
//         });

//         mapInstance.current.addLayer({
//           id: "cluster-count",
//           type: "symbol",
//           source: "restaurants",
//           filter: ["has", "point_count"],
//           layout: {
//             "text-field": "{point_count_abbreviated}",
//             "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
//             "text-size": 12,
//           },
//         });

//         mapInstance.current.addLayer({
//           id: "unclustered-point",
//           type: "circle",
//           source: "restaurants",
//           filter: ["!", ["has", "point_count"]],
//           paint: {
//             "circle-color": "#11b4da",
//             "circle-radius": 6,
//             "circle-stroke-width": 1,
//             "circle-stroke-color": "#fff",
//           },
//         });

//         mapInstance.current.on("click", "unclustered-point", (e) => {
//           const coordinates = e.features[0].geometry.coordinates.slice();
//           const { name, address, category, rating } = e.features[0].properties;

//           new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(
//               `<h3>${name}</h3><p><strong>Address:</strong> ${address}</p><p><strong>Category:</strong> ${category}</p><p><strong>Rating:</strong> ${rating}</p>`
//             )
//             .addTo(mapInstance.current);
//         });
//       });
//     }

//     return () => mapInstance.current.remove();
//   }, [restaurants]);

//   return <StyledContainer ref={mapContainer} />;
// };

// export default Map;

// /////////////////////////////////////////// working good
// import React, { useContext, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import styled from "styled-components";
// import { DataContext } from "../context/DataProvider";

// const StyledContainer = styled.div`
//   width: 100%;
//   height: 97vh;
//   margin: 0;
//   padding: 0;
// `;

// const Map = () => {
//   const { restaurants } = useContext(DataContext); // Fetch restaurant data
//   const mapContainer = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoibXVoYW1tYWRlc3Nha2FrYWtoZWw5NjYiLCJhIjoiY2x2aHZyeXFtMThmODJpcGUybTU4am92bSJ9.BvyI0TitDCFSTYDcPTLdVA";

//     // Initialize the Map
//     mapInstance.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/light-v11",
//       // center: [-99.60013470916307, 43.13568298318132],
// center: [-98.91262079904816, 39.057864665205955],
//  zoom: 3.8 ,// Lower zoom level to show the entire country
// projection: "mercator", // Set the map projection to flat

//     });

//     if (restaurants.length > 0) {
//       const geojsonData = {
//         type: "FeatureCollection",
//         features: restaurants.map((restaurant) => ({
//           type: "Feature",
//           geometry: {
//             type: "Point",
//             coordinates: [restaurant.lng, restaurant.lat],
//           },
//           properties: {
//             name: restaurant.name,
//             address: restaurant.full_address,
//             category: restaurant.category,
//             rating: restaurant.score,
//           },
//         })),
//       };

//       mapInstance.current.on("load", () => {
//         mapInstance.current.addSource("restaurants", {
//           type: "geojson",
//           data: geojsonData,
//         });

//         mapInstance.current.addLayer({
//           id: "points",
//           type: "circle",
//           source: "restaurants",
//           paint: {
//             "circle-color": "red", // Color of the points
//             "circle-radius": 1.5, // Radius of the points
//             "circle-stroke-width": 1,
//             "circle-stroke-color": "#fff",
//           },
//         });

//         mapInstance.current.on("click", "points", (e) => {
//           const coordinates = e.features[0].geometry.coordinates.slice();
//           const { name, address, category, rating } = e.features[0].properties;

//           new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(
//               `<h3>${name}</h3><p><strong>Address:</strong> ${address}</p><p><strong>Category:</strong> ${category}</p><p><strong>Rating:</strong> ${rating}</p>`
//             )
//             .addTo(mapInstance.current);
//         });

//         // Change the cursor to a pointer when hovering over points
//         mapInstance.current.on("mouseenter", "points", () => {
//           mapInstance.current.getCanvas().style.cursor = "pointer";
//         });

//         // Change the cursor back to default when leaving points
//         mapInstance.current.on("mouseleave", "points", () => {
//           mapInstance.current.getCanvas().style.cursor = "";
//         });
//       });
//     }

//     return () => mapInstance.current.remove();
//   }, [restaurants]);

//   return <StyledContainer ref={mapContainer} />;
// };

// export default Map;

///////////////////////////////////////Chain filtering

// import React, { useContext, useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import styled from "styled-components";
// import { DataContext } from "../context/DataProvider";

// const StyledContainer = styled.div`
//   width: 100%;
//   height: 97vh;
//   margin: 0;
//   padding: 0;
// `;

// const Sidebar = styled.div`
//   position: absolute;
//   top: 10px;
//   left: 10px;
//   background: white;
//   z-index: 1;
//   padding: 10px;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
// `;

// const Map = () => {
//   const { restaurants, chains } = useContext(DataContext); // Using the DataContext
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
//   const mapContainer = useRef(null);
//   const mapInstance = useRef(null);

//   useEffect(() => {
//     setFilteredRestaurants(restaurants); // Set all restaurants initially
//   }, [restaurants]);

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoibXVoYW1tYWRlc3Nha2FrYWtoZWw5NjYiLCJhIjoiY2x2aHZyeXFtMThmODJpcGUybTU4am92bSJ9.BvyI0TitDCFSTYDcPTLdVA";

//     // Initialize the map
//     mapInstance.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/light-v11",
//       center: [-98.91262079904816, 39.057864665205955],
//       zoom: 3.8,
//       projection: "mercator",
//     });

//     // Wait for the map's style to fully load
//     mapInstance.current.on("load", () => {
//       console.log("Map style has loaded!");

//       if (filteredRestaurants.length > 0) {
//         const geojsonData = {
//           type: "FeatureCollection",
//           features: filteredRestaurants.map((restaurant) => ({
//             type: "Feature",
//             geometry: {
//               type: "Point",
//               coordinates: [restaurant.lng, restaurant.lat],
//             },
//             properties: {
//               name: restaurant.name,
//               address: restaurant.full_address,
//               category: restaurant.category,
//               rating: restaurant.score,
//             },
//           })),
//         };

//         // Add GeoJSON data to the map
//         mapInstance.current.addSource("restaurants", {
//           type: "geojson",
//           data: geojsonData,
//         });

//         mapInstance.current.addLayer({
//           id: "points",
//           type: "circle",
//           source: "restaurants",
//           paint: {
//             "circle-color": "red",
//             "circle-radius": 1.5,
//             "circle-stroke-width": 1,
//             "circle-stroke-color": "#fff",
//           },
//         });

//         // Add hover and click functionality
//         mapInstance.current.on("mouseenter", "points", () => {
//           mapInstance.current.getCanvas().style.cursor = "pointer";
//         });

//         mapInstance.current.on("mouseleave", "points", () => {
//           mapInstance.current.getCanvas().style.cursor = "";
//         });

//         mapInstance.current.on("click", "points", (e) => {
//           const coordinates = e.features[0].geometry.coordinates.slice();
//           const { name, address, category, rating } = e.features[0].properties;

//           new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(
//               `<h3>${name}</h3><p><strong>Address:</strong> ${address}</p><p><strong>Category:</strong> ${category}</p><p><strong>Rating:</strong> ${rating}</p>`
//             )
//             .addTo(mapInstance.current);
//         });
//       }
//     });

//     // Cleanup map instance
//     return () => mapInstance.current.remove();
//   }, [filteredRestaurants]);

//   const handleFilterChange = (e) => {
//     const selectedChainWithCount = e.target.value;

//     if (selectedChainWithCount === "All") {
//       setFilteredRestaurants(restaurants); // Show all restaurants
//     } else {
//       // Extract chain name from "Chain (Count)"
//       const selectedChain = selectedChainWithCount.split(" (")[0];

//       const filtered = restaurants.filter(

//         (restaurant) => restaurant.Chain === selectedChain
//       );
//       setFilteredRestaurants(filtered); // Filter by selected chain
//     }
//   };

//   return (
//     <>
//       <Sidebar>
//         {/* Text above dropdown */}
//         <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
//           <p>Location Universe shows US restaurant</p>
//           <p>locations by chain</p>
//         </div>
//         {/* Dropdown for filtering */}
//         <label htmlFor="chainFilter">Filter by Chain:</label>
//         <select id="chainFilter" onChange={handleFilterChange}>
//           {chains.map((Chain, index) => (
//             <option key={index} value={Chain}>
//               {Chain}
//             </option>
//           ))}
//         </select>

//       </Sidebar>
//       <StyledContainer ref={mapContainer} />
//     </>
//   );
// };

// export default Map;

//////////////////////////////////////
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import styled from "styled-components";
import { DataContext } from "../context/DataProvider";

const StyledContainer = styled.div`
  width: 100%;
  height: 97vh;
  margin: 0;
  padding: 0;
`;

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #ffffff, #f5f5f5);
  z-index: 10;
  width: 280px;
  height: 80vh;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  /* To ensure the scrollbar respects rounded corners */
  overflow: hidden; /* Prevents the scrollbar from breaking the rounded corners */

  /* Create an inner wrapper for scrolling */
  .scrollable-content {
    height: 100%;
    overflow-y: auto; /* Enable scrolling inside the wrapper */
    padding-right: 10px; /* Avoid content overlapping the scrollbar */
    box-sizing: content-box;
  }

  /* Slim and aesthetic scrollbar */
  .scrollable-content::-webkit-scrollbar {
    width: 6px;
  }

  .scrollable-content::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #cccccc, #888888);
    border-radius: 10px;
    border: 1px solid transparent;
    background-clip: padding-box;
  }

  .scrollable-content::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #aaaaaa, #666666);
  }

  .scrollable-content::-webkit-scrollbar-track {
    background: #f5f5f5;
    border-radius: 10px;
    margin: 4px 0;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
  }

  &:hover {
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
    transform: scale(1.01);
    transition: all 0.2s ease-in-out;
  }

  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
    transition: color 0.2s ease-in-out;
  }

  a:hover {
    color: #0056b3;
  }
`;


const Map = () => {
  const predefinedColors = [
    "blue",
    "red",
    "purple",
    "orange",
    "brown",
    "darkcyan",
  ];
  const { restaurants, chains, chainCounts } = useContext(DataContext);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [selectedChains, setSelectedChains] = useState(["All"]);
  const [ready, setReady] = useState(false);

  // Create chainColorMap to assign colors to different chains
  const chainColorMap = useMemo(() => {
    const colors = { All: "red" }; // Explicitly set "All" to red
    const sortedChains = Object.keys(chainCounts || {}).sort(
      (a, b) => chainCounts[b] - chainCounts[a]
    );
    sortedChains.forEach((chain, index) => {
      colors[chain] = predefinedColors[index % predefinedColors.length];
    });
    return colors;
  }, [chainCounts]);

  // Initialize the map
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoibXVoYW1tYWRlc3Nha2FrYWtoZWw5NjYiLCJhIjoiY2x2aHZyeXFtMThmODJpcGUybTU4am92bSJ9.BvyI0TitDCFSTYDcPTLdVA";

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-98.91262079904816, 39.057864665205955],
      zoom: 3,
      projection: "mercator",
    });

    // Set the map to ready state once it has loaded
    mapInstance.current.on("load", () => {
      console.log("Map style has loaded!");
      setReady(true); // Set ready state to true after map has loaded
    });

    return () => mapInstance.current.remove();
  }, []);

  // Update map only when `ready` is true and `chainColorMap` is ready
  useEffect(() => {
    if (ready && mapInstance.current && chainColorMap) {
      updateMap();
    }
  }, [selectedChains, ready, chainColorMap]);

  // Update map based on the selected chains and chainColorMap
  const updateMap = () => {
    if (!mapInstance.current.isStyleLoaded()) {
      console.error("Map style is not yet loaded. Aborting updateMap.");
      return;
    }

    if (mapInstance.current.getLayer("points")) {
      mapInstance.current.removeLayer("points");
    }
    if (mapInstance.current.getSource("restaurants")) {
      mapInstance.current.removeSource("restaurants");
    }

    const filteredData = restaurants.filter((restaurant) => {
      if (selectedChains.includes("All")) return true; // Show all data points
      return selectedChains.includes(restaurant.Chain);
    });

    const geojsonData = {
      type: "FeatureCollection",
      features: filteredData.map((restaurant) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [restaurant.lng, restaurant.lat],
        },
        properties: {
          name: restaurant.name,
          address: restaurant.full_address,
          chain: restaurant.Chain,
          category: restaurant.category,
          rating: restaurant.ratings,
          color: chainColorMap[selectedChains.includes("All") ? "All" : restaurant.Chain],
        },
      })),
    };

    mapInstance.current.addSource("restaurants", {
      type: "geojson",
      data: geojsonData,
    });

    mapInstance.current.addLayer({
      id: "points",
      type: "circle",
      source: "restaurants",
      paint: {
        "circle-color": ["get", "color"],
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          3,
          1.2,
          5,
          1.5,
          8,
          2.5,
          16,
          3,
        ],
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });
    console.log("Layer added:", mapInstance.current.getLayer("points"));

    // Add hover and click functionality
    mapInstance.current.on("mouseenter", "points", () => {
      mapInstance.current.getCanvas().style.cursor = "pointer";
    });

    mapInstance.current.on("mouseleave", "points", () => {
      mapInstance.current.getCanvas().style.cursor = "";
    });

    mapInstance.current.on("click", "points", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const { name, address, category,rating } = e.features[0].properties;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `<h3>${name}</h3><p><strong>Address:</strong> ${address}</p><p><strong>Category:</strong> ${category}</p><p><strong>Rating:</strong> ${rating}</p>`
        )
        .addTo(mapInstance.current);
    });
  };

  const handleChainSelection = (e) => {
    const selectedChain = e.target.value;

    setSelectedChains((prevChains) => {
      if (selectedChain !== "All" && prevChains.includes("All")) {
        return [selectedChain];
      }

      return prevChains.includes(selectedChain)
        ? prevChains.filter((chain) => chain !== selectedChain)
        : [...prevChains, selectedChain];
    });
  };

  const formatNumberWithCommas = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <>
      <Sidebar>
      <div className="scrollable-content">
    {/* Your scrollable content goes here */}
 
        <div style={{ marginBottom: "10px", fontWeight: "normal" }}>
          <p>Location Universe shows restaurant locations across the US. View all by region, or select and compare by chain/independents (number of locations shown in brackets). For more information, get in touch at <a href="mailto:hello@omnimeta.ai">hello@omnimeta.ai</a>.</p>
        </div>

        {/* Checkboxes Section */}
        <div style={{ marginTop: "20px" }}>
          <div>
            <input
              type="checkbox"
              value="All"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedChains(["All"]); // Select "All" only
                } else {
                  setSelectedChains([]); // Deselect all chains
                }
              }}
              checked={selectedChains.includes("All")}
            />
            <label style={{ color: "black" ,fontSize: "80%" }}> All ({formatNumberWithCommas(restaurants.length || 0)})</label>
          </div>

          {chains.map((chain) => (
            <div key={chain}>
              <input
                type="checkbox"
                value={chain}
                onChange={handleChainSelection}
                checked={selectedChains.includes(chain)}
              />
              <label style={{ color: "black" ,fontSize: "80%" }}>
                {chain} ({formatNumberWithCommas(chainCounts[chain] || 0)})
              </label>
            </div>
          ))}
        </div>
        </div>
      </Sidebar>

      <StyledContainer ref={mapContainer} />
    </>
  );
};

export default Map;