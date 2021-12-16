import React, { useState, useEffect, useRef } from 'react'
import url from '../utils/server'
import log from '../utils/log'
import { useRouter } from 'next/router'
import { session, getSession } from '../utils/session'
import Navbar from '../components/navbar'

const CreateActivity = ({
	tags
}) => {

	const router = useRouter()

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}

		return array.length>0?array:[]
	}

	const [titleValue, setTitle] = useState('')
	const [descriptionValue, setDescription] = useState('')
	const [seatsValue, setSeats] = useState('')
	const [priceValue, setPrice] = useState('')
	const [durationValue, setDuration] = useState('')
	const [dateValue, setDate] = useState(Date.now())
	const [directionValue, setDirection] = useState('')
	const [codPosValue, setCodPos] = useState('')
	const [locationValue, setLocation] = useState('')
	const [isLogged, setIsLogged] = useState(null)
	const [sessionID, setSessionID] = useState(false)
	const [urlPath, setUrlPath] =useState('')

	/*
	const date = new Date(activity.dateAct)
	const yy = date.getFullYear()
	const mm = date.getMonth()
	const dd = date.getDay()
	*/

	const handleCancel = async event => {
		router.push('/')
	}

	function handleShowTags() {
		setShowTags(true)
	}

	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}

	const handleSubmit = async event => {
		event.preventDefault()	
		console.log('AAAAAAAAAAAAAAAAAAA' + sessionID)
		var auxTags = getSelected()

		const res = await fetch(
			`${url}/api/createNewActivity`,{
				body: JSON.stringify({	
					id_entity_creator: sessionID,
					title: titleValue,
					description: descriptionValue,
					seats: seatsValue,
					price: priceValue,
					dateAct: dateValue,
					min_duration: durationValue,
					tags_act: auxTags,
					deleted: 0,
					codPos: codPosValue,
					location: locationValue,
					direction: directionValue,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		).then(response => {
			if (response.ok) return response.json()
		})

		if(!isNaN(res)) {
			router.push('/')
		}

	}	

	useEffect(() => {
        const getUserSession = async() => {
            const userSession = session()
            setIsLogged(userSession)

            if (userSession) {
                const userHash = getSession()
                const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
                    .then(response => response.json())
                
                setSessionID(userID.id_entity)
            }
        }
        getUserSession()
    }, [])

	return (
		<>
			<Navbar />
			
			<div className='flex flex-col w-full h-full items-center justify-center py-20'>

				{/*Caja blanca */}
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-110 p-8 rounded-xl shadow-card bg-white border border-gray-100 space-y-4"
				>
					<div className="flex flex-col justify-between space-y-10">
						<div className='flex flex-row w-full justify-center'>
							<p className="text-2xl text-gray-600 font-medium">Cree su evento</p>
						</div>

						<div className="flex flex-col justify-between space-y-4">

							<img className='object-cover w-108 h-60 rounded-lg' src={urlPath}/>
							<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">URL de imagen</p>
									</div>
									<div className='flex flex-row justify-start space-x-2'>
									<input
										className="input w-full"
										value = {urlPath}
										onChange = { (e) => setUrlPath(e.target.value)}
										required
									/>
									<button 
									type='button'
										className='btn-terciary w-24'
										onClick={() => setUrlPath('')}
									>
										Borrar
									</button>
									</div>
								</div>

							<div className="flex flex-col space-y-1">
								<div className='flex flex-row justify-start space-x-0.5'>
									<p className='text-sm text-red-500 font-semibold'>*</p>
									<p className="text-sm font-medium">Título</p>
								</div>
								<input
									className="input w-full"
									value = {titleValue}
									onChange = { (e) => setTitle(e.target.value)}
									required
								/>
							</div>

							{/*Descripción */}
							<div className="flex flex-col space-y-1">
								<div className='flex flex-row justify-start space-x-0.5'>
									<p className='text-sm text-red-500 font-semibold'>*</p>
									<p className="text-sm font-medium">Descripción</p>
								</div>
								<textarea className="w-full h-24 resize-none p-3 bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 rounded-lg appearance-none outline-none"
									value = {descriptionValue}
									onChange = { (e) => setDescription(e.target.value)} 
									required
									autoFocus
								/>
							</div>

							{/**Seats */}
							<div className='flex flex-row space-x-1'>
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Plazas</p>
									</div>
									<input
										className="input w-full"
										value = {seatsValue}
										onChange = { (e) => setSeats(e.target.value)}
										required
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Precio</p>
									</div>
									<input
										className="input w-full"
										value = {priceValue}
										onChange = { (e) => setPrice(e.target.value)}
										required
									/>
								</div>
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Duración (min)</p>
									</div>
									<input
										className="input w-full"
										value = {durationValue}
										onChange = { (e) => setDuration(e.target.value)}
										required
									/>
								</div>
							</div>

							{/**Fecha */}
							<div className="flex flex-col space-y-1">
								<div className="flex flex-col">
									<label className="text-sm font-medium text-gray-700">Fecha </label>
									<input type="date" id="dateMax" name="dateMax" className="input w-full"
										value={formatDate(dateValue)}
										onChange = { (e) => setDate(e.target.value)}
									></input>
								</div>
							</div>

							{/*Dirección */}
							<div className="flex flex-col space-y-1">
								<div className='flex flex-row justify-start space-x-0.5'>
									<p className='text-sm text-red-500 font-semibold'>*</p>
									<p className="text-sm font-medium">Dirección</p>
								</div>
								<input
									className="input w-full"
									value = {directionValue}
									onChange = { (e) => setDirection(e.target.value)}
									required
								/>
							</div>

							<div className='flex flex-row space-x-2'>
								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Código Postal</p>
									</div>
									<input
										className="input w-full"
										value = {codPosValue}
										onChange = { (e) => setCodPos(e.target.value)}
										required
									/>
								</div>

								<div className="flex flex-col space-y-1">
									<div className='flex flex-row justify-start space-x-0.5'>
										<p className='text-sm text-red-500 font-semibold'>*</p>
										<p className="text-sm font-medium">Localidad</p>
									</div>
									<input
										className="input w-full"
										value = {locationValue}
										onChange = { (e) => setLocation(e.target.value)}
										required
									/>
								</div>
							</div>

							<div className="flex flex-col pl-2">

								<div className="flex flex-row">
									<div className="flex flex-col">
										<label className="text-sm font-medium">Categorías</label>
									</div>
								</div>
								
								<div className="flex flex-col justify-center pb-1">	
									{
										tags.map(({id_tags,name}, i) =>		
											<div className="flex flex-row items-center w-60" key={i}>
												<input className="items-center justify-center mr-2" type="checkbox" id="tags_act" name="tags_act" value={id_tags}/>
												<label className="text-base font-regular text-gray-700">{name}</label>
											</div>
											
										)
									}
								</div>

							</div> 

							<div className="flex flex-row justify-between space-x-4 items-center">
									<button
										type="button"
										className="btn-terciary w-full"
										onClick={()=> handleCancel()}
									>
										Cancelar
									</button>
									<button 
										type="submit" 
										className="btn-primary w-full"
									>
										Crear
									</button>
							</div>

						</div>
					</div>
				</form>
			</div>
		</>
	)
}
export async function getServerSideProps(){

	const tags = await fetch(`${url}/api/getAllTags`)
	 	.then(response => response.json())

	return{
		props:{
			tags
		}
	}

}

export default CreateActivity
