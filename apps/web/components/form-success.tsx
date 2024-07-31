import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
// import {ExclamationTriangleIcon} from "@radix-ui/react-icons"

interface FormSuccessProps {
  message?: string;
}
const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="items flex gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <FaExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
