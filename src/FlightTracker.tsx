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

import * as Cesium from "cesium";
import flightData from "@/assets/data/flightData.json";

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

    createOsmBuildingsAsync().then((osmBuildings) => {
      viewer.scene.primitives.add(osmBuildings);
    });

    // STEP 3 CODE (all points)
    // These are all the radar points from this flight.
    // const flightData = JSON.parse("");
    // Create a point for each.

    const timeStepInSeconds = 30;
    const totalSeconds = timeStepInSeconds * (flightData.length - 1);
    const start = Cesium.JulianDate.fromIso8601("2020-03-09T23:10:00Z");
    const stop = Cesium.JulianDate.addSeconds(
      start,
      totalSeconds,
      new Cesium.JulianDate()
    );

    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.timeline.zoomTo(start, stop);

    viewer.clock.multiplier = 50;

    viewer.clock.shouldAnimate = true;

    const positionProperty = new Cesium.SampledPositionProperty();

    flightData.forEach((dataPoint, i) => {
      const { longitude, latitude, height } = dataPoint;

      const time = Cesium.JulianDate.addSeconds(
        start,
        i * timeStepInSeconds,
        new Cesium.JulianDate()
      );

      const position = Cesium.Cartesian3.fromDegrees(
        longitude,
        latitude,
        height
      );

      positionProperty.addSample(time, position);

      viewer.entities.add({
        description: `Location: (${longitude}, ${latitude}, ${height})`,
        position,
        point: { pixelSize: 10, color: Cesium.Color.RED },
      });
    });

    const airplaneEntity = viewer.entities.add({
      availability: new Cesium.TimeIntervalCollection([
        new Cesium.TimeInterval({ start, stop }),
      ]),
      position: positionProperty,
      point: {
        pixelSize: 30,
        color: Cesium.Color.GREEN,
      },
      path: new Cesium.PathGraphics({ width: 3 }),
    });

    viewer.trackedEntity = airplaneEntity;

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
