import * as React from 'react'
import 'normalize.css'
import parseData from './lib/parse-data'
import LoanData from './lib/loan-data'
import PercentageOfIncome from './components/visualizations/percentage-of-income'

interface IState {
	loanData: LoanData[]
}

class App extends React.Component {
	public state: IState  = {
		loanData: []
	}

	public componentWillMount() {
		// Fetch the data so we can make use of caching
		fetch('/data.json')
			.then(res => res.json())
			.then(data => data.filter((datum: any) => {
				return datum.loan_amnt !== undefined && datum.annual_inc !== undefined
			}))
			.then(json => parseData(json))
			.then(loanData => {
				this.setState({ loanData })
			})
	}

	public render() {
		return (
			<div className="App">
				<h3 style={{ textAlign: 'center' }}>Loan percentage of income for loans between 2007-2011</h3>
				<div>
				<PercentageOfIncome loanData={this.state.loanData} />
				</div>
			</div>
		)
	}
}

export default App
