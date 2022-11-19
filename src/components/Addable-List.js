import React, { useEffect, useState, useMemo, useRef, Fragment } from "react";
import { Select } from "./Select";

const AddableList = ({ id, list }) => {
  const [allOptions, setAllOptions] = useState(list);
  const [remainingOptions, setRemainingOptions] = useState(list);
  const [listEntries, setListEntries] = useState([]);
  const [selectedItem, setSelectedItem] = useState(remainingOptions[0]);
  const selectEl = useRef();

  const getOption = value => selectEl.current.querySelector(`option[value="${ value }"]`);
  const getOptionText = value => getOption(value).textContent;
  
  useEffect(() => {
      setSelectedItem(remainingOptions[0])
    }, [remainingOptions]
  );

  const handleAdd = () => {
    setListEntries([...listEntries, selectedItem]);
    const filteredRemaining = remainingOptions.filter(item => {
      return item.value !== selectedItem.value;
    });
    setRemainingOptions(filteredRemaining);
  };

  const handleSelect = () => {
    const { value } = selectEl.current;
    const text = getOptionText(value)
    setSelectedItem({ value, text });
  };

  return (
    <div className="addable-list" id={id}>
      {
        listEntries?.length ? (
          <ul className="addable-list__list">
            {listEntries.map((entry, index) => (
              <li key={`${ entry.value }-${ index }`}>{JSON.stringify(entry)}</li>
            ))}
          </ul>
        )
          : null
      }
      {
        remainingOptions?.length ?
        (
          <Fragment>
            <Select ref={selectEl} id={`addable-list-select-${ id }`} options={remainingOptions} handleChange={handleSelect} />
            <button type="button" onClick={handleAdd}>Add</button>
          </Fragment>
        )
        : null
      }

    </div>
  );
};

export { AddableList };