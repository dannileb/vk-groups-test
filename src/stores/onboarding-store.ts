import { create } from "zustand";
import { setOnboarded } from "../utils/onboarding";

type State = {
  onboarded: boolean;
  onboardingSteps: number;
  currentStep: number;
};

type Action = {
  setOnboarded: (onboarded: boolean) => void;
  startOnboarding: () => void;
  nextStep: () => void;
};

export const useOnboardingStore = create<State & Action>((set) => ({
  onboarded: false,
  onboardingSteps: 6,
  currentStep: 0,
  setOnboarded: (onboarded) => {
    set(() => ({ onboarded: onboarded }));
  },
  startOnboarding: () => {
    set(() => ({ currentStep: 1 }));
  },
  nextStep: () => {
    set((store) => {
      if (store.currentStep !== store.onboardingSteps)
        return { currentStep: store.currentStep + 1 };
      else {
        setOnboarded();
        return { onboarded: true };
      }
    });
  },
}));
