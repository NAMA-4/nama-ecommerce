import * as React from 'react'
// import Box from '@mui/material/Box'
// import Drawer from '@mui/material/Drawer'
// import Button from '@mui/material/Button'
// import List from '@mui/material/List'
// import Divider from '@mui/material/Divider'
// import ListItem from '@mui/material/ListItem'
// import ListItemIcon from '@mui/material/ListItemIcon'
// import ListItemText from '@mui/material/ListItemText'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
// import MailIcon from '@mui/icons-material/Mail'
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
// import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import logo from '../img/NaMa.png'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="leftside">{/* <TemporaryDrawer /> */}</div>
      <div className="center-logo">
        <img className="logo-img" src={logo} alt="logo" />
        <h3 className="logo-text">Online Market</h3>
      </div>
      <div className="rightside">{/* <SearchRoundedIcon /> */}</div>
    </div>
  )
}

export default Navbar

// function TemporaryDrawer() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   })

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === 'keydown' &&
//       (event.key === 'Tab' || event.key === 'Shift')
//     ) {
//       return
//     }

//     setState({ ...state, [anchor]: open })
//   }

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   )

//   return (
//     <div>
//       {['left'].map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>
//             <MenuRoundedIcon />
//           </Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   )
// }
