import { Box, Container, Grid, Paper, Typography, useTheme, alpha, Button, Chip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import { ScrollReveal, SectionHeading } from './ScrollReveal';

/**
 * PROJECTS — the signature card effect: cards start scaled down
 * and blurred, then animate to full sharp size on entry
 * (variant="scale-up"), staggered left-to-right.
 */
const Projects = () => {
  const theme = useTheme();

  /* Full pinned/recent repo list from github.com/HaiderNafees */
  const projects = [
    {
      title: 'HSK App',
      description:
        'HSK language-learning platform with structured vocabulary and quiz practice across HSK levels, built to make Chinese proficiency study engaging and trackable.',
      technologies: ['TypeScript', 'React', 'Language Learning'],
      github: 'https://github.com/HaiderNafees/hskapp',
      live: '',
      image: 'https://iili.io/3I22OiX.png',
    },
    {
      title: 'ElysianThreads',
      description:
        'Fashion & lifestyle platform with a modern storefront experience — product browsing, curated collections and a polished, responsive UI built with TypeScript.',
      technologies: ['TypeScript', 'React', 'E-commerce'],
      github: 'https://github.com/HaiderNafees/ElysianThreads',
      live: '',
      image: 'https://iili.io/3I2dc3G.png',
    },
    {
      title: 'Neko Cat Coin',
      description:
        "Web3 landing experience for Neko Cat Coin — crypto's cutest cat. Sleek token showcase with tokenomics, roadmap and community sections in a responsive MUI layout.",
      technologies: ['React', 'Material-UI', 'Web3'],
      github: 'https://github.com/HaiderNafees/nekocatcoin',
      live: 'https://haidernafees.github.io/nekocatcoin/',
      image: 'https://iili.io/3I22OiX.png',
    },
    {
      title: 'MoonCoin',
      description:
        'Cryptocurrency project site for Mooncoin with a clean, informative presentation of the project vision, features and roadmap — professional Web3 presence in React + MUI.',
      technologies: ['React', 'Material-UI', 'Web3'],
      github: 'https://github.com/HaiderNafees/mooncoin',
      live: 'https://haidernafees.github.io/mooncoin/',
      image: 'https://iili.io/3I2qiFt.png',
    },
    {
      title: 'Sweet Delights Cupcakes',
      description:
        'Business website for a cupcake shop — visually appealing, responsive layout with engaging visuals and intuitive navigation, enhancing UX across devices.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      github: 'https://github.com/HaiderNafees/sweetdelight-cupcakes-theme',
      live: 'https://haidernafees.github.io/sweetdelight-cupcakes-theme/',
      image: 'https://iili.io/3I2dc3G.png',
    },
  ];

  /* Recent learning tools — lighter treatment in a secondary row */
  const learningTools = [
    {
      title: 'University Test',
      description: 'Test-prep practice tool built for university coursework revision.',
      github: 'https://github.com/HaiderNafees/universitytest',
    },
    {
      title: 'HTML Quiz',
      description: 'Interactive quiz app for practicing core HTML concepts.',
      github: 'https://github.com/HaiderNafees/htmlquiz',
    },
    {
      title: 'C Practice',
      description: 'Hands-on C programming exercises and practice problems.',
      github: 'https://github.com/HaiderNafees/c-',
    },
  ];

  return (
    <Box id="projects" sx={{ py: { xs: 8, md: 12 }, background: theme.palette.background.default }}>
      <Container>
        <SectionHeading text="Featured Projects" />

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} lg={4} key={project.title}>
              <ScrollReveal
                variant="scale-up"
                delay={(index % 3) * 0.12}
                sx={{ height: '100%' }}
              >
                <Paper
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 2.5,
                    background: alpha(theme.palette.background.paper, 0.65),
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                    transition:
                      'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: alpha(theme.palette.primary.main, 0.35),
                      boxShadow: `0 24px 48px ${alpha(theme.palette.common.black, 0.18)}`,
                    },
                  }}
                >
                  {/* Thumbnail */}
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                    <Box
                      component="img"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        '.MuiPaper-root:hover &': { transform: 'scale(1.06)' },
                      }}
                    />
                    {/* Chip label pinned on the image */}
                    <Chip
                      size="small"
                      label={project.technologies[0]}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontWeight: 600,
                        backgroundColor: alpha(theme.palette.background.paper, 0.85),
                        backdropFilter: 'blur(8px)',
                      }}
                    />
                  </Box>

                  {/* Body */}
                  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ mb: 2.5, color: theme.palette.text.secondary, lineHeight: 1.7, flexGrow: 1 }}
                    >
                      {project.description}
                    </Typography>

                    {/* Tech badges */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2.5 }}>
                      {project.technologies.map((tech) => (
                        <Typography
                          key={tech}
                          component="span"
                          sx={{
                            px: 1.25,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            background: alpha(theme.palette.primary.main, 0.08),
                            color: theme.palette.primary.main,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          }}
                        >
                          {tech}
                        </Typography>
                      ))}
                    </Box>

                    {/* Links */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <Button
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        startIcon={<GitHubIcon />}
                        sx={{
                          color: theme.palette.text.primary,
                          '&:hover': { color: theme.palette.primary.main },
                        }}
                      >
                        Code
                      </Button>
                      {project.live && (
                        <Button
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          startIcon={<LaunchIcon />}
                          sx={{
                            color: theme.palette.text.primary,
                            '&:hover': { color: theme.palette.primary.main },
                          }}
                        >
                          Live
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>

        {/* ---- Learning tools (secondary row) ---- */}
        <Box sx={{ mt: 10 }}>
          <SectionHeading text="Learning Tools" accent={false} sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' } }} />
          <Grid container spacing={3}>
            {learningTools.map((tool, index) => (
              <Grid item xs={12} sm={4} key={tool.title}>
                <ScrollReveal variant="fade-up" delay={index * 0.12} sx={{ height: '100%' }}>
                  <Paper
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      borderRadius: 2,
                      background: alpha(theme.palette.background.paper, 0.5),
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                      transition:
                        'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        borderColor: alpha(theme.palette.primary.main, 0.35),
                      },
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {tool.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, flexGrow: 1 }}>
                      {tool.description}
                    </Typography>
                    <Button
                      href={tool.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      startIcon={<GitHubIcon />}
                      sx={{
                        alignSelf: 'flex-start',
                        color: theme.palette.text.primary,
                        '&:hover': { color: theme.palette.primary.main },
                      }}
                    >
                      Code
                    </Button>
                  </Paper>
                </ScrollReveal>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
