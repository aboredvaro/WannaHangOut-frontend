import url from './server.js'

export const session = () => {
	return window.localStorage.getItem('sessionID') ? true : false
}

export const getSession = () => {
	return window.localStorage.getItem('sessionID') ?? false
}

export const setSession = async(mail, password) => {
	return await fetch(`${url}/api/isEntityRegistred`, {
  	method: 'POST',
  	headers: {
    	'Accept': 'application/json',
    	'Content-Type': 'application/json'
  	},
  	body: JSON.stringify({mail: mail, pass: password})
	}).then(
		response => response.json()
	).then(
		userExists => {
			if (userExists) {
				window.localStorage.setItem('sessionID', mail)
				return true
			}
			return false
		}
	)
}

export function exitSession() {
	window.localStorage.removeItem('sessionID')
	return true
}