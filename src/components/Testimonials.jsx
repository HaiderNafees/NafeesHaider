import { Box, Container, Paper, Typography, useTheme, alpha } from '@mui/material';
import { ScrollReveal, SectionHeading } from './ScrollReveal';

/**
 * TESTIMONIALS — cards scale up + sharpen with a left-to-right
 * stagger, mirroring the Projects card treatment.
 */
const Testimonials = () => {
  const theme = useTheme();

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      quote:
        'Working with Nafees was an absolute pleasure. His attention to detail and technical expertise helped us deliver a fantastic product that exceeded our expectations.',
    },
    {
      name: 'Michael Chen',
      role: 'CEO of StartupX',
      quote:
        'Nafees brought both technical excellence and creative innovation to our project. His ability to understand our vision and translate it into reality was impressive.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Design Director at CreativeHub',
      quote:
        'The level of professionalism and technical skill that Nafees brings to his work is outstanding. He consistently delivered high-quality solutions that aligned perfectly with our design requirements.',
    },
  ];

  return (
    <Box id="testimonials" sx={{ py: { xs: 8, md: 12 }, background: theme.palette.background.default }}>
      <Container>
        <SectionHeading text="Client Testimonials" />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} variant="scale-up" delay={index * 0.12} sx={{ height: '100%' }}>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  minHeight: 260,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'center',
                  gap: 3,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 2.5,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                  transition:
                    'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.12)}`,
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                    position: 'relative',
                    '&::before': {
                      content: '"\\u201C"',
                      position: 'absolute',
                      left: -15,
                      top: -20,
                      fontSize: '3em',
                      color: alpha(theme.palette.primary.main, 0.2),
                      fontFamily: 'Georgia, serif',
                    },
                  }}
                >
                  {testimonial.quote}
                </Typography>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {testimonial.role}
                  </Typography>
                </Box>
              </Paper>
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
