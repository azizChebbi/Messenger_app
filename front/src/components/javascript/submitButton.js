import React from 'react'

function Button({text}) {
    return (
        <div className="container-login100-form-btn m-t-32">
            <button className="login100-form-btn" type="submit">
                {text}
            </button>
        </div>
    )
}

export default Button
