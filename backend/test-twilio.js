require('dotenv').config();
const twilio = require('twilio');

// Check if we have dummy credentials
const isDummyCredentials = process.env.TWILIO_ACCOUNT_SID === 'dummy_sid' ||
                          process.env.TWILIO_AUTH_TOKEN === 'dummy_token';

if (isDummyCredentials) {
  console.log('⚠️  Dummy Twilio credentials detected!\n');
  console.log('📋 To test with real credentials:');
  console.log('1. Sign up at https://www.twilio.com/');
  console.log('2. Get your Account SID and Auth Token from the Console');
  console.log('3. Update the .env file with real credentials');
  console.log('4. Run this test again\n');
  console.log('📖 See TWILIO_SETUP_GUIDE.md for detailed instructions\n');
  process.exit(0);
}

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Test script to verify Twilio WhatsApp configuration
 * Run with: node test-twilio.js
 */

async function testTwilioConnection() {
  console.log('🔍 Testing Twilio Connection...\n');

  try {
    // Test basic connection
    const account = await client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
    console.log('✅ Twilio Account Connected');
    console.log(`📱 Account SID: ${account.sid}`);
    console.log(`📊 Account Status: ${account.status}\n`);

    // Test WhatsApp number
    if (process.env.TWILIO_WHATSAPP_NUMBER) {
      console.log('📲 Testing WhatsApp Configuration...');
      console.log(`📞 WhatsApp Number: ${process.env.TWILIO_WHATSAPP_NUMBER}`);

      // Try to send a test message (commented out to avoid actual sending)
      /*
      const message = await client.messages.create({
        body: '🧪 Test message from NPY Skills Academy contact form setup',
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${process.env.ADMIN_WHATSAPP_NUMBER || '+1234567890'}`
      });

      console.log('✅ Test WhatsApp message sent!');
      console.log(`📨 Message SID: ${message.sid}`);
      */
    }

    // Test SMS number (if configured)
    if (process.env.TWILIO_PHONE_NUMBER && process.env.ENABLE_SMS === 'true') {
      console.log('📱 Testing SMS Configuration...');
      console.log(`📞 SMS Number: ${process.env.TWILIO_PHONE_NUMBER}`);

      // Try to send a test SMS (commented out to avoid actual sending)
      /*
      const sms = await client.messages.create({
        body: 'Test SMS from NPY Skills Academy',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE_NUMBER || '+1234567890'
      });

      console.log('✅ Test SMS sent!');
      console.log(`📨 SMS SID: ${sms.sid}`);
      */
    }

    console.log('\n🎉 Twilio configuration test completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Uncomment the message sending code in this file to test actual sending');
    console.log('2. Update your .env file with real credentials');
    console.log('3. Uncomment the notification code in server.js');
    console.log('4. Test the contact form integration');

  } catch (error) {
    console.error('❌ Twilio Test Failed:');
    console.error(`Error: ${error.message}`);

    if (error.code) {
      console.error(`Error Code: ${error.code}`);
    }

    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN');
    console.log('2. Verify your WhatsApp number is correct');
    console.log('3. Ensure your phone numbers are verified in Twilio Console');
    console.log('4. Check your Twilio account balance');
    console.log('5. Review the TWILIO_SETUP_GUIDE.md for detailed instructions');
  }
}

// Run the test
testTwilioConnection();