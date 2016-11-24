import { signOn, reload, signOut, verify, invalid } from './session';
import { resetPassword, resend } from './forgotten';
import { authenticate } from './authenticate';

export default [ signOn, reload, signOut, verify, invalid, resetPassword, resend, authenticate ];