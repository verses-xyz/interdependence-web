import {getDeclaration} from "../../arweaveFns";
import Declaration from "./[txId]";

const CANONICAL = "e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4";

export default Declaration

export async function getServerSideProps(context) {
    return {
      props: await getDeclaration(CANONICAL),
    }
  }
  