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
import Router from 'next/router'
import MenuItemLink from '../components/MenuItemLink'

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
  searchContent: string
}

@inject('route')
@inject('session')
@observer
class TopNavigator extends React.Component<TopNavigatorProps & WithStyles<ClassNames>, TopNavigatorState> {
  constructor (props) {
    super(props)

    this.state = {
      anchorEl: null,
      searchContent: ''
    }
  }

  setSearchContent = searchContent => this.setState({ searchContent })

  handleSubmitSearch = () => {
    const { searchContent } = this.state
    Router.push(`/articles/show?keyword=${searchContent}`, `/w/${searchContent}`)
      .catch(error => console.error(error))
  }

  handleAvatorClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleClickSignOutButton = () => {
    const { session } = this.props
    session.signout()
  }

  public render () {
    const {
      session,
      classes
    } = this.props

    const { currentUser } = session

    const {
      anchorEl,
      searchContent
    } = this.state

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
                <Input
                  onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
                    if (e.key === 'Enter') {
                      this.handleSubmitSearch()
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setSearchContent(e.target.value)}
                  value={searchContent}
                  startAdornment={
                    <InputAdornment position='start'>
                      <Search />
                    </InputAdornment>
                  }
                />
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
                <MenuItemLink href={`/users/show?uniqueName=${currentUser.uniqueName}`} as={`/users/${currentUser.uniqueName}`}>
                  Profile
                </MenuItemLink>
                <MenuItem onClick={this.handleClickSignOutButton}>Sign Out</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(TopNavigator)
