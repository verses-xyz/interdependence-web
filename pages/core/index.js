import {getDeclaration} from "../../arweaveFns";
import Declaration from "./[txId]";

const ORIGINAL = "pB-rlYjCZJcLK7205sjHzeci6DEsX4PU0xG00GYpahE"

export default Declaration

export async function getServerSideProps(context) {
  return {
    props: await getDeclaration(ORIGINAL),
  }
}
