import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import { LogoTwitter, MailOpenOutline, LinkOutline } from 'react-ionicons'

const QR = (props) => {

	let [isSharing, setIsSharing] = useState(false)
	let [isCopied, setIsCopied] = useState(false)

	function closeModal() {
		setIsSharing(false)
		setIsCopied(false)
	}

	function openModal() {
		setIsSharing(true)
	}

	const copyURL = () => {
		var dummy = document.createElement('input')
		document.body.appendChild(dummy)
		dummy.value = 'https://wannahangout.herokuapp.com/'
		dummy.select()
		document.execCommand('copy')
		document.body.removeChild(dummy)
		setIsCopied(true)
		setTimeout(() => setIsCopied(false), 2000)
	}

	return (
		<>
			{/* CTA */}
			<div className="w-full flex flex-col space-y-10 items-center my-20 px-6">
        
				<div className="flex flex-col space-y-2 justify-center items-center">
					<Image
						src="/logos/who.svg"
						alt="Wanna Hang Out logo"
						width={130}
						height={64}
						className="pointer-events-none"
					/>

					<p className="text-sm text-gray-400">Feria de proyectos PIN 2021</p>
				</div>

				<div className="flex flex-row justify-center items-center max-w-md text-base font-medium text-center text-red-600 bg-red-50 px-6 py-4 rounded-xl">
					La aplicación está actualmente en desarrollo. La versión final se publicará el Jueves 16 de Diciembre.
				</div>

				<div className="hidden flex-col space-y-4 items-center">
					<Link href="/">
						<a className="flex flex-row justify-center items-center text-base font-medium text-white bg-orange-500 px-6 h-10 rounded-lg">Ir a la web</a>
					</Link>

					<div
						onClick={() => openModal()}
						className="text-base font-medium text-orange-600 cursor-pointer"
					>
						Compartir proyecto
					</div>
				</div>

			</div>

			{/* Team */}
			<div className="w-full max-w-md mx-auto flex flex-col space-y-10 items-center mb-20 px-6">

				<div className="flex flex-col items-center">
					<h3 className="text-xl font-medium">EQUIPO</h3>
					<h4 className="text-xs text-gray-400">(Click en integrante para ir a Linkedin)</h4>
				</div>
        
				<div className="w-full space-y-3">

					<a
						href="https://www.linkedin.com/in/alvarohernandezperales/"
						target="_blank"
						rel="noreferrer"
						className="flex flex-row w-full space-x-2 justify-center items-center"
					>
						<div className="flex flex-col flex-grow">
							<p className="text-xl font-medium text-gray-700">Álvaro Hernández</p>
							<p className="text-sm text-gray-400">Desarrollador y Diseñador</p>
						</div>

						<div>
							<Image
								src="/images/team/varo.jpg"
								alt="Álvaro Hernández Perales"
								width={64}
								height={64}
								className="pointer-events-none rounded-full"
							/>
						</div>
					</a>

					<div className="w-full h-px bg-gray-100" />

					<a
						href="https://www.linkedin.com/in/carmelomolerocastillo/"
						target="_blank"
						rel="noreferrer"
						className="flex flex-row w-full space-x-2 justify-center items-center"
					>
						<div className="flex flex-col flex-grow">
							<p className="text-xl font-medium text-gray-700">Carmelo Molero</p>
							<p className="text-sm text-gray-400">Desarrollador</p>
						</div>

						<div>
							<Image
								src="/images/team/carmelo.jpg"
								alt="Carmelo Molero Castillo"
								width={64}
								height={64}
								className="pointer-events-none rounded-full"
							/>
						</div>
					</a>

					<div className="w-full h-px bg-gray-100" />

					<a
						href="https://www.linkedin.com/in/jie-xu-chen-556843170/"
						target="_blank"
						rel="noreferrer"
						className="flex flex-row w-full space-x-2 justify-center items-center"
					>
						<div className="flex flex-col flex-grow">
							<p className="text-xl font-medium text-gray-700">Jie Xu</p>
							<p className="text-sm text-gray-400">Desarrollador</p>
						</div>

						<div>
							<Image
								src="/images/team/jie.jpg"
								alt="Jie Xu Chen"
								width={64}
								height={64}
								className="pointer-events-none rounded-full"
							/>
						</div>
					</a>

					<div className="w-full h-px bg-gray-100" />

					<div className="flex flex-row w-full space-x-2 justify-center items-center">
						<div className="flex flex-col flex-grow">
							<p className="text-xl font-medium text-gray-700">Paco Arjona</p>
							<p className="text-sm text-gray-400">Desarrollador</p>
						</div>

						<div>
							<Image
								src="/images/team/paco.jpg"
								alt="Francisco de Paula Arjona Juménez"
								width={64}
								height={64}
								className="pointer-events-none rounded-full"
							/>
						</div>
					</div>

				</div>

			</div>

			{/* Description */}
			<div className="w-full max-w-2xl mx-auto flex flex-col space-y-10 items-center mb-20 px-6">

				<h3 className="text-xl font-medium">OBJETIVO</h3>
        
				<div className="w-full space-y-6">

					<div className="text-base text-justify">
						<p>
							Wanna Hang Out nace del problema que sufren una gran cantidad de estudiantes cuando se mudan de ciudad por estudios o trabajo y no conocen gente ni saben qué hacer con su ocio.
						</p>
						<br/>
						<p>
							Nuestro objetivo es crear una comunidad en la que conectamos personas que buscan quedadas, con personas que hostean quedadas. De esta forma tenemos un lugar donde acudir para buscar a otras personas con las que compartir nuestro ocio, ya sea haciendo deporte, tomar algo o descubrir un nuevo hobbie.
						</p>
					</div>

					<div className="hidden flex-col space-y-2">
						<a className="flex flex-row justify-center items-center text-base font-medium text-white bg-orange-500 px-6 h-10 rounded-lg">Ir a la web</a>
						
						<a className="flex flex-row justify-center items-center text-base font-medium text-gray-700 bg-gray-100 px-6 h-10 rounded-lg">Compartir proyecto</a>
					</div>

				</div>

			</div>

			<Transition appear show={isSharing} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-40" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
              &#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium text-gray-700"
								>
                  Gracias por compartir 🤗
								</Dialog.Title>

								<div className="mt-2">
									<p className="text-base text-gray-500">
                    Agradecemos tu participación y esperamos que hayas disfrutado de la experiencia usando la aplicación.
									</p>
								</div>
								
								<div className="flex flex-row mt-8 space-x-4">

									<a
										style={{
											backgroundColor: '#D8EFFD'
										}}
										className="flex flex-col items-center justify-center w-12 sm:w-10 h-12 sm:h-10 rounded-lg outline-none"
										href="http://twitter.com/share?text=¿Llegas nuevo a la ciudad y no tienes planes? Conecta con personas con tus mismos gustos y descubre experiencias cerca de ti, allá donde vayas.&url=https://wannahangout.herokuapp.com&hashtags=feriaetsinf,etsinfupv"
									>
										<LogoTwitter
											color={'#1DA1F2'}
											title={''}
											height="24px"
											width="24px"
										/>
									</a>

									<a
										className="flex flex-col items-center justify-center bg-gray-100 w-12 sm:w-10 h-12 sm:h-10 rounded-lg outline-none"
										href="mailto:?subject=Wanna Hang Out (Feria de Proyectos PIN 2021)&amp;body=He estado en la feria de proyectos de la ETSINF y quería compartirte este proyecto que me ha llamado la atención https://wannahangout.herokuapp.com."
									>
										<MailOpenOutline
											color={'#374151'}
											title={''}
											height="24px"
											width="24px"
										/>
									</a>

									<div
										className="relative flex flex-col items-center justify-center bg-gray-100 w-12 sm:w-10 h-12 sm:h-10 rounded-lg outline-none cursor-pointer"
										onClick={() => copyURL()}
									>
										<Transition
											show={isCopied}
											enter="transition-transform transition-opacity linear duration-75"
											enterFrom="opacity-0 transform translate-y-0"
											enterTo="opacity-100 transform -translate-y-2"
											leave="transition-transform transition-opacity linear duration-150"
											leaveFrom="opacity-100 transform -translate-y-2"
											leaveTo="opacity-0 transform translate-y-0"
										>
											<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 flex flex-col px-4 py-2 whitespace-nowrap text-white bg-gray-900 bg-opacity-75 rounded-xl pointer-events-none">
												Link copiado!
											</div>
										</Transition>

										<LinkOutline
											color={'#374151'}
											title={''}
											height="24px"
											width="24px"
										/>
									</div>

								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default QR