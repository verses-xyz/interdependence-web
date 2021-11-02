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
  return (<div className="flex w-full mb-8">
    <div className="hidden sm:block flex-1">
    </div>
    {show && 
    <div className="flex-0 w-full flex justify-center sm:justify-end">
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
  const parsedAuthors = Array.isArray(authors) ? authors : JSON.parse(authors || "[]")

  if (status === 200) {
    return <>
      <hr/>
        <div className="
          my-20
          font-body
          text-2xl
          text-justify
          space-y-12
          text-opacity-75
          max-w-3xl
          whitespace-pre-wrap">
          {declaration}
          <p className="font-bold text-left max-w-3xl font-title text-2xl mt-16">{timestamp}</p>
        </div>

        {parsedAuthors.length > 0 && <>
          <hr/>
          <div className="mt-20 max-w-3xl">
            <ul className="flex flex-wrap font-mono">
              {parsedAuthors.map(author => <li className="my-1 mx-2 overflow-hidden py-2 px-4 rounded-3xl text-brown-120 hover:text-brown-20 bg-gray-200" key={author.name}><a href={author.url}>{author.name}</a></li>)}
            </ul>
          </div>
        </>}

        <hr className="my-20" />

        <div className="grid grid-cols-1 xl:grid-cols-2 flex w-full sm:w-4/5 md:w-1/2 lg:w-3/5">
          <div id="signatureForm" className="flex-1 mx-4 lg:mx-8">
            <Sign txId={txId} />
          </div>

          <div className="mt-10 flex-1 mx-4 md:mx-10 xl:mt-0">
            <Fork
              text={declaration} txId={txId} />
          </div>
        </div>

        <div className="my-32 m-24 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 md:m-12 sm:m-6">
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
        <div className="w-full">
          <h1 className="text-4xl font-title my-10 sm:my-10 xl:my-20 sm:text-4xl md:text-5xl lg:text-7xl font-semibold">
            Declaration
            <span className="text-2xl block font-light italic -mb-5 sm:-mb-4 md:-mb-1.5 lg:-mb-1 mt-1 sm:mt-2 md:mt-4 lg:mt-4 text-xl sm:text-2xl md:text-3xl xl:text-4xl">of the</span>
            {/* Two responsive elements to fix line breaking on xs viewports. */}
            <div className="hidden sm:block max-w-2xl m-auto" style={{ lineHeight: "5.25rem" }}>Interdependence of Cyberspace</div>
            <div className="sm:hidden max-w-2xl m-auto mt-5" style={{ lineHeight: "2.5rem" }}>Interdependence of Cyberspace</div>
          </h1>
        </div>

        {maybeDeclaration.loading ? <GridLoader/> : <Body txId={txId} {...maybeDeclaration.result} />}
      </main>
    </div>
  );
}
