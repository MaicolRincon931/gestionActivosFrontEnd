import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";

// Set the Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoibWFpY29scmluY29uOTMiLCJhIjoiY205MGxnZ2hyMDlyZDJtcHF0MHpwdTU4diJ9.GI8qbl2o_nlyzYjSL1cxBw";

type Asset = {
  _id: string;
  name: string;
  comments: string;
  latitude: number;
  longitude: number;
  created_at: string;
  icon: string;
};

type MapComponentProps = {
  assets: Asset[];
};

const MapComponent: React.FC<MapComponentProps> = ({ assets }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainer.current || assets.length === 0) return;

    const lng = assets[0].longitude;
    const lat = assets[0].latitude;

    if (isNaN(lng) || isNaN(lat)) return;

    if (!mapInstance.current) {
      // Initialize map instance if not created yet
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: 12,
      });

      // Capture clicks on the map (only if it's not on a marker)
      mapInstance.current.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        console.log("Latitud:", lat, "Longitud:", lng);
        navigate(`/assets/create?lat=${lat}&lng=${lng}`);
      });
    }

    // Loop through assets and add markers
    assets.forEach((asset) => {
      const assetLng = asset.longitude;
      const assetLat = asset.latitude;

      if (!isNaN(assetLng) && !isNaN(assetLat) && mapInstance.current) {
        // Create a custom HTML element for the marker
        const el = document.createElement("div");
        el.className = "custom-marker";

        // Image for the marker
        const img = document.createElement("img");
        img.src = `/${asset.icon}`;
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.borderRadius = "50%";

        el.appendChild(img);

        // Create a popup with full asset information
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 25,
        }).setHTML(`
          <div style="font-size: 14px;">
            <strong>${asset.name}</strong><br/>
            <small><i>${asset.comments}</i></small><br/>
            <b>Lat:</b> ${asset.latitude}, <b>Lng:</b> ${asset.longitude}<br/>
            <b>Creado:</b> ${new Date(asset.created_at).toLocaleString()}
          </div>
        `);

        // Show popup on hover
        el.addEventListener("mouseenter", () => popup.addTo(mapInstance.current!));
        el.addEventListener("mouseleave", () => popup.remove());

        // Click event to navigate to asset edit page
        el.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent map click event
          navigate(`/assets/${asset._id}/edit`);
        });

        new mapboxgl.Marker({ element: el })
          .setLngLat([assetLng, assetLat])
          .addTo(mapInstance.current);
      }
    });

    // Cleanup function to remove map instance on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [assets, navigate]);

  return <div ref={mapContainer} className="w-full h-[80vh]" />;
};

export default MapComponent;
