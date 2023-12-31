export const USER_CONSTANT_VALUES = {
  Name: {
    minLength: 1,
    maxLength: 15,
  },
  AvatarUrl: {
    maxLength: 256,
  },
  Password: {
    minLength: 6,
    maxLength: 12,
  }
} as const;

export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.svg';
