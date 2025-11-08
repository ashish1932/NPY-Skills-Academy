require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'contact-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/contact', limiter);

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Validation helper functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
};

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

// Send WhatsApp message
const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
    });
    logger.info('WhatsApp message sent successfully', { messageSid: response.sid });
    return { success: true, sid: response.sid };
  } catch (error) {
    logger.error('WhatsApp message failed', { error: error.message });
    return { success: false, error: error.message };
  }
};

// Send email via SendGrid
const sendEmail = async (to, subject, htmlContent, textContent) => {
  try {
    console.log('📧 SendGrid: Preparing email...');
    console.log('To:', to);
    console.log('From:', process.env.SENDGRID_FROM_EMAIL);
    console.log('Subject:', subject);

    const msg = {
      to,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: 'NPY Skills Academy'
      },
      subject,
      text: textContent,
      html: htmlContent,
    };

    console.log('📧 SendGrid: Sending email...');
    const result = await sgMail.send(msg);
    console.log('✅ SendGrid: Email sent successfully!');
    logger.info('Email sent successfully', { messageId: result[0]?.headers?.['x-message-id'] });
    return { success: true };
  } catch (error) {
    console.error('❌ SendGrid: Email sending failed:', error.message);
    console.error('❌ SendGrid: Full error:', error);
    logger.error('Email sending failed', { error: error.message });
    return { success: false, error: error.message };
  }
};

// Send SMS via Twilio
const sendSMS = async (to, message) => {
  try {
    const response = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    logger.info('SMS sent successfully', { messageSid: response.sid });
    return { success: true, sid: response.sid };
  } catch (error) {
    logger.error('SMS sending failed', { error: error.message });
    return { success: false, error: error.message };
  }
};

// Send Telegram message (optional)
const sendTelegramMessage = async (message) => {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    logger.warn('Telegram credentials not configured');
    return { success: false, error: 'Telegram not configured' };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await response.json();
    if (data.ok) {
      logger.info('Telegram message sent successfully');
      return { success: true };
    } else {
      throw new Error(data.description);
    }
  } catch (error) {
    logger.error('Telegram message failed', { error: error.message });
    return { success: false, error: error.message };
  }
};

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, organization, program, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.',
      });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    // Validate phone if provided
    if (phone && !validatePhone(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number.',
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : '',
      organization: sanitizeInput(organization || ''),
      program: sanitizeInput(program || ''),
      message: sanitizeInput(message),
    };

    // Prepare notification messages
    const emailSubject = `New Contact Form Submission from ${sanitizedData.name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Phone:</strong> ${sanitizedData.phone || 'Not provided'}</p>
          <p><strong>Organization:</strong> ${sanitizedData.organization || 'Not provided'}</p>
          <p><strong>Program of Interest:</strong> ${sanitizedData.program || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
            ${sanitizedData.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This message was sent from the NPY Skills Academy contact form.
        </p>
      </div>
    `;

    const emailText = `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone || 'Not provided'}
Organization: ${sanitizedData.organization || 'Not provided'}
Program of Interest: ${sanitizedData.program || 'Not specified'}

Message:
${sanitizedData.message}

---
This message was sent from the NPY Skills Academy contact form.
    `;

    const whatsappMessage = `🔔 *New Contact Form Submission*

*Name:* ${sanitizedData.name}
*Email:* ${sanitizedData.email}
*Phone:* ${sanitizedData.phone || 'Not provided'}
*Organization:* ${sanitizedData.organization || 'Not provided'}
*Program:* ${sanitizedData.program || 'Not specified'}

*Message:*
${sanitizedData.message}

---
Sent from NPY Skills Academy contact form`;

    const smsMessage = `New contact: ${sanitizedData.name} (${sanitizedData.email}). Message: ${sanitizedData.message.substring(0, 100)}${sanitizedData.message.length > 100 ? '...' : ''}`;

    const telegramMessage = `🔔 <b>New Contact Form Submission</b>

<b>Name:</b> ${sanitizedData.name}
<b>Email:</b> ${sanitizedData.email}
<b>Phone:</b> ${sanitizedData.phone || 'Not provided'}
<b>Organization:</b> ${sanitizedData.organization || 'Not provided'}
<b>Program:</b> ${sanitizedData.program || 'Not specified'}

<b>Message:</b>
${sanitizedData.message}

---
Sent from NPY Skills Academy contact form`;

    // Send email notification (optional - continue even if email fails)
    try {
      console.log('📧 Attempting to send email...');
      console.log('To:', process.env.ADMIN_EMAIL);
      console.log('From:', process.env.SENDGRID_FROM_EMAIL);
      console.log('Subject:', emailSubject);

      const emailResult = await sendEmail(process.env.ADMIN_EMAIL, emailSubject, emailHtml, emailText);
      if (emailResult.success) {
        logger.info('Email notification sent successfully', {
          to: process.env.ADMIN_EMAIL,
          subject: emailSubject
        });
        console.log('✅ Email sent successfully!');
      } else {
        console.error('❌ Email function returned error:', emailResult.error);
        logger.warn('Email notification failed but continuing with form submission', {
          error: emailResult.error
        });
      }
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      console.error('Full error details:', JSON.stringify(emailError, null, 2));
      logger.warn('Email notification failed but continuing with form submission', {
        error: emailError.message,
        stack: emailError.stack,
        code: emailError.code,
        response: emailError.response?.body
      });
      // Don't return error - continue with successful response
    }

    res.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We\'ll respond within 24 hours.',
    });

  } catch (error) {
    logger.error('Unexpected error in contact form submission', { error: error.message, stack: error.stack });
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'NPY Skills Academy Contact API'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;