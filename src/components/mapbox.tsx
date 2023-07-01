import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import { env } from "~/env.mjs";
import { useToast } from "~/components/ui/use-toast";

// Mapbox CSS
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Button } from "./ui/button";
import { api } from "~/utils/api";
import Link from "next/link";
import OnboardingDialog from "./onboarding-dialog";

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;


const mapboxDrawOptions = new MapboxDraw({
  displayControlsDefault: false,
  // Select which mapbox-gl-draw control buttons to add to the map.
  controls: {
    polygon: true,
    trash: true,
  },

  // Set mapbox-gl-draw to draw by default.
  // The user does not have to click the polygon control button first.
  defaultMode: "draw_polygon",
});

export default function Mapbox() {
  /*
   * trpc mutation -> src/server/api/routers/geoJson.ts
   */
  const { mutate: createGeoJson } = api.geoJson.create.useMutation();

  const { toast } = useToast();

  // Initial map config
  const mapContainerRef = useRef(null);
  const [draw, setDraw] = useState(mapboxDrawOptions);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const lat = 39.5;
    const lng = -98.35;
    const zoom = 4;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/blakeha94/cljk67yl500do01p1g88y9zui",
      center: [lng, lat],
      zoom: zoom,
    });

    // Create a new Draw instance anytime the map is loaded
    // TRPC causes a re-render, so we need to re-create the instance
    setDraw(mapboxDrawOptions);

    // Draw controls
    map.addControl(draw, "top-right");
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Clean up on unmount
    return () => map.remove();
  }, [draw]);

  function saveGeoJson() {
    if (!draw) return;

    const data = draw.getAll();

    if (!data.features.length) {
      alert("There are no polygons to save!");
      return;
    }

    // Send data to server to save to db
    createGeoJson({ geoJson: JSON.stringify(data.features) });

    // Notify user of success
    toast({
      description: "Successfully saved plot data!",
    });
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <div className="container flex h-[80px] items-center justify-between">
        <Link href="/">
          <h1 className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text font-extrabold text-transparent">
            mapDash.
          </h1>
        </Link>
        <div>
          <OnboardingDialog />
          <Button type="submit" className="ml-4" onClick={saveGeoJson}>
            Save
          </Button>
        </div>
      </div>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}
