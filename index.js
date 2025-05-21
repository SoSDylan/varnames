export default function varNames(vars) {
	if (!isDict(vars)) {
		throw new Error(`Argument "${vars}" must be an object`);
	}

	let styles = '';

	for (const [name, value] of Object.entries(vars)) {
		const variableName = parseName(name);
		const variableValue = parseValue(value);

		if (variableValue === null) continue;

		const newStyle = `${variableName}:${variableValue};`;

		styles = styles ? styles + newStyle : newStyle;
	}

	return styles;
}

function parseName(name) {
	const kebabCase = name.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (str, ofs) => (ofs ? "-" : "") + str.toLowerCase());
	return `--${kebabCase}`;
}

function parseValue(value) {
	if (typeof value === 'string') {
		return value;
	}

	if (typeof value === 'number') {
		return value.toString();
	}

	if (typeof value === 'function') {
		return parseValue(value());
	}

	if (value === null || value === undefined) {
		return null;
	}

	console.warn('Unable to parse value', value);

	return null;
}

function isDict(value) {
	return value !== undefined && value !== null && value.constructor === Object;
}
