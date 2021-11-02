import Box from "./core/Box";
import Button from './core/Button';
import React from "react";
import {verifyTwitter} from "../arweaveFns";
import {DisplayedError} from "./Sign";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function VerificationPopUp({ setStage, formData, sign }) {
  const [loading, setIsLoading] = React.useState(false);
  const [displayedError, setDisplayedError] = React.useState(false);

  const handleError = (err) => {
    setDisplayedError(err.message);
    setIsLoading(false);
  }

  const verify = () => {
    const { sig, handle } = formData
    setIsLoading(true)
    verifyTwitter(sig, handle)
      .then((data) => {
        if ('message' in data) {
          throw new Error(data.message)
        }

        console.log(`Verified as ${handle}!`)
      })
      .then(sign)
      .then(() => {
        setStage(3)
        setIsLoading(false);
        setDisplayedError(false)
      })
      .catch(handleError)
  }


  return (
    <Box
      title="Verify Tweet"
      content={
        <div className="my-6">
          <p className="font-mono">
            Once you've tweeted, click below to verify:
           </p>
          <Button
          primary
          onClick={verify}
          >
            {loading ? <ScaleLoader color="white" height={12} width={3}/> : 'Verify Tweet'}
          </Button>
          <button className="text-gray-400" onClick={() => setStage(1)}>
              Back
          </button>
          <DisplayedError displayedError={displayedError} />
      </div>}
    />
  );
  }