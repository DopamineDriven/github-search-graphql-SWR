export const filterQuery = (query: any) =>
	Object.keys(query).reduce<any>((obj, key) => {
		if (query[key]?.length) {
			obj[key] = query[key];
		}
		return obj;
	}, {});
