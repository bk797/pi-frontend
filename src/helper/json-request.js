//@flow
const urlBase = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://personality-insight-backend.herokuapp.com';

type getFn = (url:string)=> Promise<any>;
type postFn = (url:string,body:any)=> Promise<any>;

export const get: getFn = async (url) => {
	const res = await fetch(urlBase+url,{method:'GET'});
	if(res.status >= 400) throw new Error(`Error ${res.status}: ${res.statusText}`);
	return res.json();
}

export const post: postFn = async (url,body) => {
	const res = await fetch(urlBase+url,{method:'POST',body});
	if(res.status >= 400) throw new Error(`Error ${res.status}: ${res.statusText}`);
	return res.json();
}
