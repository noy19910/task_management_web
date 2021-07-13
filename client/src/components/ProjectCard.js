import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputDialog from './InputDialog';
import {SnackbarProvider, useSnackbar} from 'notistack';

const useStyles = makeStyles ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProjectCard({
  className,
  id,
  title = 'Project1',
  color = '#f06292',
  onProjectNameChange,
  onOpenProject = () => {},
}) {
  const classes = useStyles ();
  const [anchorEl, setAnchorEl] = React.useState (null);
  const open = Boolean (anchorEl);
  const ref = useRef ();
  const {enqueueSnackbar} = useSnackbar ();
  const onAlert = (message, variant) => {
    enqueueSnackbar (message, variant);
  };
  const handleClick = event => {
    setAnchorEl (event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl (null);
  };


  const onProjectNameChangeLocal = (name) => {
    if(name){
      onProjectNameChange(name)
      onAlert ('Project name changed', {variant: 'success'});
    }else{
      onAlert ('Please enter a name', {variant: 'error'});
    }
  }

  const onOptionClick = option => {
    switch (option) {
      case 'open project':
        onOpenProject()
        break;
      case 'change name':
        if(ref && ref.current){
          handleClose()
          ref.current.setName(title)
          ref.current.open()
        }
        break;
      case 'change color':
        break;
    }
  };
  return (
    <Card className={classes.root + ' projectCard1 ' + className}>
      <InputDialog ref={ref} onApply={onProjectNameChangeLocal} />
      <CardContent>
        <div className="float-right" style={{marginTop: -20, marginRight: -15}}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            {options.map (option => (
              <MenuItem key={option} onClick={() => onOptionClick (option)}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div >{title}</div>
      </CardContent>

    </Card>
  );
}
const options = ['open project', 'change name'];
const ITEM_HEIGHT = 48;
