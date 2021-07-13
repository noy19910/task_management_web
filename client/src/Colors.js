

import { createMuiTheme } from '@material-ui/core/styles';
import {grey, pink} from '@material-ui/core/colors';


export const THEME = {
  primary: {

    main: grey[400],

  },

  secondary: {

    main: pink[300],


  },
}
export const theme = createMuiTheme({

  palette: {

    ...THEME,
    

  },

});