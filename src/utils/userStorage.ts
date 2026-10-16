import { Order } from '@/types/order.types';
import { UserProfile } from '@/types/user.types';

const SESSION_KEY = 'postroy_session';
const USERS_KEY = 'postroy_users';
const SMS_CODE_KEY = 'postroy_sms_code';

export interface StoredUser {
  profile: UserProfile;
  orders: Order[];
}

interface Session {
  phone: string;
  token: string;
}

const read = <T>(storage: Storage, key: string, fallback: T): T => {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (storage: Storage, key: string, value: unknown) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable or full — data stays in memory for this session */
  }
};

const readUsers = () => read<Record<string, StoredUser>>(localStorage, USERS_KEY, {});

export const userStorage = {
  getSession: () => read<Session | null>(localStorage, SESSION_KEY, null),

  saveSession: (session: Session) => write(localStorage, SESSION_KEY, session),

  clearSession: () => localStorage.removeItem(SESSION_KEY),

  getUser: (phone: string): StoredUser | null => readUsers()[phone] ?? null,

  saveUser: (user: StoredUser) => {
    const users = readUsers();
    users[user.profile.phone] = user;
    write(localStorage, USERS_KEY, users);
  },

  createUser: (phone: string): StoredUser => {
    const user: StoredUser = {
      profile: {
        number: Object.keys(readUsers()).length + 1,
        phone,
        firstName: '',
        lastName: '',
        email: '',
        addresses: [],
        bonusPoints: 0,
        discountPercent: 0,
      },
      orders: [],
    };
    userStorage.saveUser(user);
    return user;
  },

  saveSmsCode: (phone: string, code: string) => write(sessionStorage, SMS_CODE_KEY, { phone, code }),

  getSmsCode: () => read<{ phone: string; code: string } | null>(sessionStorage, SMS_CODE_KEY, null),

  clearSmsCode: () => sessionStorage.removeItem(SMS_CODE_KEY),
};
