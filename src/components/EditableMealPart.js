import React, { Fragment, useEffect, useState } from "react";
import { BasicButton } from "./Styled-Buttons";
import { EditableListItem, EditableListControlled } from "./EditableList";

const EditableMethodStep = ({step, onSave}) => {
  const [stepState, setStepState] = useState(step); 
  useEffect(() => {
    console.log(step)
    setStepState(step)
  }, [step]);
  return (
      <div className="flex items-end">
        <div>
          <h3>Step</h3>
        <textarea
          name="step-text"
          id={`step-text-${ step.stepIndex }`}
          cols="30" rows="3"
          value={stepState.stepText || ''}
          onInput={(evt) => {
            setStepState({
              ...stepState,
              stepText: evt.target.value
            });
          }}
        />
        </div>
        <BasicButton onClick={() => {
          onSave(stepState);
          setStepState({stepText: ''})
          }}>Save step</BasicButton>
      </div>
  )
}

const defaultMP = {
  _id: '',
  slug: '',
  name: '',
  method: [],
  duration: 0,
  recipeIngredients: [],
  recipeEquipment: []
};

const EditableMealPart = ({mealPart = defaultMP, ingredients, measurements, equipment, onSave}) => {
  const [mealPartState, setMealPartState] = useState({...defaultMP, ...mealPart});
  const [showForm, setShowForm] = useState(false);
  const [editingMethodStep, setEditingMethodStep] = useState({})

  useEffect(() => {
    setMealPartState(mealPart)
  }, [mealPart]);

  const elId = (base) => {
    const { _id } = mealPart;
    return !!_id ? `${base}-${_id}` : `${base}-new`
  }

  const deleteMethodStep = (index) => {
    const steps = mealPartState?.method;
    if(!steps[index]){
      return;
    }
    steps.splice(index,1)
    setMealPartState({
      ...mealPartState,
      method: steps
    })
  }

  const ItemDisplay = (step) => (<p >{step.stepText}</p>);

  const EMS = () => (<EditableMethodStep step={{
    ...editingMethodStep,
    index: editingMethodStep?.index || mealPartState?.method?.length || 0,
  }} onSave={(step) => {
    const method = mealPartState.method || [];
    const { index } = step;
    method[index] = step;
    setMealPartState({
      ...mealPartState,
      method
    });
    setEditingMethodStep({
      index: mealPartState?.method?.length || 0
    });
  }} />);
  
  return (
    <EditableListControlled list={mealPartState?.method || []} EditForm={EMS}/>
  )
  /*
  return (
    <form>
      <div className="flex flex-wrap p-2">
        <div className="basis-full p-2">
          <label htmlFor={elId('meal-part-name')}>Name</label>
          <input className="ml-2" id={elId('meal-part-name')} onChange={e => setMealPartState({
            ...mealPartState,
            name: e.target.value
          })} value={mealPartState.name || ''} />
        </div>
        <div className="basis-full p-2">
          <label htmlFor={elId('meal-part-duration')}>Duration</label>
          <input className="ml-2" id={elId('meal-part-duration')} onChange={e => setMealPartState({
            ...mealPartState,
            duration: e.target.value
          })} value={mealPartState.duration || 0} />
        </div>


        <div className="basis-full p-2">
          <h3>Method:</h3>
          {
            mealPartState?.method?.length ? mealPartState.method.map((step, index) => (
              <EditableListItem
                handleEdit={() => setEditingMethodStep({
                  ...mealPartState?.method[index],
                    index
                  })}
                handleDelete={() => deleteMethodStep(index)}
                key={`step-${ index }`}>
                  <p >{step.stepText}</p>
              </EditableListItem>
              
            )) : <p>No steps saved! <BasicButton onClick={() => {
              setShowForm(!showForm);
            }
            }>New Step</BasicButton></p>
          }
          <div hidden={!showForm}>
            <EditableMethodStep step={{
              ...editingMethodStep,
              index: editingMethodStep?.index || mealPartState?.method?.length || 0,
            }} onSave={(step) => {
              const method = mealPartState.method || [];
              const { index } = step;
              method[index] = step;
              setMealPartState({
                ...mealPartState,
                method
              });
              setEditingMethodStep({
                index: mealPartState?.method?.length || 0
              })
            }} />
          </div>
        </div>
        <BasicButton onClick={() => onSave(mealPartState)}>Save</BasicButton>
      </div>
    </form>
  );
  */
};

export { EditableMealPart };