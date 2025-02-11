import { StoreApi } from "zustand";

export interface UIState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const dispatch = (
  setter: StoreApi<Record<string, any>>["setState"],
  name: string,
  value: boolean,
) => {
  setter((state) => ({
    [name]: {
      ...state[name],
      isOpen: value,
    },
  }));
};

export const reducerUIState = <T extends {}>(
  setter: StoreApi<T>["setState"],
  name: keyof T,
  value: boolean,
  onCloseCallback?: () => void,
  onOpenCallback?: () => void,
): UIState => {
  return {
    isOpen: value,
    onOpen: () => {
      dispatch(setter, name as string, true);
      onOpenCallback && onOpenCallback();
    },
    onClose: () => {
      dispatch(setter, name as string, false);
      onCloseCallback && onCloseCallback();
    },
  };
};
