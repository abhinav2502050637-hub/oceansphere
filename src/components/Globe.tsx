import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';

// Ensure Cesium CSS is imported
import 'cesium/Build/Cesium/Widgets/widgets.css';

import { Location, ObservationMarker, GridPoint, OceanVariable } from '../types/ocean';
import { Globe as GlobeIcon, Radio, Layers } from 'lucide-react';

interface GlobeProps {
  selectedLocation: Location;
  onSelectLocation: (lat: number, lon: number) => void;
  observations: ObservationMarker[];
  gridPoints: GridPoint[];
  selectedVariable: OceanVariable;
  flyToArabianSeaTrigger: number;
}

export const Globe: React.FC<GlobeProps> = ({
  selectedLocation,
  onSelectLocation,
  observations,
  gridPoints,
  selectedVariable,
  flyToArabianSeaTrigger,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const pinEntityRef = useRef<Cesium.Entity | null>(null);
  const obsEntitiesRef = useRef<Cesium.Entity[]>([]);
  const gridEntitiesRef = useRef<Cesium.Entity[]>([]);

  // 1. Initialize Cesium Viewer on Mount
  useEffect(() => {
    if (!containerRef.current) return;

    Cesium.Ion.defaultAccessToken = '';

    const viewer = new Cesium.Viewer(containerRef.current, {
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      infoBox: true,
      selectionIndicator: false,
      timeline: false,
      animation: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
    });

    // Add free ArcGIS World Imagery layer asynchronously for Cesium 1.116+ compatibility
    Cesium.ArcGisMapServerImageryProvider.fromUrl(
      'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    )
      .then((provider) => {
        if (viewer && !viewer.isDestroyed()) {
          viewer.imageryLayers.addImageryProvider(provider);
        }
      })
      .catch(() => {
        // Fallback to TileMapService if offline
      });

    // Polish Atmosphere & Ocean Rendering
    viewer.scene.globe.enableLighting = true;
    viewer.scene.globe.showGroundAtmosphere = true;
    viewer.scene.globe.depthTestAgainstTerrain = false;

    // Camera Focus: Indian Ocean & Arabian Sea Sector
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(73.0, 15.0, 7500000.0),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-85.0),
        roll: 0.0,
      },
    });

    // Globe Click Handler
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click: any) => {
      const pickedObject = viewer.scene.pick(click.position);
      if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
        const props = pickedObject.id.properties;
        if (props.latitude && props.longitude) {
          onSelectLocation(props.latitude.getValue(), props.longitude.getValue());
          return;
        }
      }

      const ray = viewer.camera.getPickRay(click.position);
      if (ray) {
        const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
        if (cartesian) {
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          const lat = Cesium.Math.toDegrees(cartographic.latitude);
          const lon = Cesium.Math.toDegrees(cartographic.longitude);
          onSelectLocation(Number(lat.toFixed(2)), Number(lon.toFixed(2)));
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    viewerRef.current = viewer;

    return () => {
      handler.destroy();
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  // 2. Handle Fly To Arabian Sea
  useEffect(() => {
    if (!viewerRef.current || flyToArabianSeaTrigger === 0) return;

    viewerRef.current.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(65.5, 15.5, 2200000.0),
      orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-70.0),
        roll: 0.0,
      },
      duration: 2.5,
    });
  }, [flyToArabianSeaTrigger]);

  // 3. Update Pin Marker for Selected Location
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    if (pinEntityRef.current) {
      viewer.entities.remove(pinEntityRef.current);
      pinEntityRef.current = null;
    }

    if (selectedLocation) {
      pinEntityRef.current = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          selectedLocation.longitude,
          selectedLocation.latitude,
          5000
        ),
        point: {
          pixelSize: 14,
          color: Cesium.Color.fromCssColorString('#00f0ff'),
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 3,
          heightReference: Cesium.HeightReference.NONE,
        },
        label: {
          text: `📍 (${selectedLocation.latitude}°, ${selectedLocation.longitude}°)`,
          font: 'bold 12px Outfit, sans-serif',
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          pixelOffset: new Cesium.Cartesian2(0, -24),
        },
      });
    }
  }, [selectedLocation]);

  // 4. Render In-Situ Argo Float Markers
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    obsEntitiesRef.current.forEach((entity) => viewer.entities.remove(entity));
    obsEntitiesRef.current = [];

    observations.forEach((obs) => {
      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(obs.longitude, obs.latitude, 2000),
        point: {
          pixelSize: 12,
          color: Cesium.Color.fromCssColorString('#2dd4bf'),
          outlineColor: Cesium.Color.fromCssColorString('#121212'),
          outlineWidth: 2,
        },
        label: {
          text: `⚓ ${obs.id}`,
          font: '10px Inter, sans-serif',
          fillColor: Cesium.Color.fromCssColorString('#2dd4bf'),
          pixelOffset: new Cesium.Cartesian2(0, 18),
        },
        properties: {
          latitude: obs.latitude,
          longitude: obs.longitude,
          name: obs.name,
          id: obs.id,
        },
      });
      obsEntitiesRef.current.push(entity);
    });
  }, [observations]);

  // 5. Render Data Grid Surface Points
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    gridEntitiesRef.current.forEach((entity) => viewer.entities.remove(entity));
    gridEntitiesRef.current = [];

    gridPoints.forEach((pt) => {
      let color = Cesium.Color.CYAN;

      if (selectedVariable === 'temperature') {
        const norm = Math.max(0, Math.min(1, (pt.temperature - 5) / 25));
        color = Cesium.Color.fromHsl((1.0 - norm) * 0.65, 0.9, 0.5, 0.85);
      } else if (selectedVariable === 'salinity') {
        const norm = Math.max(0, Math.min(1, (pt.salinity - 33) / 4));
        color = Cesium.Color.fromHsl(0.5 + norm * 0.4, 0.85, 0.5, 0.85);
      } else if (selectedVariable === 'currents') {
        const norm = Math.max(0, Math.min(1, pt.current_speed / 1.5));
        color = Cesium.Color.fromHsl(0.6 - norm * 0.4, 0.9, 0.5, 0.85);
      }

      const entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(pt.longitude, pt.latitude, 1000),
        ellipse: {
          semiMinorAxis: 40000.0,
          semiMajorAxis: 40000.0,
          material: color,
          height: 100,
        },
        properties: {
          latitude: pt.latitude,
          longitude: pt.longitude,
        },
      });
      gridEntitiesRef.current.push(entity);
    });
  }, [gridPoints, selectedVariable]);

  return (
    <div className="relative w-full h-full bg-[#121212]">
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating Corporate Telemetry HUD Overlay */}
      <div className="absolute top-4 left-4 glass-bento px-4 py-2.5 rounded-2xl border border-white/10 text-xs flex items-center space-x-3 text-slate-200 shadow-2xl pointer-events-none z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse glow-neon-blue"></span>
        <span className="font-mono tracking-wider font-semibold">
          3D GEOSPATIAL ENGINE ONLINE | CLICK GLOBE TO SAMPLE PARAMETERS
        </span>
      </div>

      {/* Bottom Telemetry HUD Bar */}
      <div className="absolute bottom-4 left-4 glass-bento px-4 py-2 rounded-xl border border-white/10 text-[11px] font-mono text-slate-300 flex items-center space-x-4 pointer-events-none z-10">
        <div className="flex items-center space-x-1.5">
          <GlobeIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sector: Indian Ocean / Arabian Sea</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Radio className="w-3.5 h-3.5 text-teal-400" />
          <span>Active Floats: {observations.length}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Grid Points: {gridPoints.length}</span>
        </div>
      </div>
    </div>
  );
};
