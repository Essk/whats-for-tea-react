import logo from './logo.svg';
import './App.css';
import { AddableList } from './components';
import { MeasurementsView } from './components/views/Measurements'
import { IngredientsView } from './components/views/Ingredients'
import { EquipmentView } from './components/views/Equipment'
import { MealPartView } from './components/views/Meal-Parts'
import React, { useEffect, useState} from 'react';

const getEquipment = async (cb) => {
  if (!cb) {
    console.warn('getEquipment needs a callback');
    return;
  }
  const response = await fetch('http://localhost:3000/api/equipment');
  const equipment = await response.json();
  cb(equipment);
};

const getIngredients = async (cb) => {
  if (!cb) {
    console.warn('getIngredients needs a callback');
    return;
  }
  const response = await fetch('http://localhost:3000/api/ingredient');
  const ingredients = await response.json();
  cb(ingredients);
};

const getMeasurements = async (cb) => {
  if (!cb) {
    console.warn('getMeasurements needs a callback');
    return;
  }
  const response = await fetch('http://localhost:3000/api/measurement');
  const measurements = await response.json();
  cb(measurements);
};

const getMealParts = async (cb) => {
  if (!cb) {
    console.warn('getMealParts needs a callback');
    return;
  }
  const response = await fetch('http://localhost:3000/api/meal-part');
  const mealParts = await response.json();
  cb(mealParts);
};

function App() {
  const list = [
    { value: 'xxx0', text: 'yyy0' },
    { value: 'xxx1', text: 'yyy1' },
    { value: 'xxx2', text: 'yyy2' },
    { value: 'xxx3', text: 'yyy3' },
  ];
  const [ingredients, setIngredients] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [mealParts, setMealParts] = useState([]);

  const updateMeasurements = () => getMeasurements(m => setMeasurements(m));
  const updateIngredients = () => getIngredients(i => setIngredients(i));
  const updateEquipment = () => getEquipment(i => setEquipment(i));
  const updateMealParts = () => getMealParts(i => setMealParts(i));

  useEffect(() => {
    getEquipment(i => setEquipment(i));
    getIngredients(i => setIngredients(i));
    getMealParts(i => setMealParts(i));
    getMeasurements(i => setMeasurements(i));
  },[]);

  return (
    <div className="App">
      <AddableList id="ernie" list={list} />
      <div id="views" className="flex flex-wrap">
          <MeasurementsView measurements={measurements} updateMeasurements={updateMeasurements}/>
          <IngredientsView ingredients={ingredients} updateIngredients={updateIngredients}/>
          <EquipmentView equipment={equipment} updateEquipment={updateEquipment}/>
          <MealPartView mealParts={mealParts} updateMealParts={updateMealParts}/>
      </div>
    </div>
  );
}

export default App;
