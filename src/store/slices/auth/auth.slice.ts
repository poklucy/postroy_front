import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { ApiError } from '@/api/apiError';
import { mockRequest } from '@/api/mock';
import { STATUS_MESSAGES, getInlineErrorMessage } from '@/config/statusMessages';
import { createApiThunk, getRejectedError } from '@/store/createApiThunk';
import { AuthState } from '@/types/auth.types';
import { Order } from '@/types/order.types';
import { UserProfile } from '@/types/user.types';
import { normalizePhone } from '@/utils/phone';
import { userStorage } from '@/utils/userStorage';

const loadInitialState = (): AuthState => {
  const session = userStorage.getSession();
  const user = session ? userStorage.getUser(session.phone) : null;

  return {
    phone: user ? user.profile.phone : null,
    isAuthenticated: Boolean(user),
    profile: user ? user.profile : null,
    orders: user ? user.orders : [],
    isLoading: false,
    error: null,
  };
};

export const sendSmsCode = createApiThunk(
  'auth/sendSms',
  (rawPhone: string) => mockRequest('auth', 1000, () => {
    const phone = normalizePhone(rawPhone);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    userStorage.saveSmsCode(phone, code);

    return { phone, code };
  })
);

export const verifySmsCode = createApiThunk(
  'auth/verifySms',
  ({ phone: rawPhone, code }: { phone: string; code: string }) => mockRequest('auth', 800, () => {
    const phone = normalizePhone(rawPhone);
    const saved = userStorage.getSmsCode();

    if (!saved || saved.phone !== phone || saved.code !== code) {
      throw new ApiError('validation', STATUS_MESSAGES.auth.invalidCode, 422);
    }

    userStorage.clearSmsCode();
    const user = userStorage.getUser(phone) ?? userStorage.createUser(phone);
    userStorage.saveSession({ phone, token: `fake_token_${Date.now()}` });

    return user;
  })
);

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSmsState: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.phone = null;
      state.isAuthenticated = false;
      state.profile = null;
      state.orders = [];
    },
    updateProfile: (state, action: PayloadAction<Partial<Omit<UserProfile, 'phone' | 'number'>>>) => {
      if (state.profile) {
        Object.assign(state.profile, action.payload);
      }
    },
    addAddress: {
      reducer: (state, action: PayloadAction<{ id: string; value: string }>) => {
        state.profile?.addresses.push(action.payload);
      },
      prepare: (value: string) => ({ payload: { id: nanoid(), value: value.trim() } }),
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.addresses = state.profile.addresses.filter(a => a.id !== action.payload);
      }
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      const order = action.payload;
      state.orders.unshift(order);
      if (state.profile) {
        state.profile.bonusPoints += order.bonusEarned - order.bonusSpent;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendSmsCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendSmsCode.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendSmsCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = getInlineErrorMessage(getRejectedError(action), STATUS_MESSAGES.auth.sendCodeError);
      })

      .addCase(verifySmsCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifySmsCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.phone = action.payload.profile.phone;
        state.profile = action.payload.profile;
        state.orders = action.payload.orders;
      })
      .addCase(verifySmsCode.rejected, (state, action) => {
        state.isLoading = false;
        const error = getRejectedError(action);
        state.error = error.kind === 'validation'
          ? STATUS_MESSAGES.auth.invalidCode
          : getInlineErrorMessage(error, STATUS_MESSAGES.auth.verifyError);
      });
  },
});

export const {
  clearError,
  resetSmsState,
  logout,
  updateProfile,
  addAddress,
  removeAddress,
  addOrder,
} = authSlice.actions;

export default authSlice.reducer;
