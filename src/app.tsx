import * as React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles, Theme } from '@material-ui/core/styles'
import AppBar from './components/app-bar'
import Visualizations from './components/visualizations'

interface IProps {
	classes: {
		[key: string]: any
	}
}

const styles = (theme: Theme) => ({
	'@global': {
		body: {
			fontFamily: theme.typography.fontFamily
		}
	},
	appFrame: {
		padding: theme.spacing.unit * 3
	}
})

class App extends React.Component<IProps> {
	public render() {
		const { classes } = this.props

		return (
			<div className="App">
				<CssBaseline />
				<AppBar />
				<div className={classes.appFrame}>
					<Visualizations />
				</div>

			</div>
		)
	}
}

export default withStyles(styles)(App)
