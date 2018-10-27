const fs = require('fs')
const path = require('path')
const csv = require('csvtojson')

const files = {
	in: path.resolve(__dirname, '..', 'LoanStats3a.csv'),
	out: path.resolve(__dirname, '..', 'public', 'data.json')
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
	.then(data => {
		fs.writeFileSync(files.out, JSON.stringify(data), 'utf8')
	})
