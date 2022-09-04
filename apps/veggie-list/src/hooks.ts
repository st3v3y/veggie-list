import type { Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import { locale } from 'svelte-i18n';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || crypto.randomUUID();

	event.locals.lang = "en";
	locale.subscribe((val) => {
		event.locals.lang = val && val.startsWith('es') ? 'es' : 'en';
	})

	const response = await resolve(event);

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};
