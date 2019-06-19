import React from 'react'

const Managers = props => {
        return (
            <div>
                {props.managers.map(manager => {
                    return <li key={manager.id}>{manager.name}</li>
                })}
            </div>
        )
    }

export default Managers;
