import React, { useState } from 'react'
import log from '../utils/log.js'
import url from '../utils/server.js'

const editar = (props) => {
    const id_entity = 1
    const [id, setId] = useState('')

    const Borrar = async e => {
        e.preventDefault()
        //alert("Borrar")
        const res = await fetch(
			`${url}/api/deleteEntityById`,{
				body: JSON.stringify({
					id_entity: id
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'DELETE'
			})
			.then(response => console.log(response.text()))
    }
    const Modificar = async e => {
        e.preventDefault()
        alert("Modificar")
    }

	return (
		<>
			<div className="w-full h-screen flex flex-col space-y-12 py-24 items-center font-medium">
        
				<h1 className="text-4xl">Modificar entidad</h1>

                <form className="flex flex-col space-y-4">
                    <div>
                            <div><label className="text-gray-800">ID de la entidad: </label></div>
                            <input className="rounded-lg border border-gray-600 focus:border-gray-600"
                                type="text" 
                                placeholder=" ID"
                                value={ id }
                                onChange={(evnt) => setId()}/>
                    </div>
                    <button className="rounded-full border-2 border-orange-500 hover:border-orange-500" onClick={Borrar}>Borrar Entidad</button>
                    <button className="rounded-full border-2 border-orange-500 hover:border-orange-500" onClick={Modificar}>Modificar</button>
                    <a href={'/profile?id=' + id_entity} className="bg-gray-100 p-6 rounded-xl"></a>
                </form>
			</div>
		</>
	)
}

export default editar