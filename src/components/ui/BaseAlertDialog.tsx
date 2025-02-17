"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React, { useCallback } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";
import { Button } from "./Button";
import { useAppStore } from "@/stores";

const variants = cva("", {
  variants: {},
  defaultVariants: {},
});

interface BaseAlertDialogProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof variants> {
  title?: string;
}

const BaseAlertDialog: React.FC<BaseAlertDialogProps> = ({
  title,
  className,
  children,
}) => {
  const modal = useAppStore(useCallback((s) => s.modal, []));

  return (
    <div className={cn(variants({ className }))}>
      <AlertDialog open={modal.isOpen} onOpenChange={modal.onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {modal.title && <>{modal.title}</>}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div>{modal.content || children}</div>
          </AlertDialogDescription>
          <AlertDialogFooter className="flex">
            {modal.cancelText !== null && (
              <AlertDialogCancel onClick={modal.onClose} className="flex-1">
                {modal.cancelText || "취소"}
              </AlertDialogCancel>
            )}
            <AlertDialogAction onClick={modal.onClose} className="flex-1">
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BaseAlertDialog;
