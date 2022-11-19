import React, { Fragment, useState } from "react";

const EditableMeasurement = ({measurement = {}, measurements, onSave}) => {
  const {
    _id = '',
    slug = '',
    unitName = '',
    notationSingular = '', 
    notationPlural = '',
    parentMeasure = '',
    parentThreshold = 1,
  } = measurement;

  const [unitNameState, setUnitNameState] = useState(unitName);
  const [notationSingularState, setNotationSingularState] = useState(notationSingular);
  const [notationPluralState, setNotationPluralState] = useState(notationPlural);
  const [parentMeasureState, setParentMeasureState] = useState(parentMeasure);
  const [selectedParentMeasure, setSelectedParentMeasure] = useState(0);
  const [parentThresholdState, setParentThresholdState] = useState(parentThreshold);

  return (
    <form>
      <label htmlFor="unit-name">Unit name</label>
      <input id="unit-name" onChange={e => setUnitNameState(e.target.value)} value={unitNameState} />
      <label htmlFor="notation-singular">Singular Notation</label>
      <input id="notation-singular" onChange={e => setNotationSingularState(e.target.value)} value={notationSingularState} />
      <label htmlFor="notation-plural">Plural Notation</label>
      <input id="plural-notation" onChange={e => setNotationPluralState(e.target.value)} value={notationPluralState} />
      <label htmlFor="parent-measure">Parent Measure</label>
      <select selected={selectedParentMeasure} id="parentMeasure" onChange={(e) => setSelectedParentMeasure(e.target.value)}>
        <option value="0">None</option>
        {
          measurements
          .filter((m) => (m._id !== measurement._id))
          .map((m) => (
            <option key={m._id} value={m._id}>{m.unitName}</option>
          ))
        }
      </select>
      {
        selectedParentMeasure !== 0 ? (
          <Fragment>
            <label htmlFor="parent-threshold">ParentThreshold</label>
            <input type="number" id="unit-name" onChange={e => setParentThresholdState(e.target.value)} value={parentThresholdState} />
          </Fragment>
        )
        : null
      }
      <button type="button" onClick={() => onSave({
        _id,
        slug,
        unitName: unitNameState,
        notationSingular: notationSingularState,
        notationPlural: notationPluralState,
        parentMeasure: parentMeasureState,
        parentThreshold: parentThresholdState
      })}>Save</button>
    </form>
  );
};

export { EditableMeasurement };