type ClassNameInput = string | number | boolean | null | undefined;

export function cn(...inputs: ClassNameInput[]) {
  return inputs.filter(Boolean).join(' ');
}
