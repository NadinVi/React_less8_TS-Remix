import { Links, LiveReload, Meta, Scripts, ScrollRestoration, Link, Outlet } from '@remix-run/react';

import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'

import classNames from './RootLayout.module.css'
import { Footer } from '~/components/Footer/Footer'

const HEADER_SX = {
  flexGrow: 1,
}

const RootLayout = () => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className={classNames.layout}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={HEADER_SX}>
                React-Router + Material-UI
              </Typography>
              <Button component={Link} to="/" color="inherit">
                Photos
              </Button>
              <Button component={Link} to="posts" color="inherit">
                Posts
              </Button>
              <Button component={Link} to="comments" color="inherit">
                Comments
              </Button>
              <Button component={Link} to="users" color="inherit">
                Users
              </Button>
            </Toolbar>
          </AppBar>
          <main className={classNames.main}>
            <Container>
              <Outlet />
            </Container>
          </main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
export { RootLayout }
