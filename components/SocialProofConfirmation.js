import Box from "./core/Box";
import Button from './core/Button';

const generateTweet = () => {
  const str = `I just signed A Declaration for the Interdependence of Cyberspace! interdependence.online`;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURI(str)}`);
}

export default function SocialProofConfirmation({ closeModal }) {
    return (
      <Box
        title="Thank you for signing!"
        content={
            <div className="my-6">
                <p className="font-mono">
                    We're heartened you'll join us in the Pluriverse. If you have a moment, please share what this vision means to you.
                 </p>
                <Button
                primary
                onClick={generateTweet}>
                  {/* Twitter icon */}
                  Share
                </Button>
                <button className="text-gray-400" onClick={closeModal}>
                    Close
                </button>
          </div>}
      />
    );
  }