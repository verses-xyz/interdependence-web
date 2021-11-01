import {getDeclaration} from "../../arweaveFns";
import Declaration from "./[txId]";

const ORIGINAL = "FcEBKyd7kp11xVSdPKVxqcJdSRAYfuIRX582iM4Q17Y"

export default Declaration

export async function getServerSideProps(context) {
  return {
    props: await getDeclaration(ORIGINAL),
  }
}
