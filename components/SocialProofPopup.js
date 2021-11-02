import Box from "./core/Box";
import Button from './core/Button';
import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import {DisplayedError} from "./Sign";

const generateTweet = (sig) => {
  const str = `I am verifying for @verses_xyz: sig:${sig}`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURI(str)}`);
}

export default function SocialProofPopup({ setStage, formData, sign }) {
  const [loading, setIsLoading] = React.useState(false);
  const [displayedError, setDisplayedError] = React.useState(false);

  const wrappedSign = () => {
    setIsLoading(true)
    sign()
      .then((signatureServerResponse) => {
        setStage(3)
        setIsLoading(false);
      })
      .catch((err) => {
        setDisplayedError(err.message);
        setIsLoading(false);
      })
  }

  return (
    <Box
      title={<p className="text-center"> Post Proof </p>}
      content={
        <div className="mt-8 mb-6">
          <p className="font-mono mx-6">
            If you like, you can tweet a message to prove you own this address and verify your signature:
           </p>

           <div className="mt-12 mb-5 text-center">
            <Button primary
            onClick={() => {
              generateTweet(formData.sig)
              setStage(2)
            }}>
              Post Proof
            </Button>
          </div>
          <div className="text-center">
            <button className="font-mono underline font-light text-gray-400" onClick={wrappedSign}>{loading ? <ScaleLoader color="black" height={12} width={3}/> : 'Sign Without Verification'}
            </button>
          </div>
          <DisplayedError displayedError={displayedError}/>
        </div>}
    />
  );
  }