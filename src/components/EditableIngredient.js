import React, { Fragment, useState } from "react";

const EditableIngredient = ({ingredient = {}, onSave}) => {
  const {
    _id = '',
    slug = '',
    name = ''
  } = ingredient;

  const [nameState, setNameState] = useState(name);

  return (
    <form>
      <label htmlFor="ingredient-name">Name</label>
      <input id="ingredient-name" onChange={e => setNameState(e.target.value)} value={nameState} />
      <button type="button" onClick={() => onSave({
        _id,
        slug,
        name: nameState,
      })}>Save</button>
    </form>
  );
};

export { EditableIngredient };