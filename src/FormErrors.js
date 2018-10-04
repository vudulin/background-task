import React from "react";

export const FormErrors = ({formErrors}) =>
  <div>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName === "inputColorFrom"? "Color from" : "Color to"} {formErrors[fieldName]}</p>
        )        
      } else {
        return "";
      }
    })}
  </div>