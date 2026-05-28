import { verifyMSG91Token } from "@/services/api/auth";

import {
  createSession,
  getCurrentSession,
} from "@/services/api/session";

import { setAuthData } from "@/lib/auth-storage";

type VerifiedData = {
  message: string;
};

export type ExistingSessionResult = {
  type: "existing_session";

  session: {
    id: string;

    current_stage: string;
  };
};

export type NewSessionResult = {
  type: "new_session";

  session: {
    id: string;
  };
};

export type PostLoginFlowResult =
  | ExistingSessionResult
  | NewSessionResult;

const handleExistingSession = (
  session: {
    id: string;

    current_stage: string;
  },
): ExistingSessionResult => {
  return {
    type: "existing_session",

    session,
  };
};

const handleNewSession = (
  session: {
    id: string;
  },
): NewSessionResult => {
  return {
    type: "new_session",

    session,
  };
};

const handleSessionFlow = async (): Promise<PostLoginFlowResult> => {
  try {
    const existingSession = await getCurrentSession();

    console.log(
      "EXISTING SESSION",
      existingSession,
    );

    if (
      existingSession.current_stage &&
      existingSession.current_stage !== "complete"
    ) {
      return handleExistingSession(existingSession);
    }

    const newSession = await createSession();

    console.log(
      "NEW SESSION CREATED",
      newSession,
    );

    return handleNewSession(newSession);
  } catch {
    const newSession = await createSession();

    console.log(
      "NEW SESSION CREATED",
      newSession,
    );

    return handleNewSession(newSession);
  }
};

export const runPostLoginFlow = async (
  verifiedData: VerifiedData,
): Promise<PostLoginFlowResult> => {
  console.log("MSG91 VERIFIED", verifiedData);

  const authResponse = await verifyMSG91Token({
    access_token: verifiedData.message,
  });

  console.log("BACKEND AUTH SUCCESS");

  setAuthData(authResponse);

  return handleSessionFlow();
};