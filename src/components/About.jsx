import { Box, Container, Grid, Paper, Typography, useTheme, alpha } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const theme = useTheme();

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Freelance Web Developer',
      period: '2021 - Present',
      description: 'Assisted in developing and maintaining responsive websites using HTML5, CSS3, JavaScript, and jQuery for clients in various industries, including e-commerce and corporate sectors.',
    },
    {
      title: 'Frontend Web Developer',
      company: 'MaltaThemes',
      period: 'Jun 2022 - Apr 2023',
      description: 'Developed and maintained modern web applications with focus on performance and user experience. Collaborated with team members to implement responsive designs and optimize frontend functionality.',
    },
  ];

  const timelineStyles = {
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: { xs: 20, md: '50%' },
      transform: { xs: 'none', md: 'translateX(-50%)' },
      width: '2px',
      height: '100%',
      background: `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.primary.main, 0.4)})`,
      zIndex: 0,
    }
  };

  return (
    <Box
      id="about"
      sx={{
        py: 12,
        background: theme.palette.background.default,
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              mb: 6,
              fontWeight: 700,
              textAlign: 'center',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Me
          </Typography>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://iili.io/3IdLevn.png"
                alt="Profile Picture"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                My Journey
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                As a Frontend Developer with a passion for creating exceptional web experiences,
                I specialize in building modern, responsive, and performant web applications.
                My expertise spans across various frontend technologies and frameworks, enabling
                me to deliver scalable solutions that meet business objectives.
              </Typography>
              <Typography variant="body1">
                I focus on creating clean, efficient, and maintainable code while ensuring
                optimal performance and user experience. My commitment to staying current with
                industry best practices and emerging technologies allows me to deliver
                innovative solutions that drive digital success.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
            Experience
          </Typography>
          <Grid container spacing={4}>
            {experiences.map((experience, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 4,
                      height: '100%',
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease-in-out',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                        background: alpha(theme.palette.background.paper, 0.9),
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
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 1,
                        fontWeight: 600,
                        opacity: 0.9,
                      }}
                    >
                      {experience.company}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                        fontSize: '0.9rem',
                        opacity: 0.8,
                      }}
                    >
                      {experience.period}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        lineHeight: 1.8,
                        opacity: 0.9,
                      }}
                    >
                      {experience.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;