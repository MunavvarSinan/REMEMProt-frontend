"use client";
import { BubbleChart } from "@/components/Chart";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import sampleData from '@/constants/sample.json';
import React, { useEffect, useState } from "react";

const RemprotResult = () => {
  const searchQuery = useSearchParams();
  const [data, setData] = useState([]);
  // const [data, setData] = useState<ResultItem[] | undefined>();
  const analysisInput = searchQuery.get("analysisInput");
  const csrfToken = getCookie("csrftoken");
  useEffect(() => {
    if (analysisInput) {
      const postData = new URLSearchParams();
      postData.append("analysisInput", analysisInput);
      const getData = async () => {
        if (csrfToken) {
          const res = await fetch(
            "http://localhost:8000/RememProt/enrichment/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": csrfToken, // Set the CSRF token here
              },
              body: postData.toString(), // Use the formatted form data
              credentials: "include",
              // setData(res.json())
            }
          );
          const responseData = await res.json();
          setData(responseData.enrichment_result);
          console.log(responseData);
        }
      };
      getData();
    }
  }, [analysisInput]);

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 mb-4">
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="px-2 py-1 text-xs text-black bg-blue-100 border border-gray-300"
                  rowSpan={2}
                >
                  Diseases
                </th>
                {sampleData.Disease.map(disease => (
                  <th
                    key={disease.id}
                    scope="col"
                    className="px-3 py-3 text-xs text-black bg-blue-100"
                    colSpan={1}
                  >
                    {disease.heading}
                  </th>
                ))}
              </tr>
              <tr>
                {sampleData.Disease.map(disease => (
                  <td
                    key={disease.id}
                    scope="col"
                    className="text-xs px-1 py-1 text-black border border-gray-200"
                  >
                    {disease.disease}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Small Table 1 */}
        <div className="flex w-11/12">
          <div >
          <table className="text-sm text-left text-gray-500">
            <tbody>
            <tr>
                <th
                  scope="row"
                  className="px-3 py-1 text-xs text-black bg-blue-100 border border-gray-300"
                  rowSpan={2}
                >
                  Membrane protein enrichment methods
                </th>
                {sampleData.MPEM.map(data => (
                  <th
                    key={data.id}
                    scope="col"
                    className="px-3 py-3 text-xs text-black bg-blue-100"
                    colSpan={1}
                  >
                    {data.heading}
                  </th>
                ))}
              </tr>
              <tr>
                {sampleData.MPEM.map(data => (
                  <td
                    key={data.id}
                    scope="col"
                    className="text-xs px-1 py-1 text-black border border-gray-200"
                  >
                    {data.name}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        </div>

        <div className="flex justify-center space-x-8 mt-4">
        {/* Small Table 2 */}

        <div className="relative overflow-x-auto w-1/3">
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
            <tr>
                <th
                  scope="row"
                  className="px-10 py-1 text-xs text-black bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                  Organism
                </th>
                </tr>
                {sampleData.organism.map(data => (
                  <tr
                    key={data.id}
                    scope="col"
                    className="text-xs px-1 py-1 text-black border border-gray-200"
                  >
                    <th>
                    {data.heading}
                    </th>
                    <td>
                    {data.name}
                    </td>
                  </tr>
                  
                ))}
            </tbody>
          </table>
        </div>

        {/* Small Table 3 */}
        <div className="relative overflow-x-auto w-1/3">
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
            <tr>
                <th
                  scope="row"
                  className="px-10 py-1 text-xs text-black bg-blue-100 border border-gray-300"
                  colSpan={2}
                >
                  Analysis
                </th>
                </tr>
                {sampleData.analysis.map(data => (
                  <tr
                    key={data.id}
                    scope="col"
                    className="text-xs px-1 py-1 text-black border border-gray-200"
                  >
                    <th>
                    {data.heading}
                    </th>
                    <td>
                    {data.name}
                    </td>
                  </tr>
                  
                ))}            
                </tbody>
          </table>
        </div>
        </div>
        

        {/* Second Table */}
        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-black bg-gray-300">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3"
                  colSpan={5} // Adjust this colspan value according to the number of columns in your data
                >
                  Disease / Organism / Cell Line / Tissue Name / Member
                  Enrichment Method / Profiling or Differential / Context of
                  Identification
                </th>
                <th scope="col" className="px-3 py-3">
                  Percentage
                </th>
                <th scope="col" className="px-3 py-3">
                  Count
                </th>
                <th scope="col" className="px-10 py-3">
                  p_value
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4" colSpan={5}>
                      {item.enrichment}
                    </td>
                    <td className="px-6 py-4">{item.percentage}</td>
                    <td className="px-6 py-4">{item.count}</td>
                    <td className="px-6 py-4">{item.p_value}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
  );
};

export default RemprotResult;
