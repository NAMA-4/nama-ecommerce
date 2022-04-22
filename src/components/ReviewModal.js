import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function ReviewModal(props) {
  const [open, setOpen] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper')

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Review</Button>
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div className="modal-review">
          <DialogTitle id="scroll-dialog-title">
            {props.productName}
          </DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              className="text-color"
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {props.productReview}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="text-color" onClick={handleClose}>
              Close
            </Button>
            {/* <Button onClick={handleClose}>Subscribe</Button> */}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}
