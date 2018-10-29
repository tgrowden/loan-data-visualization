const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')
const addMonths = require('date-fns/add_months')

const files = {
	in: path.resolve(__dirname, '..', 'LoanStats3a.csv'),
	out: path.resolve(__dirname, '..', 'public', 'data.json')
}

function getHeatmapData(loanData) {
	const res = {}
	let startDate
	let currentDate
	let key

	loanData.forEach(datum => {
		startDate = datum.issuedDate

		for (let i = 0; i <= datum.term; i++) {
			currentDate = addMonths(startDate, i)
			key = currentDate.getTime()
			if (!res[key]) {
				res[key] = {
					payments: 0,
					date: currentDate,
					amount: 0
				}
			}

			res[key].amount += datum.installment
			res[key].payments++
		}
	})

	return Object.keys(res)
		.sort()
		.map(i => res[i])
		.filter(i => i.date !== null)
}

csv()
	.fromFile(files.in)
	// only save the relevant properties to reduce file size
	.then(data => {
		return data.map(datum => ({
			annual_inc: datum.annual_inc,
			loan_amnt: datum.loan_amnt,
			installment: datum.installment,
			int_rate: datum.int_rate,
			term: datum.term,
			issue_d: datum.issue_d,
			purpose: datum.purpose
		}))
	})
	.then(loanData => {
		// const heatmapData =
		return {
			loanData,
			heatmapData: getHeatmapData(loanData.map(i => ({
				issuedDate: new Date(i.issue_d),
				term: i.term ? parseInt(i.term.replace(/[^\d.-]/g, ''), 10) : 0,
				installment: i.installment ? parseFloat(i.installment.trim()) : 0
			})))
		}
	})
	.then(data => {
		fs.writeFileSync(files.out, JSON.stringify(data), 'utf8')
	})
