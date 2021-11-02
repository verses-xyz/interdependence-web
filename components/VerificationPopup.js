import Box from "./core/Box";
import Button from './core/Button';

export default function VerificationPopUp({ }) {
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
                onClick={openModal}>
                  Verify Tweet
                </Button>
                <button className="text-gray-400">
                    Back
                </button>
          </div>}
      />
    );
  }