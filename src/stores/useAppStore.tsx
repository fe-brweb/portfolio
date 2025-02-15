"use client";

import { reducerUIState, UIState } from "@/reducers";
import { reducerModalState, ModalState } from "@/reducers/modal-state.reducer";
import { create, StateCreator } from "zustand";

interface AppStore {
  wheelNav: UIState;
  modal: ModalState;
}

const initalizer: StateCreator<AppStore> = (set) => {
  return {
    wheelNav: reducerUIState(set, "wheelNav", false),
    modal: reducerModalState(set, "modal", false),
  };
};

export const useAppStore = create<AppStore>()(initalizer);
