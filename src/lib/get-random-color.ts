import * as colors from '@material-ui/core/colors'

function getRandomObjectKey(obj: object) {
	const keys = Object.keys(obj)
	/* tslint:disable:no-bitwise */
	return obj[keys[ keys.length * Math.random() << 0 ]]
}

export default function getRandomColor() {
	const colorObj = getRandomObjectKey(colors)

	return getRandomObjectKey(colorObj)
}
