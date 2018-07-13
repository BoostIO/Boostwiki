import React from 'react'
import { inject, observer } from 'mobx-react'
import { CurrentUserStore } from '../lib/CurrentUserStore'
import { RouteState } from '../lib/RouteState'
import {
  AppBar,
  Typography,
  Avatar,
  Button,
  Toolbar,
  Menu,
  MenuItem
} from '@material-ui/core'
import {
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import Link from 'next/link'

interface TopNavigatorProps {
  currentUserStore?: CurrentUserStore
  route?: RouteState
}

const styles = {
  root: {
    borderBottom: `1px solid ${grey[300]}`
  },
  flex: {
    justifyContent: 'space-between'
  },
  title: {
    color: 'black',
    textDecoration: 'none'
  },
  avatorButton: {
    boxShadow: 'none'
  }
}

type ClassNames = keyof typeof styles

interface TopNavigatorState {
  anchorEl: HTMLAnchorElement
}

@inject('route')
@inject('currentUserStore')
@observer
class TopNavigator extends React.Component<TopNavigatorProps & WithStyles<ClassNames>, TopNavigatorState> {
  constructor (props) {
    super(props)

    this.state = {
      anchorEl: null
    }
  }

  handleAvatorClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public render () {
    const {
      currentUserStore,
      classes
    } = this.props
    const { anchorEl } = this.state
    const { currentUser } = currentUserStore
    return (
      <AppBar
        color='primary'
        position='static'
        elevation={0}
        className={classes.root}>
        <Toolbar className={classes.flex}>
          <Link href='/'>
            <a className={classes.title}>
              <Typography variant='title' color='inherit'>
                Boostwiki
              </Typography>
            </a>
          </Link>
          {currentUser == null
            ? <Button href='/auth/github' color='inherit'>Sign in</Button>
            : <>
              <Button
                onClick={this.handleAvatorClick}
                mini
                variant='fab'
                disableRipple
                className={classes.avatorButton}
                aria-owns={anchorEl ? 'avator-menu' : null}
              >
                <Avatar
                  src={`https://avatars3.githubusercontent.com/u/${currentUser.githubId}?v=4&s=30`}/>
              </Button>
              <Menu
                id='avator-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Sign Out</MenuItem>
              </Menu>
            </>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopNavigator)
