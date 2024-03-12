import { create } from "zustand";
import { setOnboarded } from "../utils/onboarding";

type State = {
  modalId: string;
  onboarded: boolean;
  onboardingSteps: number;
  currentStep: number;
};

type Action = {
  setModalId: (modalId: string) => void;
  setOnboarded: (onboarded: boolean) => void;
  startOnboarding: () => void;
  nextStep: () => void;
};

export const useOnboardingStore = create<State & Action>((set) => ({
  modalId: "",
  onboarded: false,
  onboardingSteps: 7,
  currentStep: 0,
  setModalId: (modalId) => set(() => ({ modalId: modalId })),
  setOnboarded: (onboarded) => {
    set(() => ({ onboarded: onboarded }));
  },
  startOnboarding: () => {
    set(() => ({ currentStep: 1 }));
  },
  nextStep: () => {
    set((store) => {
      console.log(store.currentStep);
      if (store.currentStep !== store.onboardingSteps)
        return { currentStep: store.currentStep + 1 };
      else {
        setOnboarded();
        return { modalId: "", onboarded: true, currentStep: 0 };
      }
    });
  },
}));
