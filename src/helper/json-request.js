const urlBase = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://personality-insight-backend.herokuapp.com';

export const get = async (url) => {
	const res = await fetch(urlBase+url,{method:'GET'});
	if(res.status >= 400) throw new Error(`Error ${res.status}: ${res.statusText}`);
	return res.json();
}

export const post = async (url,body) => {
	const res = await fetch(urlBase+url,{method:'POST',body});
	if(res.status >= 400) throw new Error(`Error ${res.status}: ${res.statusText}`);
	return res.json();
}
