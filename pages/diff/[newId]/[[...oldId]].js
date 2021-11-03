import { useRouter } from 'next/router';
import React from "react";
import {useAsync} from "react-async-hook";
import {getDeclaration} from "../../../arweaveFns";
import HeadComponent from "../../../components/Head";
import BarLoader from "react-spinners/BarLoader";
import ReactDiffViewer from 'ab-react-diff-viewer';

export default function Diff() {
  const router = useRouter()
  const { oldId, newId } = router.query

  const oldDec = useAsync(getDeclaration, [oldId]);
  const newDec = useAsync(getDeclaration, [newId]);

  const loading = oldDec.loading || newDec.loading
  return (
    <div className="flex flex-col items-center bg-gray-bg justify-center pt-8 pb-24 bg-blue-20">
      <HeadComponent/>
      <main className="flex flex-col items-center min-h-screen w-full flex-1 px-2 sm:px-8 lg:px-8 xl:px-8">
        <div className="w-full my-10 sm:my-10 lg:my-20">
          <h1 className="font-title sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-primary">
            Difference
          </h1>
          {!loading && <p className="font-body">
            Showing the difference between the{' '}
            <a className="underline" href={oldDec.result.data.ancestor ? `/declaration/${oldDec.result.txId}` : 'https://www.eff.org/cyberspace-independence'}>original</a>{' '}
            which was written on{' '}
            {oldDec.result.data.timestamp}{' '}
            and the{' '}
            <a className="underline" href={`/declaration/${newDec.result.txId}`}>fork</a>{' '}
            which was written on{' '}
            {newDec.result.data.timestamp}.
          </p>}
        </div>
        {loading ? <BarLoader speedMultiplier=".75" height="2px" width ="300px" color="#bababa"/> :
        <ReactDiffViewer
          className="text-left"
          compareMethod="diffWords"
          oldValue={oldDec.result.data.declaration}
          newValue={newDec.result.data.declaration}
          splitView={true}
        />}
      </main>
    </div>
  )
}