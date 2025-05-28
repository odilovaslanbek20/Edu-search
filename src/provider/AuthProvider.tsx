import createStore from 'react-auth-kit/createStore'

export const store = createStore({
	authName: '_token',
	authType: 'cookie',
	cookieDomain: window.location.hostname,
	cookieSecure: window.location.protocol === 'https:',
})
