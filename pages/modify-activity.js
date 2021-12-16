import React, {useState} from 'react'
import url from '../utils/server'
import log from '../utils/log'
import Navbar from '../components/navbar'
import { useRouter } from 'next/router'

const ModifyActivity = ({
	activity,
	tags
}) => {

	const router = useRouter()

	function getSelected(){
		var array = []
		var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

		for(var i = 0; i < checkboxes.length; i++){
			array.push(checkboxes[i].value)
		}

		return array.length>0?array:activity.tags
	}

	const [titleValue, setTitle] = useState(activity.title)
	const [descriptionValue, setDescription] = useState(activity.description)
	const [seatsValue, setSeats] = useState(activity.seats)
	const [priceValue, setPrice] = useState(activity.price)
	const [durationValue, setDuration] = useState(activity.min_duration)
	const [dateValue, setDate] = useState(activity.dateAct)
	const [directionValue, setDirection] = useState(activity.direction)
	const [codPosValue, setCodPos] = useState(activity.codPos)
	const [locationValue, setLocation] = useState(activity.location)

	/*
	const date = new Date(activity.dateAct)
	const yy = date.getFullYear()
	const mm = date.getMonth()
	const dd = date.getDay()
	*/

	const deleteActivity = async event => {
		event.preventDefault()

		const res = await fetch(
			`${url}/api/deleteActivityById`,{
				body: JSON.stringify({	
					id_activity: activity.id_activity
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(router.push('/activities'))
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
		
		var auxTags = getSelected()

		const res = await fetch(
			`${url}/api/updateActivity`,{
				body: JSON.stringify({	
					id_activity: activity.id_activity,
					id_entity_creator: activity.id_entity_creator,
					title: titleValue,
					description: descriptionValue,
					seats: seatsValue,
					price: priceValue,
					dateAct: dateValue,
					min_duration: durationValue,
					tags_act: auxTags,
					deleted: 0,
					id_address: activity.id_address,
					codPos: codPosValue,
					location: locationValue,
					direction: directionValue,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			}
		)
		if(res) {
			router.push('activity?id=' + activity.id_activity)
		}

	}	

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
							<p className="text-2xl text-gray-600 font-medium">Modifique su evento</p>
						</div>

						<div className="flex flex-col justify-between space-y-4">

							<img className='object-cover w-108 h-60 rounded-lg' src={activity.urlPath}/>

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
										Guardar cambios
									</button>
							</div>

						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx){

	const {id} = ctx.query

	const activity = await fetch(`${url}/api/getActivityByID?id_activity=${id}`)
		.then(response => response.json())

	const tags = await fetch(`${url}/api/getAllTags`)
		.then(response => response.json())

	return{
		props:{
			activity,
			tags
		}
	}
}

export default ModifyActivity
