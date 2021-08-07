import React from 'react'

function Button({enter_room,room,src}) {
    return (
        <button onClick={()=>{enter_room(room)}}>
            <div className="room">
                <img src={src}/>
                <h4>{room}</h4>
            </div>
        </button>
    )
}

export default Button
