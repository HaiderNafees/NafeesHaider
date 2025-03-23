import React from 'react';
import { Box, Container, Grid, Paper, Typography, useTheme, alpha, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const floatAnimation = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const Skills = () => {
  const theme = useTheme();

  const skillCategories = [
    {
      title: 'Frontend Technologies',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Modern JavaScript', 'Redux/Context API', 'Frontend Testing'],
    },
    {
      title: 'UI/UX Development',
      skills: ['Responsive Design', 'Material-UI', 'Tailwind CSS', 'CSS-in-JS', 'Animation Libraries', 'Design Systems'],
    },
    {
      title: 'Modern Web Development',
      skills: ['Performance Optimization', 'Web Accessibility', 'SEO Best Practices', 'Progressive Web Apps', 'Version Control', 'CI/CD'],
    },
    {
      title: 'Additional Skills',
      skills: ['WordPress Development', 'RESTful APIs', 'Node.js Basics', 'Headless CMS', 'Cross-browser Testing', 'Web Analytics'],
    },
  ];

  return (
    <Box
      id="skills"
      sx={{
        py: 10,
        position: 'relative',
        background: theme.palette.background.default
      }}>
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
              fontWeight: 600,
              textAlign: 'center',
              color: theme.palette.text.primary,
              fontFamily: '"-apple-system", "SF Pro Display", sans-serif',
              letterSpacing: '-0.5px'
            }}>
            Skills & Expertise
          </Typography>

          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 0 } }}>
            {skillCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: 3,
                      height: '100%',
                      background: alpha(theme.palette.background.paper, 0.5),
                      backdropFilter: 'blur(20px)',
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        background: alpha(theme.palette.background.paper, 0.7),
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textAlign: 'center',
                        mb: 4
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Grid container spacing={2}>
                      {category.skills.map((skill, skillIndex) => (
                        <Grid item xs={6} key={skillIndex}>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Box
                              sx={{
                                py: 1,
                                px: 2,
                                textAlign: 'center',
                                background: alpha(theme.palette.primary.main, 0.05),
                                borderRadius: 2,
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': {
                                  background: alpha(theme.palette.primary.main, 0.1),
                                },
                              }}
                            >
                              <Typography 
                                variant="body2"
                                sx={{
                                  fontWeight: 500,
                                  color: theme.palette.text.primary,
                                  fontFamily: '"-apple-system", "SF Pro Display", sans-serif',
                                  letterSpacing: '-0.2px'
                                }}
                              >
                                {skill}
                              </Typography>
                            </Box>
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 600,
                textAlign: 'center',
                color: theme.palette.text.primary,
                fontFamily: '"-apple-system", "SF Pro Display", sans-serif',
                letterSpacing: '-0.5px'
              }}
            >
              Certifications
            </Typography>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Box
                    component="a"
                    href="https://www.freecodecamp.org/certification/haidernafees07/responsive-web-design"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'block',
                      p: 3,
                      mb: 2,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      color: theme.palette.text.primary,
                      background: alpha(theme.palette.background.paper, 0.5),
                      backdropFilter: 'blur(20px)',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        background: alpha(theme.palette.background.paper, 0.7),
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Responsive Web Design
                    </Typography>
                    <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                      freeCodeCamp Certification
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills;