export function isValidEmail(email: string): boolean {
  const v = email.trim();
  if (!v) return false;
  // HTML spec 수준에 가까운 정규식
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function isValidPhoneNum(phone: string): boolean {
  const v = phone.trim();
  return /^010\d{8}$/.test(v);
}
