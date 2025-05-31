import useGetHooks from '../Hooks/useGetHooks'

function Resurs() {
	const url = import.meta.env.VITE_API_URL
	const { data, isLoading, error } = useGetHooks(`${url}/resources`)
  
	console.log(data);
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return (
		<>
		 
		</>
	)
}

export default Resurs