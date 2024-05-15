import React from "react";
import CheckboxContext from "./CheckboxContext";

function CheckboxGroup({
  label,
  children,
  disabled: groupDisabled,
  values,
  onChange,
}) {
  const isDisabled = (disabled) => disabled || groupDisabled;

  const isChecked = (value) => values.includes(value);

  const toggleValue = ({ checked, value }) => {
    if (checked) {
      onChange(values.concat(value));
    } else {
      onChange(values.filter((v) => v !== value));
    }
  };

  // File 컴포넌트에 체크 여부 전달
  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { checked: isChecked(child.props.name) })
  );

  return (
    <CheckboxContext.Provider value={{ isDisabled, isChecked, toggleValue }}>
      {childrenWithProps}
    </CheckboxContext.Provider>
  );
}

export default CheckboxGroup;
