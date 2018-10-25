import * as React from 'react'
import { PieChart, Pie, Tooltip } from 'recharts'
import LoanData from '../../lib/loan-data'
import getRandomColor from '../../lib/get-random-color'

interface IProps {
	loanData: LoanData[]
}

export default class PercentageOfIncome extends React.Component<IProps> {

	public get data() {
		let groups: object = {}

		this.props.loanData.forEach(datum => {
			groups = this.createOrIncrementGroup(groups, datum)
		})

		return Object.keys(groups)
			.map(key => ({
				...groups[key],
				fill: getRandomColor()
			}))
	}

	public createOrIncrementGroup = (groups: any, loanData: LoanData) => {
		const max = loanData.loanPercentageOfIncome - (loanData.loanPercentageOfIncome % 10) + 10

		if (Number.isNaN(max)) return groups

		if (!groups[max]) {
			groups[max] = {
				name: `${max - 10}% - ${max}%`,
				value: 0
			}
		}

		groups[max].value += 1

		return groups
	}

	public render() {
		return (
			<PieChart width={800} height={400}>
				<Pie data={this.data} dataKey="value" labelLine={false} />
				<Tooltip />
			</PieChart>
		)
	}
}
