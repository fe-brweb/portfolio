import { StoreApi } from "zustand";

interface ModalProps {
  title?: React.ReactNode | null;
  content?: React.ReactNode | null;
}

export interface ModalState {
  isOpen: boolean;
  title?: React.ReactNode | null;
  content?: React.ReactNode | null;
  onOpen: (props: ModalProps) => void;
  onClose: () => void;
}

const dispatch = (
  setter: StoreApi<Record<string, any>>["setState"],
  name: string,
  value: boolean,
  props?: ModalProps,
) => {
  setter((state) => ({
    [name]: {
      ...state[name],
      isOpen: value,
      title: props?.title,
      content: props?.content,
    },
  }));
};

export const reducerModalState = <T extends {}>(
  setter: StoreApi<T>["setState"],
  name: keyof T,
  value: boolean,
  onCloseCallback?: () => void,
  onOpenCallback?: () => void,
): ModalState => {
  return {
    isOpen: value,
    onOpen: (props) => {
      dispatch(setter, name as string, true, props);
      onOpenCallback && onOpenCallback();
    },
    onClose: () => {
      dispatch(setter, name as string, false);
      onCloseCallback && onCloseCallback();
    },
  };
};
