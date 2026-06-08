"use client";

import { Map, Marker } from "@vis.gl/react-google-maps";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useState } from "react";

const MapOriginal = ({
  latitude = "25.1972",
  longitude = "55.2744",
}: {
  latitude: string;
  longitude: string;
}) => {
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  const [zoom, setZoom] = useState(15);

const BASE_SIZE = 150;
const iconSize = zoom >= 15
  ? BASE_SIZE
  : Math.max(30, BASE_SIZE * (zoom / 15) * 0.9);

  return (
    <section data-header="dark" className="w-full h-[488px] lg:h-[679px]">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API as string}>
        <Map
          defaultCenter={{ lat, lng }}
          defaultZoom={15}
          className="w-full h-full"
          gestureHandling={"cooperative"}
          disableDefaultUI={true}
          onZoomChanged={(e) => setZoom(e.detail.zoom)}
          styles={[
            { elementType: "geometry", stylers: [{ saturation: -100 }] },
            { elementType: "labels.icon", stylers: [{ saturation: -100 }] },
            {
              elementType: "labels.text.fill",
              stylers: [{ saturation: -100 }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ saturation: -100 }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ saturation: -100 }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ saturation: -100 }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ saturation: -100 }],
            },
          ]}
        >
          <Marker
            position={{ lat, lng }}
            icon={{
              url: "/active-icon.svg",
              scaledSize: {
                width: iconSize,
                height: iconSize,
                equals: () => false,
              } as google.maps.Size,
              anchor: {
                x: iconSize / 2,
                y: iconSize / 2,
                equals: () => false,
              } as google.maps.Point,
            }}
          />
        </Map>
      </APIProvider>
    </section>
  );
};

export default MapOriginal;
