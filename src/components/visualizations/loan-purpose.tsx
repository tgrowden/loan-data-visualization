import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { withStyles, Theme } from '@material-ui/core'
import LoanData from '../../lib/loan-data'
import humanize from '../../lib/humanize'
import formatNumber from '../../lib/format-number'

interface IProps {
	loanData: LoanData[],
	classes: {
		[key: string]: any
	},
	theme: Theme
}

const styles = (theme: Theme) => ({
	headline: {
		marginBottom: theme.spacing.unit * 2
	}
})

class LoanPurpose extends React.Component<IProps> {
	public get data() {
		let groups: object = {}

		this.props.loanData.forEach(datum => {
			groups = this.createOrIncrementGroup(groups, datum)
		})

		return Object.keys(groups)
			.map(key => groups[key])
	}

	public render() {
		const { theme, classes } = this.props

		return (
			<div>
				<Typography className={classes.headline} variant="h4">Loan Purposes and Total Amounts Issued</Typography>
				<ResponsiveContainer aspect={1.5} maxHeight={500}>
					<BarChart data={this.data} margin={{ right: theme.spacing.unit * 7 }}>
						<CartesianGrid strokeDasharray="3 1" />
						<XAxis dataKey="name" />
						<YAxis
							tickFormatter={value => formatNumber(value as number)}
							yAxisId="left"
							orientation="left"
							stroke={theme.palette.secondary.main}
						/>
						<YAxis
							tickFormatter={value => `$${formatNumber(value as number)}`}
							yAxisId="right"
							orientation="right"
							stroke={theme.palette.primary.main}
						/>
						<Tooltip
							formatter={(value, key) => {
								let val = formatNumber(value as number)
								if (key === 'Total') {
									val = `$${val}`
								}

								return val
							}}
						/>
						<Legend />
						<Bar yAxisId="left" dataKey="# Loans" fill={theme.palette.secondary.main} />
						<Bar yAxisId="right" dataKey="Total" fill={theme.palette.primary.main} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		)
	}

	private createOrIncrementGroup = (groups: object, loanData: LoanData) => {
		if (!groups[loanData.purpose]) {
			groups[loanData.purpose] = {
				name: humanize(loanData.purpose),
				'# Loans': 0,
				'Total': 0
			}
		}

		groups[loanData.purpose]['# Loans'] += 1
		groups[loanData.purpose].Total += loanData.loanAmount

		return groups
	}
}

export default withStyles(styles, { withTheme: true })(LoanPurpose)
