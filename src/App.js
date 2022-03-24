import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, Slide, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          TransitionComponent={Slide}
        >
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
