/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/blocks/contact-info/view.js ***!
  \*****************************************/
(() => {
  // Silver base
  const SILVER_BASE = [{
    elementType: 'geometry',
    stylers: [{
      color: '#f5f5f5'
    }]
  }, {
    elementType: 'labels.icon',
    stylers: [{
      visibility: 'off'
    }]
  }, {
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#616161'
    }]
  }, {
    elementType: 'labels.text.stroke',
    stylers: [{
      color: '#f5f5f5'
    }]
  }, {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#bdbdbd'
    }]
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{
      color: '#eeeeee'
    }]
  }, {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#757575'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{
      color: '#e5e5e5'
    }]
  }, {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#9e9e9e'
    }]
  }, {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{
      color: '#ffffff'
    }]
  }, {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#757575'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{
      color: '#dadada'
    }]
  }, {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#616161'
    }]
  }, {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#9e9e9e'
    }]
  }, {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{
      color: '#e5e5e5'
    }]
  }, {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{
      color: '#eeeeee'
    }]
  }, {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{
      color: '#9e9e9e'
    }]
  }];
  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }
  function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || '').trim());
    if (!m) return {
      r: 201,
      g: 201,
      b: 201
    };
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16)
    };
  }
  function rgbToHex({
    r,
    g,
    b
  }) {
    const toHex = v => v.toString(16).padStart(2, '0');
    return `#${toHex(clamp(Math.round(r), 0, 255))}${toHex(clamp(Math.round(g), 0, 255))}${toHex(clamp(Math.round(b), 0, 255))}`;
  }
  function mix(c1, c2, ratio) {
    const inv = 1 - ratio;
    return {
      r: c1.r * inv + c2.r * ratio,
      g: c1.g * inv + c2.g * ratio,
      b: c1.b * inv + c2.b * ratio
    };
  }
  function lighten(hex, pct) {
    const c = hexToRgb(hex);
    const w = {
      r: 255,
      g: 255,
      b: 255
    };
    return rgbToHex(mix(c, w, pct));
  }
  function silverWithAccent(accentHex) {
    const water = accentHex || '#2c944b';
    const park = lighten(water, 0.75);
    const highway = lighten(water, 0.85);
    const transit = lighten(water, 0.8);
    const custom = [{
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{
        color: water
      }]
    }, {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{
        color: park
      }]
    }, {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{
        color: highway
      }]
    }, {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [{
        color: transit
      }]
    }];
    return [...SILVER_BASE.filter(s => !(s.featureType === 'water' && s.elementType === 'geometry' || s.featureType === 'poi.park' && s.elementType === 'geometry' || s.featureType === 'road.highway' && s.elementType === 'geometry' || s.featureType === 'transit.line' && s.elementType === 'geometry')), ...custom];
  }
  function loadGoogleMaps(apiKey) {
    return new Promise((resolve, reject) => {
      if (window.google?.maps?.Map) return resolve(window.google.maps);
      if (!apiKey) return reject(new Error('Missing Google Maps API key'));
      if (window.__ggbFrontMaps_resolve) {
        window.__ggbFrontMaps_resolve.push(resolve);
        return;
      }
      window.__ggbFrontMaps_resolve = [resolve];
      window.__ggbFrontReady = () => {
        (window.__ggbFrontMaps_resolve || []).forEach(fn => fn(window.google.maps));
        window.__ggbFrontMaps_resolve = null;
      };
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&callback=__ggbFrontReady`;
      s.async = true;
      s.defer = true;
      s.onerror = () => reject(new Error('Google Maps failed to load'));
      document.head.appendChild(s);
    });
  }
  function initAll() {
    const nodes = document.querySelectorAll('.ggb-map');
    if (!nodes.length) return;
    const apiKey = window.ggBlocks?.googleMapsApiKey;
    loadGoogleMaps(apiKey).then(() => {
      nodes.forEach(el => {
        const lat = parseFloat(el.getAttribute('data-lat'));
        const lng = parseFloat(el.getAttribute('data-lng'));
        if (!isFinite(lat) || !isFinite(lng)) return;
        const zoom = parseInt(el.getAttribute('data-zoom') || '14', 10);
        const type = el.getAttribute('data-type') || 'roadmap';
        const accent = el.getAttribute('data-accent') || '#2c944b';
        const map = new google.maps.Map(el, {
          center: {
            lat,
            lng
          },
          zoom,
          mapTypeId: type,
          styles: silverWithAccent(accent),
          fullscreenControl: false,
          streetViewControl: false,
          rotateControl: false
        });
        new google.maps.Marker({
          map,
          position: {
            lat,
            lng
          }
        });
      });
    }).catch(() => {
      // If Maps fails, leave the container as-is (no crash).
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
/******/ })()
;
//# sourceMappingURL=view.js.map