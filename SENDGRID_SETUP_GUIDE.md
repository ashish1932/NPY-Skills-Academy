# SendGrid Email Configuration Guide

This guide will help you set up SendGrid for email notifications in your NPY Skills Academy contact form.

## Step 1: Create a SendGrid Account

1. Go to [https://sendgrid.com/](https://sendgrid.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address
4. Complete the account setup process

## Step 2: Generate an API Key

1. In the SendGrid Dashboard, go to **Settings** > **API Keys**
2. Click **Create API Key**
3. Give it a name like "NPY Skills Academy Contact Form"
4. Select **Full Access** for the API key permissions
5. Click **Create & View**
6. **Copy the API key immediately** (you won't be able to see it again!)

## Step 3: Verify Your Sender Email

1. In SendGrid Dashboard, go to **Settings** > **Sender Authentication**
2. Click **Verify a Single Sender**
3. Fill in your details:
   - **From Email**: Your email address (e.g., contact@npyskillsacademy.com)
   - **From Name**: NPY Skills Academy
   - **Reply To**: Same as From Email
4. Click **Create**
5. Check your email and click the verification link

## Step 4: Update Your Backend Environment Variables

1. Open `academy-website/backend/.env`
2. Update the SendGrid configuration:

```env
# SendGrid Configuration (for Email)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=your-verified-email@example.com

# Admin Contact Information
ADMIN_EMAIL=your-admin-email@example.com
```

## Step 5: Test the Email Integration

### Test with curl:
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello from SendGrid!"}'
```

### Check SendGrid Activity Feed:
1. Go to SendGrid Dashboard → Activity Feed
2. You should see the test email in the feed

## Email Message Format

The system sends professional HTML emails with this format:

**Subject:** New Contact Form Submission from [Name]

**Content:**
```
New Contact Form Submission

Name: John Doe
Email: john@example.com
Phone: +1234567890
Organization: ABC Company
Program of Interest: Corporate Training

Message:
I am interested in your training programs. Please contact me for more details.

---
This message was sent from the NPY Skills Academy contact form.
```

## SendGrid Pricing

- **Free Tier**: 100 emails per day
- **Paid Plans**: Start at $14.95/month for 50,000 emails
- **Additional emails**: $0.0003 per email beyond free tier

## Troubleshooting

### Common Issues:

1. **"API key does not start with 'SG.'" error**:
   - Make sure you're using the full API key that starts with "SG."
   - Check for any extra spaces or characters

2. **Emails going to spam**:
   - Ensure your sender email is verified
   - Add SPF/DKIM records to your domain (advanced)
   - Use a reputable domain for the sender email

3. **"Unauthorized" error**:
   - Verify your API key is correct
   - Check that the API key has the right permissions
   - Ensure your SendGrid account is active

4. **Rate limiting**:
   - Free tier: 100 emails/day
   - Check your usage in the SendGrid Dashboard

## Security Notes

- Never commit your API key to version control
- Use environment variables for all sensitive data
- Monitor your SendGrid usage and costs
- Set up billing alerts if using paid plans

## Next Steps

After configuring SendGrid:
1. Test the integration thoroughly
2. Uncomment the email notification code in `server.js`
3. Monitor the SendGrid Activity Feed for delivery status
4. Set up additional features like email templates if needed

For additional help, check the SendGrid documentation or contact their support.