import Box from "./core/Box";
import Button from './core/Button';


const generateTweet = () => {
  const str = `I just signed the KONG Land Charter. kong.land`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURI(str)}`);
}

export default function SocialProofConfirmation({ closeModal }) {
    return (
      <Box
        title={<p className="text-center"> Your signature on the KONG Land Charter has been recorded. </p>}
        includeBorder={false}
        content={
            <div className="mt-8 mb-6">
                <p className="font-mono mx-6 mb-6">
                  Support KONG Land, Support the $CITIZENs.
                </p>
                
                <div className="mt-12 mb-3 text-center">
                  <Button
                  primary
                  onClick={generateTweet}>
                    Share
                  </Button>
                </div>
               
                <div className="text-center">
                  <button
                    className="font-mono underline font-light text-gray-400"
                    onClick={closeModal}>
                      Close
                  </button>
                </div>
          </div>}
      />
    );
  }
