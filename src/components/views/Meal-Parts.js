import React, {Fragment, useEffect, useState } from "react";
import { EditableListItem } from "../EditableList";
import { EditableMealPart } from "../EditableMealPart";

const createSaveHandler = (update) => async (mealPart) => {
  const {
    _id,
    slug,
    name,
    duration,
    method,
    equipment,
    recipeIngredients
  } = mealPart;
  const canSave = (!!name);
  if (!canSave) {
    console.log('not a mealPart we can save', mealPart);
    return;
  }
  const slugUrlPart = slug ? slug : 'new';
  const saveUrl = `http://localhost:3000/api/meal-part/${ slugUrlPart }`;
  console.log('saving', mealPart)
  console.log('to ', saveUrl)
  const response = await fetch(saveUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mealPart)
  });
  const result = await response.json();
  if (result) {
    console.log('save success');
    console.log(result);
    update();
  }
};

const createDeleteHandler = (mealPart, update) => {
  return async () => {
    const { slug } = mealPart;
    if (!slug) {
      console.log('can\'t delete', mealPart);
      return;
    };
    const deleteUrl = `http://localhost:3000/api/meal-part/${ slug }`;
    console.log('deleting measurement at', deleteUrl);
    const response = await fetch(deleteUrl, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (JSON.stringify(result) === '{}') {
      console.log('delete success');
      console.log(result);
      update();
    }
  };
}

const MealPartView = ({mealParts, measurements, ingredients, equipment, updateMealParts}) => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [mealPartsState, setMealPartsState] = useState([]);
  const [editingMP, setEditingMP] = useState({});

  const createEditForm = (item) => {
    return () => (
      <EditableMealPart
        mealPart={item}
        measurements={measurements}
        ingredients={ingredients}
        equipment={equipment}
        onSave={createSaveHandler(updateMealParts)}
      />
    )
  }

  const sendNonsense = async (data) => {
    await fetch('	http://localhost:3000/api/meal-part/new', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  return (
    <div className="view-container flex flex-wrap basis-full border-2 rounded-md border-green-600 bg-green-100" id="meal-part-view">
        <h2 className="text-xl basis-full text-center">Meal Parts</h2>
        {
          mealParts.length ? (
            <div className="basis-1/4 border-r-2 border-gray-400">
              <ul>
                {
                  mealParts.map(mealPart => (
                  <EditableListItem
                    key={mealPart._id}
                    handleEdit={() => setEditingMP(mealPart)}
                    handleDelete={createDeleteHandler(mealPart)}
                    >
                      {mealPart.name ? mealPart.name : ''}
                  </EditableListItem>
                  ))
                }
              </ul>
            </div>
          ) : null
        }
      <div className="basis-3/4">
        <EditableMealPart
          mealPart={editingMP}
          measurements={measurements}
          ingredients={ingredients}
          equipment={equipment}
          onSave={createSaveHandler(updateMealParts)}
        />
      </div>
    </div>
  )
};

export { MealPartView };
