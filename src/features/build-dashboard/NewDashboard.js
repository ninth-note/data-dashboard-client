import { useNavigate } from 'react-router-dom';

// required react imports
import React, { useState } from "react";

// import the scss styling and constants (available services)
import '../../styles/features/NewDashboard.scss'
import { services } from '../../config'

// import required components
import FormInput from '../../components/form/FormInput';
import FormSelectOption from "../../components/form/FormSelectOption";
import NameTag from '../../components/small/NameTag';

const NewDashboard = () => {
  
  // initialise navigate variable so that we could forward a user on form completion
  const navigate = useNavigate();

  const [values, setValues] = useState({
    dashboard: "",
    service: services.options[0]
  });

  // available user inputs
  const inputs = [
    {
      id: 1,
      name: "dashboard",
      type: "text",
      placeholder: "dashboard name...",
      label: "Dashboard Name",
      maxLength: 30,
      required: true,
    },
    {
      id: 2,
      name: "service",
      type: "select",
      label: "Service",
      options: services.options
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    // navigate to the templates page and pass props as an argument
    navigate(`templates?userChoices=${encodeURIComponent(JSON.stringify(values))}`)
  } 

  const onSelect = (e) => {
    setValues({ ...values, [e.target.name]: services.options[e.target.value] });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="new">

      <div className="new__frame">

        <div className="new__frame__header"> 
          <div className="new__frame__header__user">
            <NameTag />
          </div>
        </div>

        <form className="new__frame__body__form" onSubmit={handleSubmit}>

          <div className="new__frame__body__form__header">
            <div className="new__frame__body__form__header__line"></div>
            <h1 className="new__frame__body__form__header__title">
              Create New Dashboard
            </h1>
          </div>

          <div className="new__frame__body__form__items">

            <div className="new__frame__body__form__items__input">
              <FormInput
                key={inputs[0].id}
                {...inputs[0]}
                value={values[inputs[0].name]}
                onChange={onChange}
              />
            </div>

            <div className="new__frame__body__form__items__select">
              <FormSelectOption
                key={inputs[1].id}
                {...inputs[1]}
                onChange={onSelect}
              />
            </div>

          </div>
          
          <button className="new__frame__body__form__button">continue</button>
        </form>

      </div>

    </div>
  )
}

export default NewDashboard