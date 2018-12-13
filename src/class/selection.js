class Selection{
	constructor(items: Array<any>){
		this.$dict = {};
		if(items) items.forEach(this.add);
	}

	add = (key:any) => this.$dict[key] = true;
	remove = (key:any) => this.$dict[key] = false;
	contains = (key:any) => this.$dict[key] !== undefined && this.$dict[key] !== false;
	toggle = (key:any) => this.contains(key) ? this.remove(key) : this.add(key);
	entries = (): Array => Object.keys(this.$dict).filter(this.contains);

}

export default Selection;