import { IRawData } from './parse-data'

export default class LoanData {
	private data: IRawData

	constructor(data: IRawData) {
		this.data = data
	}

	/**
	 * Annual income
	 *
	 * @readonly
	 * @memberof LoanData
	 */
	get income() {
		return this.data.annual_inc ? parseInt(this.data.annual_inc.trim(), 10) : 0
	}

	/**
	 * Loan amount
	 *
	 * @readonly
	 * @memberof LoanData
	 */
	get loanAmount() {
		return this.data.loan_amnt ? parseInt(this.data.loan_amnt.trim(), 10) : 0
	}

	/**
	 * Payment installment
	 *
	 * @readonly
	 * @memberof LoanData
	 */
	get installment() {
		return parseFloat(this.data.installment.trim())
	}

	/**
	 * Interest rate
	 *
	 * @readonly
	 * @memberof LoanData
	 */
	get interestRate() {
		return parseFloat(this.data.int_rate.replace(/[^\d.-]/g, ''))
	}

	/**
	 * Loan term
	 *
	 * @readonly
	 * @memberof LoanData
	 */
	get term() {
		return parseInt(this.data.term.replace(/[^\d.-]/g, ''), 10)
	}

	/**
	 * Date of loan being issued
	 *
	 * @readonly
	 * @memberof LoanData
	 */
	get issuedDate() {
		return new Date(this.data.issue_d)
	}

	public get loanPercentageOfIncome() {
		return parseInt((this.loanAmount / this.income * 100).toFixed(0), 10)
	}
}
