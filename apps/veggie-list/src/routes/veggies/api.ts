/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = 'http://127.0.0.1:3001/v1/veggies';

export function api(method: string, resource: string, data?: Record<string, unknown>) {
	console.log("sending to", `${base}/${resource}`, JSON.stringify(data))
	return fetch(`${base}/${resource}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
}
