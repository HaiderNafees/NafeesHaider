import { Box, Container, Grid, Typography, Button, useTheme, alpha } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ScrollReveal, TextLineReveal, Parallax } from './ScrollReveal';

/**
 * HERO — cinematic entrance (plays once on load).
 * Layered depth: ambient gradient orbs drift on parallax behind
 * the portrait card; every text block staggers in on the
 * signature easing curve.
 */
const Hero = () => {
  const theme = useTheme();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      id="hero"
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden', /* orbs bleed to the edges — clip them */
        pt: { xs: 10, md: 6 },
        pb: { xs: 10, md: 4 },
      }}
    >
      {/* ---- Ambient parallax orbs (background depth) ---- */}
      <Parallax
        speed={0.12}
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '-8%',
          width: 420,
          height: 420,
        }}
      >
        <Box
          className="sr-orb sr-orb--float"
          sx={{ inset: 0, background: alpha(theme.palette.primary.main, 0.55) }}
        />
      </Parallax>
      <Parallax
        speed={-0.08}
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '-15%',
          right: '-6%',
          width: 360,
          height: 360,
        }}
      >
        <Box
          className="sr-orb sr-orb--float"
          sx={{
            inset: 0,
            background: alpha(theme.palette.secondary.main || '#5ac8fa', 0.5),
            animationDelay: '-4.5s',
          }}
        />
      </Parallax>

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          {/* ---- Left: staggered text reveal ---- */}
          <Grid item xs={12} md={6}>
            {/* Eyebrow label */}
            <Typography
              className="sr-hero-rise"
              variant="overline"
              sx={{
                color: theme.palette.primary.main,
                letterSpacing: 3,
                mb: 2,
                display: 'block',
                fontWeight: 600,
                '--sr-delay': '0.1s',
              }}
            >
              FRONTEND DEVELOPER
            </Typography>

            {/* Name — masked line-by-line slide-up */}
            <TextLineReveal
              component="h1"
              text={['Nafees', 'Haider']}
              sx={{
                fontWeight: 800,
                fontSize: { xs: '3.2rem', sm: '4rem', md: '4.4rem' },
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            />

            {/* Tagline */}
            <ScrollReveal variant="fade-up" delay={0.45}>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.text.secondary, mb: 3, fontWeight: 500 }}
              >
                Frontend Engineer &nbsp;•&nbsp; React Specialist &nbsp;•&nbsp; Digital
                Solutions
              </Typography>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal variant="fade-up" delay={0.6}>
              <Typography variant="body1" sx={{ mb: 4, maxWidth: 560, lineHeight: 1.8 }}>
                A passionate Frontend Developer specializing in modern, responsive web
                applications with React, Next.js, and TypeScript — delivering exceptional
                user experiences with a focus on performance and scalability.
              </Typography>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal variant="fade-up" delay={0.75}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => scrollTo('projects')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    },
                  }}
                >
                  View My Work
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => scrollTo('contact')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                    '&:hover': { transform: 'translateY(-3px)' },
                  }}
                >
                  Get in Touch
                </Button>
                <Button
                  href="https://github.com/HaiderNafees"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  startIcon={<GitHubIcon />}
                  sx={{
                    color: theme.palette.text.primary,
                    transition: 'color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': { color: theme.palette.primary.main, transform: 'translateY(-3px)' },
                  }}
                >
                  GitHub
                </Button>
              </Box>
            </ScrollReveal>
          </Grid>

          {/* ---- Right: portrait card, zooms in with depth ---- */}
          <Grid item xs={12} md={6}>
            <Parallax speed={0.15}>
              <ScrollReveal
                variant="zoom-in"
                delay={0.35}
                sx={{
                  position: 'relative',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: `0 30px 60px ${alpha(theme.palette.common.black, 0.25)}`,
                }}
              >
                <Box
                  component="img"
                  src="https://iili.io/3IdikFt.png"
                  alt="Nafees Haider"
                  sx={{
                    width: '100%',
                    height: { xs: 320, md: 440 },
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'contrast(1.05) brightness(1.05)',
                  }}
                />
                {/* Glossy top edge for the premium feel */}
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, ${alpha(
                      theme.palette.primary.main,
                      0.12
                    )} 0%, transparent 40%, ${alpha(theme.palette.common.black, 0.25)} 100%)`,
                    pointerEvents: 'none',
                  }}
                />
              </ScrollReveal>
            </Parallax>
          </Grid>
        </Grid>
      </Container>

      {/* ---- Scroll hint ---- */}
      <ScrollReveal
        variant="fade"
        delay={1.4}
        sx={{
          position: 'absolute',
          bottom: 24,
          left: 0,
          right: 0,
          mx: 'auto', /* centered without transform — no clash with reveal CSS */
          width: 'fit-content',
          color: theme.palette.text.secondary,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          flexDirection: 'column',
          gap: 0.5,
          '@keyframes sr-hint': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(8px)' },
          },
          '& svg': { animation: 'sr-hint 2.2s ease-in-out infinite' },
        }}
      >
        <ArrowDownwardIcon fontSize="small" />
      </ScrollReveal>
    </Box>
  );
};

export default Hero;
