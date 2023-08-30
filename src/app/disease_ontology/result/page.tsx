"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";

const DiseaseResult = () => {
  const searchParams = useSearchParams();
  const [final_np, setfinal_np] = useState<string[][]>([]);
  const [genes, setgenes] = useState([]);
  const [n, setn] = useState([]);
  const [nump, setnump] = useState([]);
  const doseInput = searchParams.get("doseInput");
  const csrfToken = getCookie("csrftoken");

  useEffect(() => {
    if (doseInput && csrfToken) {
      const postData = new URLSearchParams();
      postData.append("doseInput", doseInput);
      const getData = async () => {
        const res = await fetch(
          "http://localhost:8000/RememProt/dose_ontology/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-CSRFToken": csrfToken,
            },
            body: postData.toString(),
            credentials: "include",
          }
        );
        const responseData = await res.json();
        setfinal_np(responseData.final_np);
        setgenes(responseData.genes);
        setn(responseData.n);
        setnump(responseData.nump);
      };
      getData();
    }
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-gray-200 text-black">
              <tr className="text-center">
                <th className="py-3 border border-white" scope="col"></th>
                {n &&
                  n.map((item, index) => (
                    <th className="py-3 px-2 border border-white" scope="col" key={index}>
                      {item}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {final_np &&
                final_np.map((rowData, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="bg-white border border-gray dark:bg-gray-800 dark:border-gray-700"
                  >
                    {rowData.map(
                      (
                        cellData: string | number | boolean,
                        cellIndex: number
                      ) => (
                        <td
                          key={cellIndex}
                          className={`px-1 py-1 border border-red-100 ${
                            cellIndex === 0
                              ? "font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              : ""
                          } ${
                            cellData === 1
                              ? "bg-blue-300" // Apply your desired highlight color here
                              : ""
                          }`}
                        >
                          {cellData === 1 || cellData === 0 ? "" : cellData}
                        </td>
                      )
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiseaseResult;



