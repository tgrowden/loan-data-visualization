import * as React from 'react'
import { default as MuiAppBar } from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	}
}

interface IProps {
	classes: {
		[key: string]: any
	}
}

class AppBar extends React.Component<IProps> {
	public componentWillMount() {
		(window as Window & { __MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__: boolean }).__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true
	}

	public render() {
		const { classes } = this.props

		return (
			<div className={classes.root}>
				<MuiAppBar position="static">
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							Loan Data Visualizations
						</Typography>
					</Toolbar>
				</MuiAppBar>
			</div>
		)
	}
}

export default withStyles(styles)(AppBar)
