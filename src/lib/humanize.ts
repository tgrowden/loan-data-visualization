export default function humanize(str: string) {
	return str
		.replace(/^[\s_]+|[\s_]+$/g, '')
		.replace(/[_\s]+/g, ' ')
		.replace(/^[a-z]/, m => m.toUpperCase())
		.split(' ')
		.map(i => `${i.charAt(0).toUpperCase()}${i.slice(1)}`)
		.join(' ')
}
