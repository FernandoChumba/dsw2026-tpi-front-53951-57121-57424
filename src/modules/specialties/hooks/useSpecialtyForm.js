import { createSpecialty } from '../services/createSpecialty';

export default function useSpecialtyForm() {
  return { save: createSpecialty };
}
