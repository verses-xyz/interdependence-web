import Box from "./core/Box";
import Checkmark from './core/Checkmark';
import Button from './core/Button';

export default function VerificationPopUp({ }) {
    return (
      <Box
        title="Post Proof"
        content={
            <div className="my-6">
                <p className="font-mono">
                    If you like, you can tweet a message to prove you own this address and verify your signature:
                 </p>
                <Button
                primary
                onClick={openModal}>
                  {/* Twitter icon */}
                  Post Proof
                </Button>
                <button className="text-gray-400">
                    Skip
                </button>
          </div>}
      />
    );
  }