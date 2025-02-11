"use client";

import { reducerUIState, UIState } from "@/reducers";
import { create, StateCreator } from "zustand";

interface AppStore {
  wheelNav: UIState;
}

const initalizer: StateCreator<AppStore> = (set) => {
  return {
    wheelNav: reducerUIState(set, "wheelNav", false),
  };
};

export const useAppStore = create<AppStore>()(initalizer);
