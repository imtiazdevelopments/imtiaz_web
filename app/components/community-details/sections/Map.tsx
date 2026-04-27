"use client";
import Image from "next/image";

import { Map, Marker } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";

const MapOriginal = () => {
  const latitude = "25.1972";
  const longitude = "55.2744";;
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  return (
    <section data-header="dark" className="w-full py-[70px] lg:py-120 3xl:py-160">
      <div className="h-[488px] lg:h-[839px] ">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
      <Map
        defaultCenter={{ lat, lng }}
        defaultZoom={15}
        mapId="2567b86b459988d06657407f"
        className="w-full h-full"
        disableDefaultUI={true}
        
      >
        <Marker
          position={{ lat, lng }}
          icon={{
            url: "/active-icon.svg", // always active icon
          }}
        />
      </Map>
      </APIProvider>
      </div>
    </section>
  );
};

export default MapOriginal;
