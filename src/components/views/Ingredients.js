import React, {Fragment, useEffect, useState } from "react";
import { EditableIngredient } from "../EditableIngredient";
import { EditableListItem } from "../EditableList";


const getIngredients = async (cb) => {
  if (!cb) {
    console.warn('getIngredients needs a callback');
    return;
  }
  const response = await fetch('http://localhost:3000/api/ingredient');
  const ingredients = await response.json();
  cb(ingredients);
};

const createSaveHandler = (update) => async (ingredient) => {
  const {
    _id,
    slug,
    name,
  } = ingredient;

  const canSave = (!!name);
  if(!canSave) {
    console.log('not an ingredient we can save', ingredient);
    return;
  }
  const slugUrlPart = slug ? slug : 'new';
  const saveUrl = `http://localhost:3000/api/ingredient/${slugUrlPart}`;
  const queryParams = [...Object.keys(ingredient)]
    .filter(key => Boolean(ingredient[key]))
    .map(key => `${ key }=${ ingredient[key]}`)
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

const createDeleteHandler = (ingredient, update) => {
  return async () => {
    const { slug } = ingredient;
    if (!slug) {
      console.log('can\'t delete', ingredient);
      return;
    };
    const deleteUrl = `http://localhost:3000/api/ingredient/${ slug }`;
    console.log('deleting ingredient at', deleteUrl);
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

const IngredientsView = () => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const updateIngredients = () => getIngredients(i => setIngredients(i));

  useEffect(() => {
    if (ingredients.length) {
      setLoadingStatus(false);
    }
  }, [ingredients]);

  useEffect(() => {
    if (!loadingStatus && !ingredients.length) {
      setLoadingStatus(true);
      console.log('fetchy');
      getIngredients(i => setIngredients(i));
    }
  }, []);

  const createEditForm = (item) => {
    return () => (
      <EditableIngredient
        ingredient={item}
        onSave={createSaveHandler(updateIngredients)}
      />
    )
  }

  return (
    <div className="view-container flex flex-wrap basis-1/3 border-2 rounded-md border-green-600 bg-green-100" id="ingredients-view">
        <h2 className="text-xl basis-full text-center">Ingredients</h2>
        {
          ingredients?.length ? (
            <ul className="basis-full p-2">
              {
                ingredients.map((i) => (
                  <EditableListItem key={i._id} EditForm={createEditForm(i)} handleDelete={createDeleteHandler(i, updateIngredients)}>
                    {i.name}
                  </EditableListItem>
                ))
              }
            </ul>
          )
            : null
        }
        <EditableIngredient
          ingredient={{}}
          onSave={createSaveHandler(updateIngredients)}
        />
    </div>
  )
};

export { IngredientsView };
