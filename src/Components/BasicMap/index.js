/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { formatRelative } from "date-fns";
import { Button, Select } from "antd";
import { CompassOutlined } from "@ant-design/icons";

const { Option } = Select;
const libraries = ["places"];
const mapContainerStyle = {
  height: "250px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function LocationMap({ setLngLat, lngLat }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });

  const center = {
    lng: lngLat.long,
    lat: lngLat.lat,
  };

  const [markers, setMarkers] = useState([
    {
      lng: lngLat.long,
      lat: lngLat.lat,
    },
  ]);

  const [selected, setSelected] = useState(null);

  const onMapClick = React.useCallback((e) => {
    setMarkers(() => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
    setLngLat({
      lat: e.latLng.lat(),
      long: e.latLng.lng(),
    });
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(async ({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);

    setMarkers(() => [
      {
        lat,
        lng,
        time: new Date(),
      },
    ]);

    setLngLat({
      long: lng,
      lat: lat,
    });
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map-box" style={{ position: "relative", width: "100%" }}>
      {lngLat.long && lngLat.lat ? "" : <div className="empty-component"></div>}

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  📌
                </span>{" "}
                This is you!
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <Button
      className="locate"
      type="primary"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
      icon={<CompassOutlined />}
    />
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 0, lng: () => 0 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (value) => {
    setValue(value);
  };

  const handleSelect = async (value) => {
    setValue(value, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: value });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Select
        showSearch
        placeholder="Search your location"
        optionFilterProp="children"
        onChange={handleSelect}
        value={value}
        disabled={!ready}
        onSearch={handleInput}
        style={{ width: "100%" }}
      >
        {status === "OK" &&
          data.map(({ id, description }) => (
            <Option key={id} value={description}>
              {description}
            </Option>
          ))}
      </Select>
    </div>
  );
}
