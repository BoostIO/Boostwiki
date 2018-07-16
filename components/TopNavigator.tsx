import React from 'react'
import { inject, observer } from 'mobx-react'
import { Session } from '../lib/Session'
import { RouteState } from '../lib/RouteState'
import {
  AppBar,
  Typography,
  Avatar,
  Button,
  Toolbar,
  Menu,
  MenuItem,
  Input,
  InputAdornment,
  FormControl
} from '@material-ui/core'
import {
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import grey from '@material-ui/core/colors/grey'
import Link from 'next/link'

interface TopNavigatorProps {
  session?: Session
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
  },
  formCtrl: {
    marginRight: 12
  }
}

type ClassNames = keyof typeof styles

interface TopNavigatorState {
  anchorEl: HTMLAnchorElement
}

@inject('route')
@inject('session')
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
      session,
      classes
    } = this.props

    const { anchorEl } = this.state
    const { currentUser } = session
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
            : <div>
              <FormControl className={classes.formCtrl}>
                <Input startAdornment={
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                } />
              </FormControl>
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
            </div>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopNavigator)
