# NPY Skills Academy Website

A modern, responsive React application for NPY Skills Academy with integrated contact form featuring multi-channel notifications.

## Features

- **Modern React Application**: Built with React 18, Framer Motion animations, and responsive design
- **Contact Form with Multi-Channel Notifications**:
  - WhatsApp integration via Twilio
  - Email notifications via SendGrid
  - Optional SMS notifications via Twilio
  - Optional Telegram bot notifications
- **Security Features**:
  - Rate limiting (5 requests per 15 minutes per IP)
  - Input validation and sanitization
  - Helmet security headers
  - CORS protection
- **Comprehensive Logging**: Winston-based logging with file and console outputs
- **Production Ready**: Error handling, health checks, and graceful failure handling

## Project Structure

```
academy-website/
├── backend/                 # Node.js/Express backend
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── public/                 # Static assets
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   └── assets/            # Frontend assets
└── package.json           # Frontend dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Accounts with:
  - Twilio (for WhatsApp/SMS)
  - SendGrid (for email)
  - Telegram Bot (optional)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd academy-website/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Configure your `.env` file with your API keys and settings:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000

   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_WHATSAPP_NUMBER=your_twilio_whatsapp_number
   TWILIO_PHONE_NUMBER=your_twilio_phone_number

   # SendGrid Configuration
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com

   # Telegram Configuration (Optional)
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHAT_ID=your_telegram_chat_id

   # Admin Contact Information
   ADMIN_EMAIL=admin@yourdomain.com
   ADMIN_WHATSAPP_NUMBER=+1234567890
   ADMIN_PHONE_NUMBER=+1234567890

   # Feature Flags
   ENABLE_SMS=false
   ENABLE_TELEGRAM=false
   ```

5. Start the backend server:
   ```bash
   npm run dev  # For development with auto-restart
   # or
   npm start    # For production
   ```

### Frontend Setup

1. Navigate to the root directory:
   ```bash
   cd academy-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## API Endpoints

### POST /api/contact
Submits a contact form and sends notifications via configured channels.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "organization": "Company Name",
  "program": "corporate",
  "message": "Message content"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully."
}
```

### GET /api/health
Health check endpoint.

## Notification Channels

The system supports multiple notification channels that can be enabled/disabled via environment variables:

1. **Email (SendGrid)**: Always enabled if configured
2. **WhatsApp (Twilio)**: Enabled if `ADMIN_WHATSAPP_NUMBER` is set
3. **SMS (Twilio)**: Enabled if `ENABLE_SMS=true` and `ADMIN_PHONE_NUMBER` is set
4. **Telegram**: Enabled if `ENABLE_TELEGRAM=true` and bot credentials are provided

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP address
- **Input Validation**: Comprehensive client and server-side validation
- **Input Sanitization**: XSS protection through input cleaning
- **CORS Protection**: Configured to only allow requests from specified frontend URL
- **Security Headers**: Helmet.js provides security headers
- **Error Handling**: Graceful error handling without exposing sensitive information

## Development

### Running Tests
```bash
cd backend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd ..
npm run build
```

## Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in your environment
2. Ensure all required environment variables are set
3. Use a process manager like PM2 for production

### Frontend Deployment
1. Build the React app: `npm run build`
2. Serve the `build` folder using any static server
3. Update `FRONTEND_URL` in backend environment to match your domain

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` matches your frontend domain
2. **Twilio Errors**: Verify account credentials and phone numbers are correctly configured
3. **SendGrid Errors**: Check API key and sender email verification
4. **Rate Limiting**: If hitting rate limits, increase limits or implement user authentication

### Logs
Check the following log files in the backend directory:
- `error.log`: Error messages
- `combined.log`: All log messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License

## Support

For support, please contact NPY Skills Academy directly through the contact form or email."# NPY-Skills-Academy"  
