interface Window {
  initSendOTP: (config: unknown) => void;

  sendOtp: (
    identifier: string,
    success?: (data: unknown) => void,
    failure?: (error: unknown) => void
  ) => void;

  verifyOtp: (
    otp: string,
    success?: (data: unknown) => void,
    failure?: (error: unknown) => void
  ) => void;

  retryOtp: (
    channel: string | null,
    success?: (data: unknown) => void,
    failure?: (error: unknown) => void
  ) => void;
}