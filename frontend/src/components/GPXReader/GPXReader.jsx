import { useEffect } from "react";
import "./GPXReader.scss";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";

function GPXLayer({ gpxUrl }) {
  const map = useMap();

  useEffect(() => {
    new L.GPX(gpxUrl, {
      async: true,
      marker: L.circleMarker([0, 0], { radius: 30 }),
      marker_options: {
        startIconUrl: "/images/pin-icon-start.png",
        endIconUrl: "/images/pin-icon-end.png",
        shadowUrl: "/images/pin-shadow.png",
      },
    })
      .on("loaded", function (e) {
        try {
          map.fitBounds(e.target.getBounds());
        } catch (error) {}
      })
      .addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution:
        '<a href="https://www.openstreetmap.org/">© les contributeurs d’OpenStreetMap</a>, <a href="https://www.openstreetmap.org/copyright">licence ODbL</a>',
    }).addTo(map);
  }, [gpxUrl, map]);

  return null;
}

function GPXReader({ gpxUrl }) {
  return (
    <MapContainer zoom={20} style={{ width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GPXLayer gpxUrl={gpxUrl} />
    </MapContainer>
  );
}

GPXReader.propTypes = {
  gpxUrl: PropTypes.string,
};

GPXLayer.propTypes = {
  gpxUrl: PropTypes.string,
};

export default GPXReader;
