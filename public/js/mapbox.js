/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibGluZHNleWRvcnRjaCIsImEiOiJjbGU2MTUwYXkwMzV2M25xbzRhbHc4dndnIn0.zsPDWXaebcNNBYjBuNTuEw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lindseydortch/clw0sh3m90asf01pk5qdqddfz',
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 10
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchore: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
      focusAfterOpen: false
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 150, left: 100, right: 100 }
  });
};
