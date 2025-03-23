import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const Hero = () => {
  const theme = useTheme();

  return (
    <Box
      id="hero"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.background.default,
        pt: { xs: 12, md: 8 },
        pb: { xs: 8, md: 0 },
      }}
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.primary.main,
                  letterSpacing: 2,
                  mb: 2,
                  display: 'block',
                }}
              >
                FRONTEND DEVELOPER
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Nafees Haider
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.text.secondary, mb: 4 }}
              >
                Frontend Engineer | Web Developer | Digital Solutions
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
                A passionate Frontend Developer specializing in creating modern, responsive web applications using React, Next.js, and cutting-edge frontend technologies. Experienced in delivering exceptional user experiences with a focus on performance and scalability.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              style={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}22, ${theme.palette.primary.light}22)`,
                borderRadius: '20px',
                overflow: 'hidden',
                height: '400px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="https://iili.io/3IdikFt.png"
                alt="Nafees Haider"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  p: 4,
                  filter: 'contrast(1.1) brightness(1.1)'
                }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;