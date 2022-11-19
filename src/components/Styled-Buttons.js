import React from "react";

const BasicButton = ({ children, onClick }) => (
  <button type="button" className="
    bg-slate-200 
    border-slate-400 
    text-slate-600
    p-1
    m-1
    border-2
    rounded 
    " 
    onClick={onClick}>
    {children}
  </button>
);

export {
  BasicButton
}