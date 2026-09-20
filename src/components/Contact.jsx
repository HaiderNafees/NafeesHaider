import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  alpha,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { ScrollReveal, SectionHeading } from './ScrollReveal';

/**
 * CONTACT — form logic is untouched (still posts to the existing
 * Formspree endpoint). Adds a GitHub + Vercel deployment note
 * and staggered reveals throughout.
 */
const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/HaiderNafees', label: 'GitHub' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/nafeeshaider07/', label: 'LinkedIn' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const recipientEmail = 'haidernafees161@gmail.com';
      const emailData = {
        ...formData,
        _replyto: formData.email,
        _subject: `Portfolio Contact from ${formData.name}`,
        _to: recipientEmail,
        _cc: recipientEmail,
        email: formData.email,
        name: formData.name,
        message: formData.message,
        recipient: recipientEmail,
        to: recipientEmail,
        _template: 'table',
        _autoresponse: true,
        _next: 'https://nafeeshaider.com/thank-you',
        _captcha: 'false',
        _honeypot: '',
        _format: 'plain',
        _confirmation: 'Thank you for your message! I will get back to you soon.',
        _autoresponse_subject: 'Thank you for contacting me',
        _autoresponse_message: `Dear ${formData.name},\n\nThank you for reaching out! I have received your message and will respond as soon as possible.\n\nBest regards,\nNafees Haider`,
      };

      if (!formData.email || !formData.name || !formData.message) {
        setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('https://formspree.io/f/mgvaklqo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSnackbar({ open: true, message: 'Failed to send message. Please try again.', severity: 'error' });
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box id="contact" sx={{ py: { xs: 8, md: 12 }, background: theme.palette.background.default }}>
      <Container>
        <SectionHeading text="Get in Touch" />

        <Grid container spacing={4}>
          {/* ---- Form ---- */}
          <Grid item xs={12} md={6}>
            <ScrollReveal variant="fade-up" sx={{ height: '100%' }}>
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: 4,
                  height: '100%',
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 2.5,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Send a Message
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={isSubmitting}
                      startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 10px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </ScrollReveal>
          </Grid>

          {/* ---- Info panel ---- */}
          <Grid item xs={12} md={6}>
            <ScrollReveal variant="fade-up" delay={0.15} sx={{ height: '100%' }}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                  background: alpha(theme.palette.background.paper, 0.7),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 2.5,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Connect with Me
                </Typography>

                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  {socialLinks.map((social) => (
                    <IconButton
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      sx={{
                        color: theme.palette.text.primary,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        transition:
                          'color 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          borderColor: theme.palette.primary.main,
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Box>

                {/* ---- Deployment note (GitHub → Vercel) ---- */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.07)}, ${alpha(
                      theme.palette.primary.light,
                      0.07
                    )})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <RocketLaunchIcon fontSize="small" sx={{ color: theme.palette.primary.main }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Deployment
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.8 }}>
                    This portfolio is built with Vite + React and deployed on{' '}
                    <Typography
                      component="a"
                      href="https://nafeeshaider.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                    >
                      Vercel
                    </Typography>
                    . Source code is open on{' '}
                    <Typography
                      component="a"
                      href="https://github.com/HaiderNafees/NafeesHaider"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                    >
                      GitHub
                    </Typography>{' '}
                    — every push to <code>main</code> triggers an automatic deployment.
                  </Typography>
                </Box>

                {/* ---- Quote ---- */}
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(
                      theme.palette.primary.light,
                      0.05
                    )})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    mt: 'auto',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      mb: 2,
                      color: theme.palette.text.primary,
                      lineHeight: 1.8,
                    }}
                  >
                    "The only way to do great work is to love what you do. If you haven't found it yet,
                    keep looking. Don't settle."
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.primary.main, fontWeight: 500 }}>
                    - Steve Jobs
                  </Typography>
                </Box>
              </Paper>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
