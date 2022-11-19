import React, { Fragment, useState } from "react";

const EditableEquipment = ({equipment = {}, onSave}) => {
  const {
    _id = '',
    slug = '',
    name = ''
  } = equipment;

  const [nameState, setNameState] = useState(name);

  return (
    <form>
      <label htmlFor="equipment-name">Name</label>
      <input id="equipment-name" onChange={e => setNameState(e.target.value)} value={nameState} />
      <button type="button" onClick={() => onSave({
        _id,
        slug,
        name: nameState,
      })}>Save</button>
    </form>
  );
};

export { EditableEquipment };