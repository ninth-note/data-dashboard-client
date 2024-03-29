import { useState } from "react";

// styles
import '../../styles/components/form/FormTextArea.scss'

const FormTextArea = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, onChange, id, ...textAreaProps } = props;
  
    const handleFocus = () => {
      setFocused(true);
    };
  
    return (
      <div className="formTextArea">
        <label className="formTextArea__label">{label}</label>
        <textarea
          className="formTextArea__textarea"
          {...textAreaProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focused.toString()}
        />
      </div>
    );
  };
  
  export default FormTextArea;