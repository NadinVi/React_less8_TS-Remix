import { Box, Typography } from '@mui/material'

import type { FooterProps } from './types'

const Footer = ({ title = '2023 - Vinokhodova Nadiia' }: FooterProps) => {
  return (
    <Box component="footer" width="100%" bgcolor="primary.main" color="white" textAlign="center" p={2}>
      <Typography variant="body1">{title}</Typography>
    </Box>
  )
}

export { Footer }
