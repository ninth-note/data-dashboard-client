import '../../styles/components/form/FormSelectOption.scss'

const FormSelectOption = (props) => {
  
    const { label, onChange, id, options, ...selectOptionProps } = props;

    return (
        <div className="formSelectOption">
            <label className="formSelectOption__label">{label}</label>
            <select 
                className="formSelectOption__select"
                onChange={onChange} 
                {...selectOptionProps}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </select>
        </div>
      );
  };
  
  export default FormSelectOption;