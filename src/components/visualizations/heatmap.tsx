import * as React from 'react'
// import * as d3 from 'd3'

interface IProps {
	data: IMonthDatum[]
}

interface IMonthDatum {
	value: number,
	date: Date
}

// interface IMonthData {
// 	[key: string]: IMonthDatum
// }

// function* getData(res: IMonthData, data: LoanData[]) {
// 	data.forEach(function* (datum) {
// 		const startDate = datum.issuedDate

// 		for (let i = 0; i <= datum.term; i++) {
// 			const currentDate = addMonths(startDate, i)
// 			const key = `${currentDate.getMonth()}-${currentDate.getFullYear()}`
// 			const item = res[key] || { value: 0, date: currentDate } as IMonthDatum

// 			item.value++

// 			res[key] = item

// 			yield res
// 		}
// 	})
// }

class Heatmap extends React.Component<IProps> {
	public render() {
		return ( <div id="heatmap-root" /> )
	}

}

export default Heatmap
