"use client";
import Header from "@/components/header/Header";
import UserHeader from "@/components/header/UserHeader";
import SubmissionDisplay from "@/components/submission-components/SubmissionDisplay";
import { useAuthContext } from "@/hooks/useAuthContext";
import useFirestore from "@/hooks/useFirestore";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const Submission = ({ params }) => {
  const { user } = useAuthContext();
  const [submissions, setSubmissions] = useState();
  const [isValidUser, setIsValidUser] = useState();
  console.log(isValidUser)
  const { getAllSubmissions, checkCreatorOfForm } = useFirestore();
  useEffect(() => {
    getAllSubmissions(params.formId, setSubmissions);
  }, []);
  useEffect(() => {
    checkCreatorOfForm(params.formId, setIsValidUser);
  }, [user]);
  return (
    <div className="min-w-[100%]">
      {user && (
        <>
          <>
            <UserHeader />
            {submissions && (
              <>
                {isValidUser && (
                  <>
                    {isValidUser.valid ? (
                      <SubmissionDisplay submissions={submissions} name = {isValidUser.name} />
                    ) : (
                      <p>
                        Form does not exist or you are not the creator of the
                        form
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </>
        </>
      )}
      {!user && (
        <>
          <Header />
          <p>Cant find user</p>
        </>
      )}
    </div>
  );
};

export default Submission;
