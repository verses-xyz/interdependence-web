import Head from "next/head";
import HeadComponent from "../components/Head";

import Button from '../components/core/Button';

export default function About() {
  return (
    <>
    <div>
      <HeadComponent/>
      <div
        className="flex flex-col items-center flex-1                
                      px-4
                      sm:px-5
                      md:px10 
                      lg:px-40
                      py-20 
                      text-center"
      >
        <div className="flex w-full mb-8 sm:mb-0 ">
            <div className="hidden sm:block flex-1">
            </div>
            <div className="flex-0 w-full flex justify-center sm:justify-end">
              <Button>
                <a className="font-mono"
                  href="/declaration"
                  >
                    Declaration →</a>
              </Button>
            </div>
          </div>
        <h2 className="mt-20 text-3xl font-title w-full font-bold px-20 text-center">
          About
        </h2>
        <div
          className="mt-10 
            font-body 
            text-2xl
            text-left 
            text-opacity-75 
            space-y-2
            max-w-4xl 
            px-5
            md:px-10"
        >

        <h2 className="pt-10 font-bold text-2xl text-title"> 1. The Story </h2>
          
        <p style={{'text-indent': '2rem'}}>
          Our Declaration directly forks, or revises, John Perry Barlow’s 1996 {" "}
        <a href="https://www.eff.org/cyberspace-independence" className="underline"> 
          Declaration for the Independence of Cyberspace.</a> {" "}
          It is also a reaction to Facebook’s recent rebranding as Meta, 
          and to the dominance of large, centralized companies on today’s 
          Internet more generally: the “closed fiefdoms of the platform world” that we refer to in the document.
        </p>

        <p style={{'text-indent': '2rem'}}>
        
          Barlow’s Declaration quickly became part of the internet’s canon. 
          He was responding to a particular historical moment: the United States passing the Telecommunications Act of 1996, which was the first telecommunications law to include the internet, 
          and which censored the broadcasting of “indecent” and “offensive” speech. 
          The same day the Declaration was published, the Electronic Frontier Foundation launched the successful “Great Web Blackout” protest against online censorship.
        
        </p>

        <p style={{'text-indent': '2rem'}}>
         
          Today, we sit at another inflection point in the future history of a more interoperable, open internet. 
          Facebook’s rebranding has made clear that they aim to control the contours of the online world. While Barlow’s 
          Declaration captured similar dreams for a freer cyberspace, we found his document insufficient. 

        </p>
          
        <p style={{'text-indent': '2rem'}}>

          The diff from Barlow’s Declaration is available <a className="underline" href="https://www.interdependence.online/diff/e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4"> here </a>. 
          Barlow pits existing institutions against the internet; we see the key conflict not as old versus new, 
          but as monopoly versus pluralism. That is, while Barlow’s “you” refers to the government, our “you” refers to corporate and political hegemonies of all kinds. 
          Barlow emphasizes freedom of speech; we believe that this freedom must be accompanied with the freedom to design, govern, and own the environments that speech lives within. 
          Barlow takes a highly individualistic framing; we believe in individual agency alongside mutualism, reciprocity, and collective creation. 
          Barlow rejects embodiment; we recognize our digital identities and commitments to be interwoven with communities, societies, and relationships in the physical and material world. 
          Finally, Barlow’s Declaration was authored individually; this text was collaboratively written with dozens of people contributing prose and feedback, 
          and will always be open for signing. 


        </p>
          
          <p style={{'text-indent': '2rem'}}>
            In short, we want independence, yes, but also <em> interdependence</em>. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            We’d like to honor the history of the term “pluriverse,” which inspired and informed our vision. 
            After substantial research and consideration, we felt that the pluriverse better captured the expansiveness of our spirit than Neal Stephenson’s virtual-first “metaverse.” 
            Postcolonial thinkers and activists have conceived of the pluriverse as a counternarrative to the hegemonic universalization of Western values. 
            Citing anthropologist Arturo Escobar, the pluriverse is “not [merely] about ‘expanding the range of choices’ (liberal freedom) but is intended to transform the kinds of beings we desire to be.” 
            In physics, meanwhile, the pluriverse describes a world as a plural collection of things, somewhat connected and somewhat not. 
            The shared kernel among these definitions is that the pluriverse stands in favour of a multiplicity of worlds and cultures: an ethic that we hope to extend, but not limit, to the expanding digital realm. 
            We plan to elaborate more fully on this language and its history in a subsequent work.
          </p>

          <p style={{'text-indent': '2rem'}}>
           In the spirit of the pluriverse, we recognize that our document represents a singular vision, even as a collectively written artifact. As such, we’ve built the infrastructure for others to author alternative verses now and into the future.         
          </p>

          <h2 className="pt-10 font-bold text-2xl text-title"> 2. The Pattern </h2>

          <p style={{'text-indent': '2rem'}}> 
            The ontology of this object, and how other related objects can be generated related to it, reflects the ethos of our Declaration. 
          </p>

          <p style={{'text-indent': '2rem'}}>
           The text itself was collaboratively written, with dozens of people contributing prose and feedback. 
          </p>
          
          <p style={{'text-indent': '2rem'}}>
            The Declaration was entered into the permaweb on Oct 31, 2021, via <a className="underline" href="https://viewblock.io/arweave/tx/pB-rlYjCZJcLK7205sjHzeci6DEsX2PU0xG00GYpahE"> Arweave </a>, 
            in honour of the anniversary of the publication of the Bitcoin whitepaper. 
            Unlike other blockchains,  Arweave does not require significant expenditure of electricity to maintain its integrity. 
            On the Arweave, block verifiers are akin to librarians, stewards of a sustainable and transparent storage system for our pluriverse.
          </p>

          <p style={{'text-indent': '2rem'}}>
            Anyone can show their support for our Declaration by signing with their cryptographic wallet, a completely free transaction. 
            We chose to handle the hosting and blockweave transaction fees on behalf of the readers, signers, and writers of the Declaration. 
            While we wish we could have implemented this with complete decentralization, 
            we realized that a much the more complicated onboarding process would have precluded many from participating as signers & writers. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            If readers have revisions, additions, or challenges to the declaration, they are encouraged to articulate their own revisions 
            by <a href="https://scribehow.com/shared/How-to-Fork__vnAD_3nRSuuH-63evHL22w"> creating a fork </a>. 
            For example, the language in the declaration employs the terms <em> you </em> and <em> yours </em> in conflict with us and ours; 
            a fork of this Declaration to change the pronouns and language has already been suggested and is an example of the type 
            of rhetorical work and contestation that we want to support with the forking feature. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            The Pluriverse allows for the coexistence of many worlds and value systems; in the same spirit, all forks will be linked below the Declaration on our site. 
            Each document, its signatures, and its forks are committed to a permanent, immutable, and decentralized historical archive that anyone can view. 
            Forks of the Declaration are automatically uploaded to Arweave upon creation; thus, our site is only one way among many possible ways to interface with that data. 
            Upon our public launch, we will be open-sourcing our software, which will mean that the entirety of the work will be open.
          </p>

          <p style={{'text-indent': '2rem'}}> 
            We believe that to build towards the pluriverse, you’re building in a way that is open, interoperable, and supports the commons. 
            It means building with an ethos of interdependence. It means not building moats, including data moats, that restrict the freedom of “all peoples to choose, 
            individually or collectively, [any] relations”, but paving existing desire paths and tools that others can freely choose to traverse, shape, and use. 
          </p>
        
          <h2 className="pt-10 font-bold text-2xl text-title"> 3. The Process </h2>

          <p style={{'text-indent': '2rem'}}>
            How we define who contributed to the project depends so heavily on how we conceptualize the borders of our selfhood and how we relate to each other, 
            so we thought it was worth elaborating upon here. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            Contributions came in a multitude of ways. People wrote, edited, and gave feedback. 
            People provided technical guidance; others implemented this site you’re currently visiting. 
            Some people came and simply expressed their care and encouragement. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            We chose to leave the canonical text authorless because it is a gift, 
            and authored in the spiritual sense by so many more people than we could 
            feasibly name. Everyone who chooses to leave their name here is both offering 
            their support and claiming a work that is in actuality already theirs.          
          </p>
          
          <p style={{'text-indent': '2rem'}}> 
            We also owe debts to communities that we are part of, mentors who have taught us, ancestors who have written important texts that have shaped our ways of 
            viewing the world.         
          </p>

          <p style={{'text-indent': '2rem'}}>
            Thank you for reading this. 
            This work is a story, a pattern, and a process of interdependence. We hope that it invites you to join us in co-creating a more sustainable web of relations online.     
          </p>

        </div>
      </div>
    
    </div>
    <footer className="py-10 font-mono text-center text-xs text-gray-600"> 
       <a 
        href={"/declaration"}
        className="px-2 border-purple-2004 border-b-2 rounded-xl"> 
          (Planted on the Permaweb. ☘️. Oct 31, 2021.)
       </a>
      </footer>
    </>
  );
}
