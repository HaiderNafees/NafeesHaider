import { Box, Container, Grid, Paper, Typography, useTheme, alpha } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Testimonials = () => {
  const theme = useTheme();
  const scrollRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: [-20, 0],
      opacity: 1,
      transition: { duration: 0.8 }
    });
  }, [controls]);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',

      quote: 'Working with Nafees was an absolute pleasure. His attention to detail and technical expertise helped us deliver a fantastic product that exceeded our expectations.',
    },
    {
      name: 'Michael Chen',
      role: 'CEO of StartupX',

      quote: 'Nafees brought both technical excellence and creative innovation to our project. His ability to understand our vision and translate it into reality was impressive.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director at CreativeHub',

      quote: 'The level of professionalism and technical skill that Nafees brings to his work is outstanding. He consistently delivered high-quality solutions that aligned perfectly with our design requirements.',
    },
  ];

  return (
    <Box
      id="testimonials"
      sx={{
        py: 12,
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="xl">
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
            Client Testimonials
          </Typography>

          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                  },
                  gap: 4,
                  width: '100%',
                  mx: 'auto',
                  px: { xs: 2, md: 0 }
                }}
              >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      minHeight: '300px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.1)}`,
                        background: alpha(theme.palette.background.paper, 0.9),
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 4,
                        fontStyle: 'italic',
                        color: theme.palette.text.secondary,
                        lineHeight: 1.8,
                        position: 'relative',
                        '&::before': {
                          content: '"\u201C"',
                          position: 'absolute',
                          left: -15,
                          top: -20,
                          fontSize: '3em',
                          color: alpha(theme.palette.primary.main, 0.2),
                          fontFamily: 'Georgia, serif'
                        }
                      }}
                    >
                      {testimonial.quote}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;