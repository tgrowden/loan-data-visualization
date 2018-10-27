import * as React from 'react'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Typography from '@material-ui/core/Typography'
import LoanData from '../../lib/loan-data'
import getRandomColor from '../../lib/get-random-color'
import formatNumber from '../../lib/format-number'

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
			<div>
				<Typography variant="h4">Loan Percentage of Income</Typography>
				<ResponsiveContainer aspect={1.5}>
					<PieChart>
						<Pie data={this.data} dataKey="value" labelLine={false} />
						<Tooltip
							formatter={value => formatNumber(value as number)}
						/>
						<Legend
							layout="vertical"
							formatter={(label, obj) => {
								/**
								 * It seems as though the type definitions are not up-to-date
								 * @TODO: submit PR to `@types/recharts` to fix
								 */
								const other = obj as any
								if (!other || !other.payload || !other.payload.value) return label

								return `${label} (${formatNumber(other.payload.value)})`
							}}
						/>
					</PieChart>
				</ResponsiveContainer>
			</div>
		)
	}
}
