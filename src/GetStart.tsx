import { useRef, useEffect, type CSSProperties } from "react";
import "./App.css";
import "cesium/Build/Cesium/Widgets/widgets.css";

import {
  Cartesian3,
  createOsmBuildingsAsync,
  Ion,
  Math as CesiumMath,
  Terrain,
  Viewer,
} from "cesium";

function App() {
  const cesiumContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = cesiumContainer.current;
    if (!div) return;

    Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYTVmNGEyNi00M2UzLTQ0NDYtOGZlMi03MjdiNWQxYTZiMGYiLCJpZCI6MTU3MjkzLCJpYXQiOjE2OTA3MDY5MTB9.rTXe3QuNYa1x7uMKASnDTtDz58ED2elcDpUw3Ylf5i4";

    const viewer = new Viewer(div, {
      terrain: Terrain.fromWorldTerrain(),
    });

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-15.0),
      },
    });

    createOsmBuildingsAsync().then((buildingTileset) => {
      viewer.scene.primitives.add(buildingTileset);
    });


    return () => {
      viewer.destroy();
    };
  }, [cesiumContainer]);

  const conStyle: CSSProperties = {
    width: "100vw",
    height: "100vh",
  };

  return <div ref={cesiumContainer} style={conStyle}></div>;
}

export default App;