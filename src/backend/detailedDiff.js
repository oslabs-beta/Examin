const isDate = (d) => d instanceof Date;
const isEmpty = (o) => Object.keys(o).length === 0;
const isObject = (o) => o != null && typeof o === 'object';
// properObject returns copy of input object
const properObject = (o) => (isObject(o) && !o.hasOwnProperty ? { ...o } : o);

const updatedDiff = (lhs, rhs) => {
	// Check if objects are same. if so, return {}
	if (lhs === rhs) return {};

	// Check if inputs are objects. If either is not, return second object
	if (!isObject(lhs) || !isObject(rhs)) return rhs;

	// Make copies of input objects
	const l = properObject(lhs);
	const r = properObject(rhs);

	// Checks if objects instance of Date
	// If dates are the same, return {}. Else return updated date
	if (isDate(l) || isDate(r)) {
		if (l.valueOf() == r.valueOf()) return {};
		return r;
	}

	console.log('r.keys', Object.keys(r));

	return Object.keys(r).reduce((acc, key) => {
		if (l.hasOwnProperty(key)) {
			const difference = updatedDiff(l[key], r[key]);

			if (isObject(difference) && isEmpty(difference) && !isDate(difference))
				return acc;

			return { ...acc, [key]: difference };
		}

		return acc;
	}, {});
};

export default updatedDiff;
