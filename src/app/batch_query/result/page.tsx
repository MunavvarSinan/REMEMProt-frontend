"use client"
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface ResultItem {
  id: string;
  pmid: string;
  author: string;
  paper: string;
  organism: string;
  CellOrtissue: string;
  disease: string;
  profileOrDifex: string;
  contxtOfIdent: string;
  contxtOfDiferentialREG: string;
  test: string;
  control: string;
  foldchange: string;
  expression: string;
  protienExtractMethod: string;
  geneSymbol: string;
  geneID: string;
  isTrans: string;
  tissuetype: string;
  cancertype: string;
  cellname: string;
}

const BqueryResult = () => {
  const searParams = useSearchParams();
  const species = searParams.get('species');
  const bqueryInput = searParams.get('bqueryInput');
  const csrfToken = getCookie('csrftoken');
  const [data, setData] = useState<ResultItem[] | undefined>();



  useEffect(() => {
    const getData = async () => {
      if (species && bqueryInput) {
        const postData = new URLSearchParams();
        postData.append('species', species);
        postData.append('bqueryInput', bqueryInput);

        try {
          if (csrfToken) {
            const response = await fetch('http://localhost:8000/RememProt/bqueryResult/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
              },
              body: postData.toString(),
              credentials: 'include',
            });
            const responseData = await response.json();
            setData(responseData.results);
            console.log({ responseData });
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    getData();
  }, [species, bqueryInput]);

  return (
    <div className="flex justify-center">
  <div className="w-11/12">
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <>
              <thead className="text-xs bg-gray-300 text-black ">
                <tr className="text-center">
                  <th
                    className="py-3 border border-white"
                    rowSpan={2}
                    scope="col"
                  >
                    Gene symbol
                  </th>
                  <th
                    className="py-3 border border-white"
                    rowSpan={2}
                    scope="col"
                  >
                    Transmembrane
                  </th>
                  <th
                    className="py-3 border border-white"
                    rowSpan={2}
                    scope="col"
                  >
                    Profile and/or differential expression
                  </th>
                  <th
                    className="py-3 border border-white"
                    rowSpan={2}
                    scope="col"
                  >
                    Context of identification
                  </th>
                  <th
                    className="py-2 border border-white"
                    colSpan={3}
                    scope="colgroup"
                  >
                    Cell Marker Status
                  </th>
                </tr>
                <tr className="text-center">
                  <th className="py-2 border border-white" scope="col">
                    Tissue type
                  </th>
                  <th className="py-2 border border-white" scope="col">
                    Cancer type
                  </th>
                  <th className="py-2 border border-white" scope="col">
                    Cell name
                  </th>
                </tr>
              </thead>
              {data &&
                data.map((item, index) => (
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.geneSymbol}
                      </th>
                      <td className="px-6 py-4">{item.isTrans}</td>
                      <td className="px-6 py-4">{item.profileOrDifex}</td>
                      <td className="px-6 py-4">{item.contxtOfIdent}</td>
                      
                        <>
                         <td className="px-6 py-4">{item.tissuetype}</td>
                      <td className="px-6 py-4">{item.cancertype}</td>
                      <td className="px-6 py-4">{item.cellname}</td>
                        </>
                      
                    </tr>
                  </tbody>
                ))}
            </>
          </table>
          <div className="flex justify-center mt-4">
        <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md" >
          Previous
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" >
          Next
        </button>
      </div>
        </div>

        {/* <pre>{JSON.stringify(item, null, 2)}</pre> */}
        {/* <pre>{item.contxtOfIdent}</pre> */}
      </div>
    </div>
  );
};

export default BqueryResult;
