import { create } from 'zustand';

interface OnboardingStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useOnboardingModal = create<OnboardingStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useOnboardingModal;