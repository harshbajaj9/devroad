import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
// import {ExclamationTriangleIcon} from "@radix-ui/react-icons"

interface FormErrorProps {
  message?: string;
}
const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="items flex gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <FaExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
