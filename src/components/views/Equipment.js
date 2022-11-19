import React, {Fragment, useEffect, useState } from "react";
import { EditableEquipment } from "../EditableEquipment";
import { EditableListItem } from "../EditableList";

const createSaveHandler = (update) => async (equipment) => {
  const {
    _id,
    slug,
    name,
  } = equipment;

  const canSave = (!!name);
  if(!canSave) {
    console.log('not an equipment we can save', equipment);
    return;
  }
  const slugUrlPart = slug ? slug : 'new';
  const saveUrl = `http://localhost:3000/api/equipment/${slugUrlPart}`;
  const queryParams = [...Object.keys(equipment)]
    .filter(key => Boolean(equipment[key]))
    .map(key => `${ key }=${ equipment[key]}`)
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

const createDeleteHandler = (equipment, update) => {
  return async () => {
    const { slug } = equipment;
    if (!slug) {
      console.log('can\'t delete', equipment);
      return;
    };
    const deleteUrl = `http://localhost:3000/api/equipment/${ slug }`;
    console.log('deleting equipment at', deleteUrl);
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

const EquipmentView = ({equipment, updateEquipment}) => {
  const createEditForm = (item) => {
    return () => (
      <EditableEquipment
        equipment={item}
        onSave={createSaveHandler(updateEquipment)}
      />
    )
  }

  return (
    <div className="view-container flex flex-wrap basis-1/3 border-2 rounded-md border-green-600 bg-green-100" id="equipment-view">
        <h2 className="text-xl basis-full text-center">Equipment</h2>
        {
          equipment?.length ? (
            <ul className="basis-full p-2">
              {
                equipment.map((i) => (
                  <EditableListItem key={i._id} EditForm={createEditForm(i)} handleDelete={createDeleteHandler(i, updateEquipment)}>
                    {i.name}
                  </EditableListItem>
                ))
              }
            </ul>
          )
            : null
        }
        <EditableEquipment
          equipment={{}}
          onSave={createSaveHandler(updateEquipment)}
        />
    </div>
  )
};

export { EquipmentView };
