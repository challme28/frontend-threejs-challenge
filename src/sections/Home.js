import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import CircleIcon from '@mui/icons-material/Circle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'
import {useStyles} from './styles'
import Scene from '../components/Scene';

import background from '../assets/background.png'
import {useState} from 'react'
import { Button } from '@mui/material';

const Body = ({children})=>{
  const classes = useStyles()
  return(
    <div className={classes.body} style={{ backgroundImage: `url(${background})` }}>
      {children}
    </div>
  )
}

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const [color, setColor] = useState('#ff0000')
  const [shape, setShape] = useState('cube')
  const [texture, setTexture] = useState('')

  const colors = ['#3378FF','#f56d3d','#f6c108', '#bc2f5e','#34989c', '#93d052', '#5387f8', '#6f5a9f']
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar className={classes.geometry}>
          <Box>
            {colors.map(color=>{
              return(
                <IconButton key={color} size="large" aria-label="show 4 new mails" color="inherit"  onClick={()=>setColor(color)}>
                  <CircleIcon style={{color:color}}/>
                </IconButton>
              )
            })}
          </Box>
          <Box>
            <Button variant="contained" sx={{backgroundColor: '#676767' }} onClick={() => setTexture('iron')}>Iron</Button>
            <Button variant="contained" sx={{margin: '0 2rem' }} onClick={() => setTexture('')}>None</Button>
            <Button variant="contained" sx={{backgroundColor: '#a97958' }} onClick={() => setTexture('wood')}>Wood</Button>
          </Box>
          <Box>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={()=>setShape('cube')}>
              <CropSquareIcon/>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"  onClick={()=>setShape('sphere')}>
              <RadioButtonUncheckedIcon/>
            </IconButton>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"  onClick={()=>setShape('triangle')}>
              <ChangeHistoryIcon/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Body className="body-content">
        <Scene color={color} shape={shape} texture={texture}/>
      </Body>
    </Box>
  );
}
