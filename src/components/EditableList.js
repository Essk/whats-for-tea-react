import React, { useState } from "react";

const EditableListItem = ({children, EditForm, handleDelete}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li>
      <div>
        <div>{children} <button type="button" onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Cancel' : 'Edit'}</button> <button type="button" onClick={handleDelete}>Delete</button></div>
        <div hidden={!isEditing}>
          <EditForm />
        </div>
      </div> 
    </li>
  );
};


export { EditableListItem };