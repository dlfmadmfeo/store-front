import type { SignupRequest, SignupResponse } from "@/lib/types/signup";

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function submitSignup(payload: SignupRequest): Promise<SignupResponse> {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<SignupResponse>(response);
}
