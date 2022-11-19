import React, {Fragment, useEffect, useState } from "react";
import { EditableMeasurement } from "../EditableMeasurement";
import { EditableListItem } from "../EditableList";

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

const MeasurementsView = ({measurements, updateMeasurements}) => {
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
    <div className="view-container flex flex-wrap basis-1/3 border-2 rounded-md border-green-600 bg-green-100" id="measurements-view">
        <h2 className="text-xl basis-full text-center">Measurements</h2>
        {
          measurements?.length ? (
            <ul className="basis-full p-2">
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
    </div>
  )
};

export { MeasurementsView };
