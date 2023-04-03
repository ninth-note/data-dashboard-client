import { useState } from "react";
import '../../styles/components/form/FormInput.scss'

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, onChange, id, ...inputProps } = props;

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="formInput__label">{label}</label>
      <input className="formInput__input"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        autoComplete="off"
        focused={focused.toString()}
      />
    </div>
  );
};

export default FormInput;