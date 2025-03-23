import { Box, Container, Grid, Paper, Typography, TextField, Button, IconButton, useTheme, alpha, Snackbar, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com/HaiderNafees' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/nafeeshaider07/' },
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
        _autoresponse_message: `Dear ${formData.name},\n\nThank you for reaching out! I have received your message and will respond as soon as possible.\n\nBest regards,\nNafees Haider`
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
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      id="contact"
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
            Get in Touch
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: 4,
                  background: theme.palette.background.paper,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
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
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                        },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 4,
                  height: '100%',
                  background: theme.palette.background.paper,
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Connect with Me
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  I'm always open to new opportunities and collaborations. Feel free to
                  reach out through any of these platforms:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: theme.palette.text.secondary,
                          '&:hover': {
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                  Inspirational Quote
                </Typography>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.primary.light, 0.05)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      mb: 2,
                      color: theme.palette.text.primary,
                      lineHeight: 1.8
                    }}
                  >
                    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 500
                    }}
                  >
                    - Steve Jobs
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
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
      </Container>
    </Box>
  );
};

export default Contact;