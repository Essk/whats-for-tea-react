import React, {Fragment, useEffect, useState } from "react";
import { EditableMeasurement } from "../EditableMeasurement";
import { EditableListItem } from "../EditableList";

const getMeasurements = async (cb) => {
  if (!cb) {
    console.warn('getMeasurements needs a callback');
    return;
  }
  const response = await fetch('http://localhost:3000/api/measurement');
  const measurements = await response.json();
  cb(measurements);
};

const createSaveHandler = (update) => async (measurement) => {
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
  const saveUrl = `http://localhost:3000/api/measurement/${slugUrlPart}`;
  const queryParams = [...Object.keys(measurement)]
    .filter(key => Boolean(measurement[key]))
    .filter(key => {
      if(parentMeasure) {
        return true;
      }
      return key !== 'parentThreshold'
    })
    .map(key => `${ key }=${ measurement[key]}`)
    .join('&');
  const response = await fetch(`${saveUrl}?${queryParams}`, {
    method: 'PUT',
  });
  const result = await response.json();
  if(result){
    console.log('save success');
    console.log(result);
    update()
  }
}

const createDeleteHandler = (measurement, update) => {
  return async () => {
    const { slug } = measurement;
    if (!slug) {
      console.log('can\'t delete', measurement);
      return;
    };
    const deleteUrl = `http://localhost:3000/api/measurement/${ slug }`;
    console.log('deleting measurement at', deleteUrl);
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (JSON.stringify(result) === '{}') {
      console.log('delete success');
      console.log(result);
      update()
    }
  }
}

const MeasurementsView = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [measurements, setMeasurements] = useState([]);

  const updateMeasurements = () => getMeasurements(m => setMeasurements(m));

  useEffect(() => {
    if (MeasurementsView.length) {
      setLoadingStatus(false);
    }
  }, [measurements]);

  useEffect(() => {
    if (!loadingStatus && !measurements.length) {
      setLoadingStatus(true);
      console.log('fetchy');
      getMeasurements(m => setMeasurements(m));
    }
  }, []);

  const createEditForm = (item) => {
    return () => (
      <EditableMeasurement
        measurement={item}
        measurements={measurements}
        onSave={createSaveHandler(updateMeasurements)}
      />
    )
  }

  return (
    <Fragment>
      {
        measurements?.length ? (
          <ul>
            {
              measurements.map((m) => (
                <EditableListItem key={m._id} EditForm={createEditForm(m)} handleDelete={createDeleteHandler(m, updateMeasurements)}>
                  {m.unitName}
                </EditableListItem>
              ))
            }
          </ul>
        )
          : null
      }
      <EditableMeasurement
        measurement={{}}
        measurements={measurements}
        onSave={createSaveHandler(updateMeasurements)}
        />
      
    </Fragment>
  )
};

export { MeasurementsView };
