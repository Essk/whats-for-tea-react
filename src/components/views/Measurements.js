import React, {Fragment, useEffect, useState } from "react";
import { EditableMeasurement } from "../EditableMeasurement";

const getMeasurements = async (cb) => {
  if (!cb) {
    console.warn('getMeasurements needs a callback');
    return;
  }
  const response = await fetch('http://localhost:3000/api/measurement');
  const measurements = await response.json();
  cb(measurements);
};

const saveMeasurement = async (measurement) => {
  const {
    _id,
    slug,
    unitName,
    notationSingular,
    notationPlural,
    parentMeasure,
    parentThreshold,
  } = measurement;
  const canSave = ( unitName && notationSingular && notationPlural);
  if(!canSave) {
    console.log('not a measurment we can save', measurement);
    return;
  }
  const slugUrlPart = slug ? slug : 'new';
  const saveUrl = `http://localhost:3000/api/measurement/${slugUrlPart}?`;
  const queryParams = [...Object.keys(measurement)]
    .filter(key => Boolean(measurement[key]))
    .filter(key => {
      if(parentMeasure) {
        console.log('yes')
        return true;
      }
      return key !== 'parentThreshold'
    })
    .map(key => `${ key }=${ measurement[key]}`)
  console.log(queryParams)
  /*
  const response = await fetch(saveUrl, {
    method: 'PUT',
  });
  const result = await response.json();
  console.log(result)
  */
}

const MeasurementsView = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  const testMeasurement = {
    unitName :'test measurement',
    notationSingular :'measurement',
    notationPlural : 'test measurements',
  }

  useEffect(() => {
    if (MeasurementsView.length) {
      setLoadingStatus(false);
    }
  }, [measurements]);

  if (!loadingStatus && !measurements.length) {
    setLoadingStatus(true);
    getMeasurements(m => setMeasurements(m));
  }

  return (
    <Fragment>
      {
        measurements?.length ? (
          <ul>
            {
              measurements.map((m) => (
                <li key={m._id}>{m.unitName}</li>
              ))
            }
          </ul>
        )
          : null
      }
      <EditableMeasurement
        measurement={testMeasurement}
        measurements={measurements}
        onSave={saveMeasurement}
        />
    </Fragment>
  )
};

export { MeasurementsView };
