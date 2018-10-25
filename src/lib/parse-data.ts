import LoanData from './loan-data'

export default (data: any) => {
	return (data as IRawData[]).map(datum => new LoanData(datum))
}

export interface IRawData {
	annual_inc: string,
	loan_amnt: string,
	installment: string,
	int_rate: string,
	term: string,
	issue_d: string
}
