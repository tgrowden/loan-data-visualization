import LoanData from './loan-data'

export default (data: any) => {
	return {
		loanData: (data.loanData as IRawData['loanData'])
			.filter(datum => {
				return datum.loan_amnt !== undefined &&
					datum.annual_inc !== undefined
			})
			.map(datum => new LoanData(datum)),
		heatmapData: (data.heatmapData as IRawData['heatmapData'])
			.filter(i => !!i.date)
			.map(datum => ({ ...datum, date: new Date(datum.date)}))
	}
}

export interface IRawData {
	loanData: IRawLoanData[],
	heatmapData: IRawHeatmapData[]
}

export interface IRawLoanData {
	annual_inc: string,
	loan_amnt: string,
	installment: string,
	int_rate: string,
	term: string,
	issue_d: string,
	purpose: string
}

export interface IRawHeatmapData {
	date: string,
	amount: number,
	payments: number
}
