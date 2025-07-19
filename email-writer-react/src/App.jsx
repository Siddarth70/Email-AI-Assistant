import { useState } from 'react';
import './App.css';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
      );
    } catch (error) {
      setError('Failed to generate reply. Please try again');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="hero-section">
        <h1 className="hero-title">Effortless Email Replies</h1>
        <p className="hero-subtitle">
          Generate thoughtful, context-aware responses in seconds.
        </p>
      </header>

      <main className="content-section">
        <Container maxWidth="xl" className="glass-card">
          <Box className="two-column-layout">
            <Box className="column">
              <Typography variant="h6" className="label">
                Original Email
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={14}
                variant="outlined"
                placeholder="Paste or write your email..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />

              <FormControl fullWidth variant="outlined" sx={{ mt: 3 }}>
                <InputLabel>Tone</InputLabel>
                <Select
                  value={tone}
                  label="Tone"
                  onChange={(e) => setTone(e.target.value)}
                >
                  <MenuItem value="">Default</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                className="cta-button"
                onClick={handleSubmit}
                disabled={!emailContent || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
              </Button>

              {error && (
                <Typography className="error-text" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
            </Box>

            <Box className="column">
              <Typography variant="h6" className="label">
                Generated Reply
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={18}
                variant="outlined"
                value={generatedReply}
                placeholder="The reply will appear here..."
                inputProps={{ readOnly: true }}
              />
              {generatedReply && (
                <Button
                  variant="outlined"
                  className="copy-button"
                  onClick={() => navigator.clipboard.writeText(generatedReply)}
                >
                  Copy to Clipboard
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default App;