import {post} from '../helper/json-request';
class FormInput {

	constructor(){
		this.$body = {}
		this.$dest = '';
	}

	toFormBody = (): FormData => {
		const formBody = new FormData();
		for(const key in this.$body){
			formBody.append(key,this.$body[key]);
		}
		return formBody;
	}

	setDestination = (path:string) => this.$dest = path;

	insertEntry = (key:string,value:any) => this.$body[key] = value;

	appendEntry = (key:string,value:any) => {
		const item = this.$body[key];
		if(!item) this.insertEntry(key,value);
		else if(Array.isArray(item)) this.insertEntry(key,item.concat(value));
		else this.insertEntry(key,[item,value]);
	}

	send = () => post(this.$dest,this.toFormBody());

}

export default FormInput