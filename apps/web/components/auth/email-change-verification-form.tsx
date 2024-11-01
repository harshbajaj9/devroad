"use client";
import React from "react";
import CardWrapper from "./card-wrapper";
// import { HashLoader } from "react-spinners";
const EmailChangeVerificationForm = ({ message }: { message: string }) => {
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {/* <HashLoader /> */}
        {message && (
          <div>
            <p>{message}</p>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default EmailChangeVerificationForm;
