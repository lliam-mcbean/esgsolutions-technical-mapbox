import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import * as THREE from 'three';
import data from '../data/earthquakes.json';
import fragmentShader from '../shaders/topo/fragment.glsl';
import vertexShader from '../shaders/topo/vertex.glsl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useInfo } from '../context/info';

const MapboxExample = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const { setInfo, earthquakeRange } = useInfo();
  const meshesRef = useRef([]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/standard-satellite', 
      center: [-116, 53], 
      zoom: 5, 
      pitch: 45, 
      bearing: 0,
      antialias: true,
    });

    mapRef.current.on('style.load', () => {
      mapRef.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-v2',
        tileSize: 512,
        maxzoom: 14,
      });

      mapRef.current.addLayer({
        id: 'terrain-layer',
        type: 'hillshade',
        source: 'mapbox-dem',
        paint: {
          'hillshade-exaggeration': 0.5,
        },
      });

      mapRef.current.addLayer({
        id: 'contour-lines',
        type: 'line',
        source: 'mapbox-dem',
        'source-layer': 'contours',
        paint: {
          'line-color': '#ff0000', 
          'line-width': 10, 
        },
      });

      mapRef.current.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });

      mapRef.current.addLayer({
        id: 'custom-threebox-spheres',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function () {
          window.tb = new Threebox(
            mapRef.current,
            mapRef.current.getCanvas().getContext('webgl'),
            { defaultLights: true }
          );

          data.forEach((item) => {
            const sphereGeometry = new THREE.SphereGeometry(1000 * item["ML"]); 
            const sphereMaterial = new THREE.ShaderMaterial({
              fragmentShader,
              vertexShader,
              uniforms: {
                uAmplitude: { value: item["ML"] },
              },
            });
            const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphereMesh.userData = item;

            const sphere = window.tb.Object3D({ obj: sphereMesh, units: 'meters', metaData: item });
            sphere.setCoords([item["Longitude"], item["Latitude"]]);
            window.tb.add(sphere);

            meshesRef.current.push(sphere);
          });

          mapContainerRef.current.addEventListener('click', onMeshClick);
        },

        render: function () {
          if (window.tb) {
            window.tb.update();
          }
        },
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      if (mapContainerRef.current) {
        mapContainerRef.current.removeEventListener('click', onMeshClick);
      }
    };
  }, []);

  useEffect(() => {
    if (meshesRef.current.length > 0) {
      meshesRef.current.forEach((mesh) => {
        const amplitude = mesh.userData.metaData["ML"];
        mesh.visible = amplitude > earthquakeRange;
      });
      if (window.tb) {
        window.tb.update();
      }
      if (mapRef.current) {
        mapRef.current.triggerRepaint(); 
      }
    }
  }, [earthquakeRange]);

  const onMeshClick = (event) => {
    const rect = mapContainerRef.current.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, window.tb.camera);

    const intersects = raycaster.intersectObjects(window.tb.scene.children, true);

    if (intersects.length > 0) {
      const clickedSphere = intersects[0].object;
      const itemData = clickedSphere.userData;
      setInfo({
        amplitude: itemData["ML"],
        coords: [itemData["Latitude"], itemData["Longitude"]],
        location: itemData["Location"],
      });
    }
  };

  return <div id="map" ref={mapContainerRef} style={{ height: '100vh', width: '100vw' }}></div>;
};

export default MapboxExample;