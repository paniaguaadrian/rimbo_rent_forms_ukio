// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../../components/Input";
import Button from "../../components/Button";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// Validation
import { isProperty } from "./validation";

// Constants
import { UPDATE_PROPERTY_INFO } from "./constants";

// Styles imported
import styles from "./register-user.module.scss";

// Multilanguage
import { withNamespaces } from "react-i18next";

// Google Maps Autocomplete
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const PropertyDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  const [rentalAddress, setRentalAddress] = useState("");
  const [rentalCity, setRentalCity] = useState(""); // eslint-disable-line
  const [rentalPostalCode, setRentalPostalCode] = useState(""); // eslint-disable-line

  // Google Maps Address and Zip Code
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);

    const addressComponents = results[0].address_components;

    const route = "route";
    const locality = "locality";
    const streetNumber = "street_number";
    const postalCode = "postal_code";

    if (
      addressComponents[0].types[0] === route &&
      addressComponents[1].types[0] === locality
    ) {
      tenancy.propertyDetails.rentalPostalCode = "";
      tenancy.propertyDetails.rentalAddress = results[0].formatted_address;
      setRentalPostalCode("");
      setRentalAddress(results[0].formatted_address);
      setRentalCity(results[0].address_components[1].long_name);
    } else if (
      addressComponents[0].types[0] === streetNumber && // number
      addressComponents[1].types[0] === route && // Street
      addressComponents[2].types[0] === locality && // Barcelona
      addressComponents[6].types[0] === postalCode
    ) {
      tenancy.propertyDetails.rentalPostalCode =
        results[0].address_components[6].long_name;
      tenancy.propertyDetails.rentalAddress = results[0].formatted_address;
      tenancy.propertyDetails.rentalCity =
        results[0].address_components[2].long_name;

      const street = results[0].address_components[1].long_name;
      const streetNumber = results[0].address_components[0].long_name;
      const city = results[0].address_components[2].long_name;
      const finalAddress = `${street}, ${streetNumber}, ${city}`;

      setRentalPostalCode(results[0].address_components[6].long_name);
      setRentalAddress(finalAddress);
      setRentalCity(results[0].address_components[2].long_name);
      tenancy.propertyDetails.rentalAddress = finalAddress;
    }
  };

  // Handle on change
  const handleProperty = ({ target }) => {
    setTenancy({
      type: UPDATE_PROPERTY_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    const errors = isProperty(tenancy.propertyDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleContinue}>
      <div className={styles.FormIntern}>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            {/* Google maps Autocomplete */}
            <PlacesAutocomplete
              value={rentalAddress}
              onChange={setRentalAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Input
                    id="googleInput"
                    {...getInputProps()}
                    label={t("F1SC.stepZero.renalAddress")}
                    placeholder={t("F1SC.stepZero.renalAddressPL")}
                    required
                    error={errors.rentalAddress}
                  />
                  <div className={styles.GoogleSuggestionContainer}>
                    {/* display sugestions */}
                    {loading ? <div>...loading</div> : null}
                    {suggestions.map((suggestion, place) => {
                      const style = {
                        backgroundColor: suggestion.active
                          ? "#24c4c48f"
                          : "#fff",
                        cursor: "pointer",
                      };
                      return (
                        <div
                          className={styles.GoogleSuggestion}
                          {...getSuggestionItemProps(suggestion, {
                            style,
                          })}
                          key={place}
                        >
                          <LocationOnIcon />
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="room"
              value={tenancy.propertyDetails.room}
              label={t("F1SC.stepZero.room")}
              placeholder={t("F1SC.stepZero.roomPL")}
              onChange={(e) => handleProperty(e)}
              error={errors.room}
            />
          </div>
        </div>

        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="date"
              name="rentStartDate"
              value={tenancy.propertyDetails.rentStartDate}
              label={t("F1SC.stepZero.rentStartDate")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentStartDate}
            />
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="date"
              name="rentEndDate"
              value={tenancy.propertyDetails.rentEndDate}
              label={t("F1SC.stepZero.rentEndDate")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentEndDate}
            />
          </div>
        </div>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="rentAmount"
              value={tenancy.propertyDetails.rentAmount}
              label={t("F1SC.stepZero.rentAmount")}
              sublabel={t("F1SC.stepZero.rentAmountTwo")}
              placeholder={t("F1SC.stepZero.rentAmountPL")}
              onChange={(e) => handleProperty(e)}
              error={errors.rentAmount}
            />
          </div>
          <div className={styles.FormLeft}>
            <div className={styles.selectContainer}>
              <label className={styles.selectLabel} htmlFor="product">
                {t("F1SC.stepZero.product")}
              </label>
              <select
                required
                name="product"
                className={styles.selectInput}
                value={tenancy.propertyDetails.product}
                onChange={(e) => handleProperty(e)}
              >
                <option name="product" value={t("F1SC.stepZero.productPL")}>
                  {t("F1SC.stepZero.productPL")}
                </option>

                <option name="product" value={t("F1SC.stepZero.productOne")}>
                  {t("F1SC.stepZero.productOne")}
                </option>

                <option name="product" value={t("F1SC.stepZero.productTwo")}>
                  {t("F1SC.stepZero.productTwo")}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.AloneButtonContainer}>
        <Button type="submit">{t("nextStepButton")}</Button>
      </div>
    </form>
  );
};

PropertyDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(PropertyDetails);
