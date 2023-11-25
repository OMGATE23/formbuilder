import { useAuthContext } from "@/hooks/useAuthContext";
import useFirestore from "@/hooks/useFirestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function CreatedForms() {
  const { user } = useAuthContext();
  const [listOfForms, setListOfForms] = useState();
  const { getAllUsersForm } = useFirestore();
  useEffect(() => {
    getAllUsersForm(setListOfForms);
  }, []);
  return (
    <>
        <h1 className="text-5xl my-8 font-bold text-gray-900 text-center">Created Forms</h1>
      <div className="forms-grid">
        {listOfForms &&
          !listOfForms.errorOccured &&
          listOfForms.map(({ id, name, description }) => (
            <div
            
              className="flex flex-col justify-between gap-4 outline outline-1 outline-gray-300 bg- bg-gray-50 rounded-md p-8 m-4 text-lg"
              key={id}
            >
              <div>
                <p><strong>Name : </strong>{name}</p>
                <p className="text-sm text-gray-600">{id}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  className="inline-block bg-gray-100 hover:bg-gray-200 my-2 px-2 py-1  rounded-md  outline-gray-400 shadow-md outline outline-1 transition-all"
                  href={`/form/${id}`}
                >
                  Form
                </Link>
                <Link
                  className="inline-block my-2 bg-gray-100 hover:bg-gray-200 shadow-md px-2 py-1  rounded-md  outline-gray-400 outline outline-1 transition-all"
                  href={`/submissions/${id}`}
                >
                  Submissions
                </Link>
              </div>
            </div>
          ))}
        {listOfForms && listOfForms.errorOccured && (
          <div>Oops! Something went wrong loading your lists</div>
        )}
      </div>
    </>
  );
}

export default CreatedForms;
