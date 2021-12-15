import React, { Fragment, useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { session, getSession } from '../utils/session'
import { SearchOutline, ChevronDownOutline } from 'react-ionicons'
import url from '../utils/server.js'

const Navbar = ({}) => {

	const [isLogged, setIsLogged] = useState(null)
	const [sessionID, setSessionID] = useState(false)
	const [searchFocused, setSearchFocused] = useState(false)
	const [searchResultsIsHovered, setSearchResultsIsHovered] = useState(false)
	const [searchEmpty, setSearchEmpty] = useState(true)

	const searchInput = useRef()
	const [searchResults, setSearchResults] = useState([])
	const doneTypingInterval = 250
	var typingTimer

	useEffect(() => {
		const getUserSession = async() => {
			const userSession = session()
			setIsLogged(userSession)

			if (userSession) {
				const userHash = getSession()
				const userID = await fetch(`${url}/api/getEntityByHash?entityHash=${userHash}`)
					.then(response => response.json())
				
				setSessionID(userID)
			}
		}
		getUserSession()
	}, [])

	const getCleanDate = (dirtyDate) => {
		const unformattedDate = new Date(dirtyDate)
		const dayName = unformattedDate.toLocaleDateString('es-ES', { weekday: 'long' })
		const dayNumber = unformattedDate.toLocaleDateString('es-ES', { day: 'numeric' })
		const month = unformattedDate.toLocaleDateString('es-ES', { month: 'long' })
		return `${dayName} ${dayNumber}, ${month}`
	}

	const clearSearchInput = () => {
		searchInput.current.value = ''
		setSearchResultsIsHovered(false)
		setSearchEmpty(true)
		setSearchResults([])
	}

	const getKeywords = () => {
		const keywords = searchInput.current.value.split(' ').filter(keyword => keyword.length > 0)
		setSearchEmpty(keywords.length === 0)
		return keywords
	}

	const searchKeywords = async () => {
		const keywords = getKeywords()

		const results = keywords.length <= 0 ? [] : await fetch(`${url}/api/searchActivitiesByKeywords`, {
			body: JSON.stringify(keywords),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		})
			.then(response => response.ok && response.json())

		setSearchResults(results)
	}

	const handleSearch = async () => {
		clearTimeout(typingTimer)
  	typingTimer = setTimeout(() => searchKeywords(), doneTypingInterval)
	}

	return (
		<div className='flex flex-row justify-between items-center px-6 w-full h-20 border'>

			{/* Logo y búsqueda */}
			<div className='flex flex-row items-center space-x-8'>
				<Link href="/" passHref>
					<div className="transform -translate-y-px cursor-pointer">
						<Image
							src="/logos/who.svg"
							alt="Wanna Hang Out logo"
							width={65}
							height={32}
							className="pointer-events-none"
						/>
					</div>
				</Link>

				<div className='relative'>
					<input
						className='relative peer flex flex-row w-96 h-11 pl-10 px-5 placeholder-gray-400 bg-gray-50 focus:bg-white border border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-100 rounded-lg outline-none transition-colors duration-150 ease-in-out'
						placeholder='Buscar eventos'
						ref={searchInput}
						onChange={() => { handleSearch() }}
						onFocus={() => { setSearchFocused(true) }}
						onBlur={() => { setSearchFocused(false) }}
					/>
					<SearchOutline
						className={`absolute top-1/2 left-4 transform -translate-y-1/2 ${searchFocused ? 'text-gray-700' : 'text-gray-400'} peer-focus:text-gray-700 z-10 pointer-events-none transition-colors duration-150 ease-in-out`}
						color={''}
						height='18px'
						width='18px'
					/>

					<div
						className={`absolute top-12 left-0 w-96 mt-0.5 ${((searchFocused || searchResultsIsHovered) && !searchEmpty) ? 'flex' : 'hidden'} flex-col py-1.5 bg-white divide-y divide-gray-100 rounded-lg shadow-card ring-1 ring-gray-700 ring-opacity-20`}
						onMouseMove={() => setSearchResultsIsHovered(true)}
						onMouseLeave={() => setSearchResultsIsHovered(false)}
						onClick={() => { clearSearchInput() }}
					>
						{!searchEmpty && searchResults.length === 0 ?
							<div className='flex flex-col h-20 items-center justify-center space-y-1 text-sm'>
								<p>No hay resultados para esta búsqueda</p>
								<Link href="/activities">
									<a className='font-medium text-orange-600'>
										Buscar por filtros
									</a>
								</Link>
							</div>
							:
							searchResults.map(result => {
								return (
									<Link href={`/activity?id=${result.id_activity}`} key={result.id_activity}>
										<a className='flex flex-row h-16 px-5 space-x-4 justify-between hover:bg-gray-50 active:bg-gray-100'>
											
											<div className='flex flex-col space-y-0.5 w-full justify-center'>
												<span className='font-medium'>{result.title}</span>
												<div className='flex flex-row space-x-1 whitespace-nowrap capitalize overflow-ellipsis text-xs text-gray-400'>
													{result.location} — {getCleanDate(result.dateAct)}
												</div>
											</div>

											<div className={`flex flex-col justify-center text-sm font-medium ${(result.price === 0) ? 'text-gray-400' : 'text-green-600'}`}>
												{(result.price === 0) ? 'Gratis' : `${result.price}€`}
											</div>

										</a>
									</Link>
								)
							})
						}
					</div>
				</div>
			</div>

			{/* Acciones login y usuario */}
			<div className={`${isLogged ?? 'opacity-0 pointer-events-none'} flex flex-row items-center space-x-4`}>
				{isLogged ?
					<>
						<Link href="/new-activity">
							<a className='flex flex-row justify-center items-center text-base font-medium text-orange-600 px-6 h-10 bg-orange-100 active:bg-orange-200 active:bg-opacity-75 transition-colors duration-150 ease-in-out rounded-lg'>
								Crear
							</a>
						</Link>

						<div className='relative'>
							<Menu as="div" className="relative">
								
								<div>
									<Menu.Button className='relative flex flex-row items-center h-10 px-1.5 space-x-2'>
										<div className={`relative flex flex-row w-8 h-8 bg-gray-200 ${(sessionID === false) ? 'animate-pulse' : ''} ring-1 ring-gray-200 rounded-full overflow-hidden`}>
											{sessionID && <img src={sessionID.avatar} className='absolute w-full h-full rounded-full object-cover' alt='user avatar' />}
										</div>

										<div className='flex flex-row items-center'>
											<div>{sessionID.name}</div>
											<ChevronDownOutline
												className='flex flex-row justify-center items-center p-1.5'
												color={''}
												height="18px"
												width="18px"
											/>
										</div>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-card ring-1 ring-gray-700 ring-opacity-10 focus:outline-none">
										<div className="px-1 py-1">

											<Menu.Item>
												{({ active }) => (
													<button className={`${active ? 'bg-gray-100' : ''} flex rounded-lg items-center w-full`}>
														<Link href={`/profile?id=${sessionID.id_entity}`}>
															<a className='flex flex-row items-center w-full h-full px-3 py-2'>
																Mi cuenta
															</a>
														</Link>
													</button>
												)}
											</Menu.Item>

											<Menu.Item>
												{({ active }) => (
													<button className={`${active ? 'bg-gray-100' : ''} flex rounded-lg items-center w-full`}>
														<Link href={`/profile?id=${sessionID.id_entity}#created`}>
															<a className='flex flex-row items-center w-full h-full px-3 py-2'>
																Eventos creados
															</a>
														</Link>
													</button>
												)}
											</Menu.Item>

											<Menu.Item>
												{({ active }) => (
													<button className={`${active ? 'bg-gray-100' : ''} flex rounded-lg items-center w-full`}>
														<Link href={`/profile?id=${sessionID.id_entity}#signedup`}>
															<a className='flex flex-row items-center w-full h-full px-3 py-2'>
																Eventos apuntados
															</a>
														</Link>
													</button>
												)}
											</Menu.Item>

										</div>

										<div className="px-1 py-1">
											<Menu.Item>
												{({ active }) => (
													<button className={`${active ? 'bg-red-50' : ''} flex rounded-lg items-center w-full text-red-500`}>
														<Link href='/logout'>
															<a className='flex flex-row items-center w-full h-full px-3 py-2'>
																Cerrar sesión
															</a>
														</Link>
													</button>
												)}
											</Menu.Item>
										</div>

									</Menu.Items>
								</Transition>

							</Menu>
						</div>
					</>
					:
					<>
						<Link href="/signup">
							<a className='flex flex-row justify-center items-center text-base font-medium text-gray-700 px-6 h-10 bg-gray-100 active:bg-gray-200 active:bg-opacity-75 rounded-lg'>
								Crear cuenta
							</a>
						</Link>

						<Link href="/login">
							<a className='flex flex-row justify-center items-center text-base font-medium text-white px-6 h-10 bg-orange-500 active:bg-orange-600 active:bg-opacity-90 rounded-lg'>
								Iniciar sesión
							</a>
						</Link>
					</>
				}
			</div>

		</div>	
	)
}

export default Navbar
