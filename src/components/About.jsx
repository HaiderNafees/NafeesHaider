import { Box, Container, Grid, Paper, Typography, useTheme, alpha } from '@mui/material';
import { ScrollReveal, SectionHeading, Parallax } from './ScrollReveal';

/**
 * ABOUT — heading masks in, profile zooms in on a parallax layer,
 * bio paragraphs stagger, experience cards scale up + sharpen.
 * Bio content preserved from the previous version.
 */
const About = () => {
  const theme = useTheme();

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Freelance Web Developer',
      period: '2021 - Present',
      description:
        'Assisted in developing and maintaining responsive websites using HTML5, CSS3, JavaScript, and jQuery for clients in various industries, including e-commerce and corporate sectors.',
    },
    {
      title: 'Frontend Web Developer',
      company: 'MaltaThemes',
      period: 'Jun 2022 - Apr 2023',
      description:
        'Developed and maintained modern web applications with focus on performance and user experience. Collaborated with team members to implement responsive designs and optimize frontend functionality.',
    },
  ];

  return (
    <Box id="about" sx={{ py: { xs: 8, md: 12 }, background: theme.palette.background.default }}>
      <Container>
        <SectionHeading text="About Me" />

        {/* ---- Intro: image + bio ---- */}
        <Grid container spacing={6} sx={{ mb: 10 }}>
          <Grid item xs={12} md={5}>
            <Parallax speed={0.08}>
              <ScrollReveal
                variant="zoom-in"
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: `0 24px 48px ${alpha(theme.palette.common.black, 0.15)}`,
                }}
              >
                <Box
                  component="img"
                  src="https://iili.io/3IdLevn.png"
                  alt="Nafees Haider"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </ScrollReveal>
            </Parallax>
          </Grid>

          <Grid item xs={12} md={7}>
            <ScrollReveal variant="fade-up" delay={0.1}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                My Journey
              </Typography>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.2}>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.9, color: theme.palette.text.secondary }}>
                As a Frontend Developer with a passion for creating exceptional web experiences,
                I specialize in building modern, responsive, and performant web applications.
                My expertise spans across various frontend technologies and frameworks, enabling
                me to deliver scalable solutions that meet business objectives.
              </Typography>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.32}>
              <Typography variant="body1" sx={{ lineHeight: 1.9, color: theme.palette.text.secondary }}>
                I focus on creating clean, efficient, and maintainable code while ensuring
                optimal performance and user experience. My commitment to staying current with
                industry best practices and emerging technologies allows me to deliver
                innovative solutions that drive digital success.
              </Typography>
            </ScrollReveal>
          </Grid>
        </Grid>

        {/* ---- Experience cards ---- */}
        <ScrollReveal variant="fade-up">
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
            Experience
          </Typography>
        </ScrollReveal>
        <Grid container spacing={4}>
          {experiences.map((experience, index) => (
            <Grid item xs={12} sm={6} key={experience.title}>
              <ScrollReveal variant="scale-up" delay={index * 0.12}>
                <Paper
                  sx={{
                    p: 4,
                    height: '100%',
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(20px)',
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition:
                      'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, background 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.12)}`,
                      background: alpha(theme.palette.background.paper, 0.95),
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {experience.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.primary.main, mb: 1, fontWeight: 600, opacity: 0.9 }}
                  >
                    {experience.company}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: theme.palette.text.secondary, mb: 3, fontSize: '0.9rem', opacity: 0.8 }}
                  >
                    {experience.period}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: theme.palette.text.primary, lineHeight: 1.8, opacity: 0.9 }}
                  >
                    {experience.description}
                  </Typography>
                </Paper>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
