import { authenticate } from './authenticate';
import { signOn, reload, signOut, verify, invalid } from './session';
import { resetPassword, resend } from './forgotten';

export default [ authenticate, signOn, reload, signOut, verify, invalid, resetPassword, resend ];