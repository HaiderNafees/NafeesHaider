import { Box, Container, Grid, Paper, Typography, useTheme, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const Projects = () => {
  const theme = useTheme();

  const projects = [
    {
      title: 'Sweet Delights Cupcakes',
      description: 'A visually appealing and user-friendly website for a cupcake business, featuring modern design and responsive layout. Enhanced user experience across devices with engaging visuals and intuitive navigation.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
      github: 'https://github.com/haidernafees/sweetdelight-cupcakes-theme',
      live: 'https://haidernafees.github.io/sweetdelight-cupcakes-theme/',
      image: 'https://iili.io/3I2dc3G.png',
    },
    {
      title: 'Neko Coin - Crypto\'s Cutest Cat!',
      description: 'Created an engaging and responsive website for Neko Cat Coin, a unique cryptocurrency project. The site features a sleek design, user-focused interface, and detailed sections outlining the project\'s vision and functionalities.',
      technologies: ['React', 'Material-UI', 'Responsive Design', 'Web3', 'Cryptocurrency'],
      github: 'https://github.com/haidernafees/nekocatcoin',
      live: 'https://haidernafees.github.io/nekocatcoin/',
      image: 'https://iili.io/3I22OiX.png',
    },
    {
      title: 'MoonCoin - To The Moon!',
      description: 'Developed a professional and responsive website for Mooncoin, a cryptocurrency initiative aimed at innovation and growth in the blockchain space. The site features a clean design, informative sections, and an intuitive user experience to effectively communicate the project\'s objectives.',
      technologies: ['React', 'Material-UI', 'Responsive Design', 'Web3', 'Cryptocurrency'],
      github: 'https://github.com/haidernafees/mooncoin',
      live: 'https://haidernafees.github.io/mooncoin/',
      image: 'https://iili.io/3I2qiFt.png',
    },
  ];

  return (
    <Box
      id="projects"
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
            Featured Projects
          </Typography>

          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    component={motion.div}
                    whileHover={{ y: -8 }}
                    sx={{
                      height: '100%',
                      overflow: 'hidden',
                      borderRadius: 2,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                  >
                    <Box
                      component="img"
                      src={project.image}
                      alt={project.title}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                      }}
                    />
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                        {project.description}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {project.technologies.map((tech, techIndex) => (
                          <Typography
                            key={techIndex}
                            component="span"
                            sx={{
                              mr: 1,
                              mb: 1,
                              display: 'inline-block',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              fontSize: '0.75rem',
                              background: `${theme.palette.primary.main}10`,
                              color: theme.palette.primary.main,
                              border: `1px solid ${theme.palette.primary.main}30`,
                            }}
                          >
                            {tech}
                          </Typography>
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': { color: theme.palette.primary.main },
                          }}
                        >
                          <GitHubIcon />
                        </IconButton>
                        <IconButton
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': { color: theme.palette.primary.main },
                          }}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Box>
                    </Box>
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

export default Projects;