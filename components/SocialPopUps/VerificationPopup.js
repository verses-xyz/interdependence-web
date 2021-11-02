import Box from '../core/Box'
import Checkmark from '../core/icons/Checkmark';
import Button from '../core/Button';
import { verifyTwitter } from "../../arweaveFns";

export default function VerificationPopUp({ }) {
    return (
      <Box
        title="Verify Tweet"
        content={
            <div className="grid grid-cols-1 my-6">
                <p className="font-mono">
                  Once you've tweeted, click below to verify:                
                 </p>
                <Button
                primary
                //onClick verifyTwitter(address, handle)
                >
                  Verify Tweet
                </Button>
                <button className="text-gray-400">
                    Back
                </button>
          </div>}
      />
    );
  }