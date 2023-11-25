'use client';

import QuestionContextProvider from "@/context/QuestionContext";
import AuthContextProvider from "@/context/AuthContext";
import SubmissionContextProvider from "@/context/SubmissionContext";

export function Providers({ children }) {
  return (
    <AuthContextProvider>
        <QuestionContextProvider>
            <SubmissionContextProvider>
              {children}
            </SubmissionContextProvider>
        </QuestionContextProvider>
    </AuthContextProvider>
  );
}