import * as React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import LoanData from '../../lib/loan-data'
import parseData, { IRawData } from '../../lib/parse-data'
import PercentageOfIncome from './percentage-of-income'
import LoanPurpose from './loan-purpose'

interface IVisualizationOption {
	component: React.ComponentType | any,
	label: string
}

const visualizations: { [key: string]: IVisualizationOption } = {
	loanPurpose: {
		component: LoanPurpose,
		label: 'Loan Purpose'
	},
	percentageOfIncome: {
		component: PercentageOfIncome,
		label: 'Loan Percentage of Income'
	}
}

interface IProps {
	classes: {
		[key: string]: any
	}
}

interface IState {
	loanData: LoanData[],
	selectedVisualization: string
}

const styles = (theme: Theme) => ({
	selectWrapper: {
		marginBottom: theme.spacing.unit * 2
	}
})

class Visualizations extends React.Component<IProps, IState> {
	public state: IState  = {
		loanData: [],
		selectedVisualization: Object.keys(visualizations)[0]
	}

	public componentWillMount() {
		// Fetch the data so we can make use of caching
		fetch('/data.json')
			.then(res => res.json())
			.then(data => this.normalizeData(data))
			.then(json => parseData(json))
			.then(loanData => {
				this.setState({ loanData })
			})
	}

	public render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<div className={classes.selectWrapper}>
					<Select value={this.state.selectedVisualization} onChange={this.handleSelectChange}>
						{
							Object.keys(visualizations)
								.map(key => (
									<MenuItem key={`visualization-option-${key}`} value={key}>{visualizations[key].label}</MenuItem>
								))
						}
					</Select>
				</div>
				{ this.selectedVisualization }
			</div>
		)
	}

	public handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target

		this.setState(prevState => {
			if (!prevState) return
			if (prevState.selectedVisualization === value) return

			return { selectedVisualization: value as string } as IState
		})
	}

	private get selectedVisualization() {
		const { loanData, selectedVisualization } = this.state
		if (!loanData.length) return null

		const Component = visualizations[selectedVisualization].component

		return <Component loanData={loanData} />
	}

	private normalizeData(data: IRawData[]) {
		return data
			.filter((datum: IRawData) => {
				return datum.loan_amnt !== undefined &&
					datum.annual_inc !== undefined
			})
	}
}

export default withStyles(styles)(Visualizations)
