import { Box, Container, Grid, Paper, Typography, useTheme, alpha } from '@mui/material';
import { ScrollReveal, SectionHeading } from './ScrollReveal';

/**
 * SKILLS — category cards scale up + sharpen with a stagger,
 * then each skill chip cascades in behind its card.
 * Certification (freeCodeCamp RWD) revealed last.
 */
const Skills = () => {
  const theme = useTheme();

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Redux', 'REST APIs'],
    },
    {
      title: 'Styling & UI',
      skills: ['Tailwind CSS', 'Material-UI', 'Responsive Design', 'CSS-in-JS', 'Design Systems', 'Figma'],
    },
    {
      title: 'Backend & CMS',
      skills: ['Node.js', 'WordPress', 'Headless CMS', 'Web Analytics', 'CI/CD', 'Git'],
    },
    {
      title: 'Quality & Testing',
      skills: ['Performance Optimization', 'Web Accessibility', 'SEO Best Practices', 'PWAs', 'Cross-browser Testing', 'Frontend Testing'],
    },
  ];

  return (
    <Box id="skills" sx={{ py: { xs: 8, md: 10 }, background: theme.palette.background.default }}>
      <Container>
        <SectionHeading text="Skills & Expertise" />

        <Grid container spacing={4}>
          {skillCategories.map((category, index) => (
            <Grid item xs={12} sm={6} md={3} key={category.title}>
              <ScrollReveal variant="scale-up" delay={index * 0.12}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    background: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(20px)',
                    borderRadius: 2,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    transition: 'background 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      background: alpha(theme.palette.background.paper, 0.75),
                      transform: 'translateY(-6px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3,
                    }}
                  >
                    {category.title}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {category.skills.map((skill, skillIndex) => (
                      <ScrollReveal
                        key={skill}
                        variant="fade-up"
                        delay={0.15 + skillIndex * 0.06}
                        sx={{ display: 'inline-flex' }}
                      >
                        <Box
                          sx={{
                            py: 0.75,
                            px: 1.5,
                            textAlign: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            background: alpha(theme.palette.primary.main, 0.06),
                            borderRadius: 1.5,
                            transition: 'background 0.2s ease, transform 0.2s ease',
                            '&:hover': {
                              background: alpha(theme.palette.primary.main, 0.14),
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          {skill}
                        </Box>
                      </ScrollReveal>
                    ))}
                  </Box>
                </Paper>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        {/* ---- Certification ---- */}
        <Box sx={{ mt: 10 }}>
          <SectionHeading text="Certifications" />
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <ScrollReveal variant="scale-up" delay={0.1}>
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
                    textDecoration: 'none',
                    color: theme.palette.text.primary,
                    background: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(20px)',
                    transition:
                      'border-color 0.3s ease, background 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      background: alpha(theme.palette.background.paper, 0.75),
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Responsive Web Design
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                    freeCodeCamp Certification
                  </Typography>
                </Box>
              </ScrollReveal>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;