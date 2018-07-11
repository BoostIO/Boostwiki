import React from 'react'
import {
  Snackbar,
  IconButton
} from '@material-ui/core'
import {
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Warning as WarningIcon
} from '@material-ui/icons'
import { SvgIconProps } from '@material-ui/core/SvgIcon'
import {
  withStyles,
  WithStyles
} from '@material-ui/core/styles'
import classnames from 'classnames'

const variantIcons = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

type Variant = 'success' | 'warning' | 'error' | 'info'

interface SnackbarProps {
  message: React.ReactNode
  onClose: (event: any) => void
  variant: Variant
  open: boolean
}

const styles = {
  icon: {
    fontSize: '20px'
  },
  iconVariant: {
    marginRight: '8px'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}

type ClassNames = keyof typeof styles

const MySnackbar: React.SFC<SnackbarProps & WithStyles<ClassNames>> = (props) => {
  const { message, variant, onClose, classes, open } = props
  const Icon: React.ComponentType<SvgIconProps> = variantIcons[variant]
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={
        <span id='message-id' className={classes.message}>
          <Icon className={classnames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='Close'
          color='inherit'
          className={classes.icon}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  )
}

export default withStyles(styles)(MySnackbar)
