import React from 'react'


function Input({type,name,placeholder,onchange,dataPlaceholder}) {
    return (
        <div className="wrap-input100 validate-input">
            <input className="input100" type={type} name={name} placeholder={placeholder} required onChange={e=>onchange(e.target.value)}/>
            <span className="focus-input100" data-placeholder={dataPlaceholder}></span>
        </div>
    )
}

export default Input
