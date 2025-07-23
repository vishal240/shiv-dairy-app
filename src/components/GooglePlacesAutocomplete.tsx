import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Controller } from "react-hook-form";

interface GooglePlacesAutocompleteProps {
  onSelect: (address: string) => void;
  placeholder?: string;
  register?: any;
  control: any;
  name: string;
  label: string;
  error?: string;
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  onSelect,
  control,
  name,
  label,
  error,
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      const addressObj: any = {};
      if (!place.address_components) return;
      place.address_components.forEach((component) => {
        const types = component.types;

        if (types.includes("street_number")) {
          addressObj.plotNo = component.long_name;
        }
        if (types.includes("route")) {
          addressObj.street = component.long_name;
        }
        if (types.includes("locality")) {
          addressObj.city = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          addressObj.state = component.long_name;
        }
        if (types.includes("country")) {
          addressObj.country = component.long_name;
        }
        if (types.includes("postal_code")) {
          addressObj.postalCode = component.long_name;
        }
      });

      onSelect(addressObj);
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handlePlaceSelect}
    >
      <div className="mb-4">
        <label htmlFor={name} className="lbl">
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => <input {...field} className="input_text" />}
        />
        {error && (
          <p
            className="alert alert-danger"
            style={{
              fontSize: "12px",
              marginTop: "5px",
              padding: "8px",
              marginBottom: "15px",
              backgroundColor: "#ffe6e6",
              color: "#d63384",
              border: "1px solid #f5c6cb",
              borderRadius: "5px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </Autocomplete>
  );
};

export default GooglePlacesAutocomplete;
