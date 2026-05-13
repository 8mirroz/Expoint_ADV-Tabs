import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  context: string;
  source: string;
  openModal: (params?: { context?: string; source?: string }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  context: '',
  source: '',
  openModal: (params) => set({ 
    isOpen: true, 
    context: params?.context || '',
    source: params?.source || 'website'
  }),
  closeModal: () => set({ isOpen: false, context: '', source: '' }),
}));
