// import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import { Resend } from "resend";
export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  const resend = new Resend('re_TPtg4vdt_Fgyn3JpKncdxQUySN8fYzBT3');

  try {
    await resend.emails.send({
      from: 'anmolawasthi022@gmail.com',
      to: email,
      subject: 'Mystery Message Verification Code',
      react: VerificationEmail({ username, otp: verifyCode }),
      
    });
    console.log("email chali gyi")
    console.log(email)
    console.log(verifyCode)
    return { success: true, message: 'Verification email sent successfully.', };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
