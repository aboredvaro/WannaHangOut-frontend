import React, { useState } from 'react'

const ProfileComponent = (
    id_entity,
    id_role,
    id_address,
    nick,
    name,
    surname,
    description,
    mail,
    phone,
    avatar
) =>{

    return (
        <>
            <img className="object-cover w-16 h-16 mr-2 rounded-full" src={avatar} alt="Foto Perfil"/>
            <p className="mb-2 text-2xl font-medium">{nick} </p>
            <p className="mb-2 text-2xl font-medium">{name} </p>
            <p className="mb-2 text-2xl font-medium">{description} </p>
            <p className="mb-2 text-2xl font-medium">Puntuación media: {} </p>
        </>
    )

}

export default ProfileComponent