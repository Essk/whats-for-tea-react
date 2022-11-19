import React, { useState } from "react";
import { BasicButton } from "./Styled-Buttons";

const EditableListItem = ({children, EditForm, handleDelete}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li className="w-full p-1 border-b-2 border-green-600">
      <div className="w-full">
        <div className="w-full flex align-middle">
          <span className="grow">{children} </span>
          <span>
            <BasicButton onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</BasicButton>
            <BasicButton onClick={handleDelete}>Delete</BasicButton>
          </span>

        </div>
        <div hidden={!isEditing}>
          <EditForm />
        </div>
      </div> 
    </li>
  );
};


export { EditableListItem };