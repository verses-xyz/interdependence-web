import {getDeclaration} from "../../arweaveFns";
import Sign from "../../components/Sign";
import Fork from "../../components/Fork";
import Signatures from "../../components/Signatures";
import HeadComponent from "../../components/Head";
import Button from "../../components/core/Button";
import {useAsync} from "react-async-hook";
import GridLoader from "react-spinners/GridLoader";
import { useRouter } from 'next/router'

const ORIGINAL = "pB-rlYjCZJcLK7205sjHzeci6DEsX4PU0xG00GYpahE"
function Header({ show }) {
  return (<div className="flex w-full absolute right-12">
    <div className="flex-1">
    </div>
    {show && <div className="flex-0">
      <Button text="Sign" primary onClick={() => { document.getElementById('signatureForm').scrollIntoView(); }}>
        <p className="font-mono">Sign</p>
      </Button>
      <Button>
        <a className="font-mono" href="/about">About</a>
      </Button>
    </div>}
  </div>)
}

function Body({ txId, data, sigs, status }) {
  const {declaration, authors, timestamp} = data

  if (status === 200) {
    return <>
      <hr/>
      <div className="my-20
          font-body
          text-2xl
          text-justify
          space-y-12
          text-opacity-75
          max-w-3xl
          whitespace-pre-wrap">
        {declaration}
      </div>
      <hr/>
      <div className="mt-20 max-w-3xl">
        <ul className="flex flex-wrap font-mono">
          <p className="py-2 px-4 my-1 mx-2 border border-brown-120 rounded-3xl overflow-hidden">{timestamp}</p>
          {authors.map(author => <li className="my-1 mx-2 overflow-hidden py-2 px-4 rounded-3xl text-brown-120 bg-gray-200" key={author.name}><a href={author.url}>{author.name}</a></li>)}
        </ul>
      </div>

      <hr className="my-20" />

      <div className="grid grid-cols-1 md:grid-cols-2 flex w-1/2">
        <div id="signatureForm" className="flex-1 mx-4 md:mx-8">
          <Sign txId={txId} walletKey={""} />
        </div>

        <div className="mt-20 flex-1 mx-4 md:mx-8 md:mt-0">
          <Fork
            text={declaration} txId={txId} walletKey={""} />
        </div>
      </div>

      <div className="m-24 w-2/5 md:m-12 sm:m-6">
        <Signatures sigs={sigs}/>
      </div>
    </>
  } else if (status === 202) {
    return <div className="w-1/4 font-title">
      <h3 className="text-2xl font-bold">Forking in Progress</h3>
      <p className="text-lg">The block containing your new declaration has not been mined yet. Check back in 5-10 minutes.</p>
    </div>
  } else {
    return <div className="w-1/4 font-title">
      <h3 className="text-2xl font-bold">Not Found</h3>
      <p className="text-lg">Either this transaction doesn't exist or the data format is incorrect.</p>
    </div>
  }
}

export default function Declaration() {
  const router = useRouter()
  const txId = router.query.txId || ORIGINAL
  const maybeDeclaration = useAsync(getDeclaration, [txId])

  return (
    <div className="flex flex-col items-center justify-center py-4 bg-blue-20">
      <HeadComponent/>
      <main className="flex flex-col items-center min-h-screen w-full flex-1 px-2 sm:px-10 lg:px-20 xl:px-20 text-center">
        <Header show={!maybeDeclaration.loading} />
        <div className="w-1/2">
          <h1 className="text-3xl font-title my-10 sm:m-10 xl:m-20 sm:text-4xl md:text-5xl lg:text-7xl font-semibold">
            Declaration
            <span className="text-2xl block font-light italic m-5 sm:text-2xl md:text-4xl lg:text-4xl xl:text-7xl">of the</span>
            Interdependence of Cyberspace
          </h1>
        </div>

        {maybeDeclaration.loading ? <GridLoader/> : <Body txId={txId} {...maybeDeclaration.result} />}
      </main>
    </div>
  );
}
