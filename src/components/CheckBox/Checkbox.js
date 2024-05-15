import React from "react";
import CheckboxContext from "./CheckboxContext";
import styles from "../../styles/input.module.css";

function Checkbox({ children, disabled, value, checked, onChange }) {
  const context = React.useContext(CheckboxContext);

  if (!context) {
    return (
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
          className={styles.check_btn}
        />
        {children}
      </label>
    );
  }

  const { isDisabled, isChecked, toggleValue } = context;

  return (
    <label className={styles.input}>
      <input
        type="checkbox"
        disabled={isDisabled(disabled)}
        checked={isChecked(value)}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      {children}
    </label>
  );
}

export default Checkbox;
