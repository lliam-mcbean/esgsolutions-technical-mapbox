# esgsolutions-technical

This solution solves the mapping projection issues by integrating three.js with the Mapbox GL API. We are rendering the data in a similar way but using the coordinate system integrated with the api to set the position of the geometries based of lat, long. Meshes are clickable and will fill the UI element with relevant data. Meshes are togglable based on amplitude with a slider. Another addition that would be nice to see is to instance the meshes to make it easier to toggle rendered meshes, right now we are just toggling visibility rather than removing them from the scene

requirements: 

 1. 3D Scene

 [x] create 3d scene using Three.js where each earthquake is represented as a sphere
    
 [x] The sphere's position (x, y, z) corresponds to the x, y, z coordinates in the CSV file.
    
 [x] The sphere's size should scale with the magnitude of the earthquake.
 
 2. Map Tile
 
 [x] Overlay a flat map tile (e.g., from ArcGIS) at depth z = 0 to represent the base layer.

 [x] Align earthquake coordinates with map

 3. Interactive Camera

 [x] Allow the user to rotate, zoom, and pan the view to inspect the scene.

Nice To Haves

 1. Event Interaction

 [x] Make each sphere clickable. When clicked, display the earthquake's details (e.g., magnitude, x, y, z) in a UI element.

 2. Customizations

 [x] Color-code the spheres based on their magnitude (e.g., green for small, yellow for medium, red for large).

 [] Animate the spheres to "pulse" for a short duration when clicked.

 3. Real Time Adjustments

 [x] Provide a slider or input field to filter earthquakes by magnitude, hiding those below the threshold.
# esgsolutions-technical-mapbox
