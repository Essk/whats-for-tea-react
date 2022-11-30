import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { BasicButton } from "./Styled-Buttons";

const EditableListItem = ({ children, EditForm, handleEdit = () => { }, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const _handleEdit = () => {
    setIsEditing(!isEditing);
    handleEdit();
  };
  return (
    <li className="w-full p-1 border-b-2 border-green-600">
      <div className="w-full">
        <div className="w-full flex align-middle">
          <span className="grow">{children} </span>
          <span>
            <BasicButton onClick={_handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</BasicButton>
            <BasicButton onClick={handleDelete}>Delete</BasicButton>
          </span>

        </div>
        {
          EditForm ? (
            <div hidden={!isEditing}>
              <EditForm />
            </div>
          ) : null
        }
      </div>
    </li>
  );
};

const EditableListControlled = ({ list, ItemDisplay, itemDefault, EditForm, handleSave }) => {
  const [listState, setListState] = useState(list.map((item) => ({ ...item, listItemId: uuidv4() })));
  const [activeItem, setActiveItem] = useState(false);

  const handleEdit = (itemId) => {
    if (itemId === activeItem) {
      setActiveItem(false);
      return;
    }
    setActiveItem(itemId);
  };

  const handleDelete = (itemId) => {
    const index = listState.find(item => item.listItemId === itemId);

    if (index === -1) {
      return;
    }

    setListState([...listState].splice(index, 1));

    if (itemId === activeItem) {
      setActiveItem(false);
    }
  };

  const saveItem = (item) => {
    const { listItemId } = item;
    const index = listState?.find(i => i.listItemId === listItemId);
    // set idx to be index of existing item, or end of list
    const idx = index !== -1 ? index : listState.length;
    const newList = [...listState];
    newList[idx] = item;
    setListState(newList);
    setActiveItem(false);
  };

  const ListItem = ({ itemId, children, isEditing }) => (
    <li className="w-full p-1 border-b-2 border-green-600">
      <div className="w-full">
        <div className="w-full flex align-middle">
          <span className="grow">{children} </span>
          <span>
            <BasicButton onClick={() => handleEdit(itemId)}>{isEditing ? 'Cancel' : 'Edit'}</BasicButton>
            <BasicButton onClick={() => handleDelete(itemId)}>Delete</BasicButton>
          </span>
        </div>
      </div>
    </li>
  );

  return (
    <div>
      {
        listState?.length ? (
          <ul>
            {
              listState.map((item) => {
                return (<ListItem 
                  itemId={item.listItemId}
                  isEditing={item.listItemId === activeItem}>
                    <ItemDisplay />
                  </ListItem>);
              })
            }
          </ul>
        )
          : null
      }
      <div >
        <EditForm handleSave={saveItem}/>
      </div>
      <BasicButton onClick={handleSave}>Save</BasicButton>
    </div>
  );
};

export { EditableListItem, EditableListControlled };