# Twilio Configuration Guide for WhatsApp Integration

This guide will help you set up Twilio for WhatsApp messaging in your NPY Skills Academy contact form.

## Step 1: Create a Twilio Account

1. Go to [https://www.twilio.com/](https://www.twilio.com/)
2. Click "Sign up" and create a free account
3. Verify your email address
4. Complete the account setup process

## Step 2: Verify Your Phone Number

1. In the Twilio Console, go to **Phone Numbers** > **Manage** > **Verified Caller IDs**
2. Click **Add a new Caller ID**
3. Enter your personal phone number and verify it via SMS
4. This number will be used for SMS notifications (optional)

## Step 3: Enable WhatsApp in Twilio Console

1. In the Twilio Console, navigate to **Messaging** > **Settings** > **WhatsApp**
2. Click **Get Started** with WhatsApp
3. You'll be taken to the WhatsApp setup page

## Step 4: Set Up WhatsApp Sandbox (For Testing)

### Option A: WhatsApp Sandbox (Free for Testing)
1. On the WhatsApp setup page, click **Try it out** under "Sandbox"
2. Twilio will provide you with a WhatsApp number and join code
3. Send the join code to the provided WhatsApp number to enable the sandbox
4. Note down the **WhatsApp Number** provided by Twilio (starts with whatsapp:+14155238886 or similar)

### Option B: Production WhatsApp (Requires Business Verification)
1. For production use, you'll need to apply for WhatsApp Business API
2. This requires business verification and may take time
3. Contact Twilio sales for production WhatsApp numbers

## Step 5: Get Your Twilio Credentials

1. In the Twilio Console, go to the **Dashboard**
2. Copy your **Account SID** (starts with AC...)
3. Copy your **Auth Token** (starts with SK...)
4. For WhatsApp, use the number from Step 4

## Step 6: Update Your Backend Environment Variables

1. Open `academy-website/backend/.env`
2. Update the following variables:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=+14155238886  # From WhatsApp setup
TWILIO_PHONE_NUMBER=+1234567890      # Your verified phone number (optional)
```

## Step 7: Test the WhatsApp Integration

### For Sandbox Testing:
1. Start your backend server: `cd academy-website/backend && npm run dev`
2. Test the contact form or use curl:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello from Twilio!"}'
```

3. Check your WhatsApp for the test message

### For Production:
1. Ensure you have a production WhatsApp number
2. Update the `TWILIO_WHATSAPP_NUMBER` in `.env`
3. Test with real data

## Step 8: Enable Production Features (Optional)

### SMS Integration:
1. Set `ENABLE_SMS=true` in `.env`
2. Ensure `TWILIO_PHONE_NUMBER` is set to your verified number
3. SMS will be sent to `ADMIN_PHONE_NUMBER`

### Admin Contact Setup:
```env
ADMIN_EMAIL=your-admin@email.com
ADMIN_WHATSAPP_NUMBER=+1234567890  # Where WhatsApp messages are sent
ADMIN_PHONE_NUMBER=+1234567890     # Where SMS messages are sent (optional)
```

## Troubleshooting

### Common Issues:

1. **"Invalid WhatsApp number" error**:
   - Make sure you're using the correct WhatsApp number from Twilio
   - For sandbox, it should be `whatsapp:+14155238886` or similar

2. **Messages not being delivered**:
   - Check that you've joined the WhatsApp sandbox
   - Verify your Twilio credentials
   - Check the Twilio Console logs for errors

3. **Rate limiting**:
   - Twilio has rate limits; check your usage in the Console
   - The backend also has rate limiting (5 requests per 15 minutes)

4. **Sandbox limitations**:
   - Sandbox only works with your verified number initially
   - You can add more test numbers in the WhatsApp sandbox settings

## WhatsApp Message Format

The system sends formatted messages like this:

```
🔔 *New Contact Form Submission*

*Name:* John Doe
*Email:* john@example.com
*Phone:* +1234567890
*Organization:* ABC Company
*Program:* Corporate Training

*Message:*
I am interested in your training programs...

---
Sent from NPY Skills Academy contact form
```

## Cost Information

- **Twilio Free Tier**: $0 for first 1,000 messages
- **WhatsApp Sandbox**: Free for testing
- **Production WhatsApp**: Contact Twilio for pricing
- **SMS**: $0.0075 per message (US numbers)

## Security Notes

- Never commit your `.env` file to version control
- Use environment-specific credentials
- Monitor your Twilio usage in the Console
- Set up billing alerts to avoid unexpected charges

## Next Steps

After configuring Twilio:
1. Test the integration thoroughly
2. Uncomment the real notification code in `server.js`
3. Deploy to production with proper environment variables
4. Monitor logs and Twilio Console for any issues

For additional help, check the Twilio documentation or contact their support.