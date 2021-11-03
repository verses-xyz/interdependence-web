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
                      px-10
                      md:px-48
                      lg:px-40
                      py-20 
                      text-center 
                      md:px-20 sm:px-5 xs:px-5"
      >
        <div className="flex w-full mb-8 sm:mb-0">
            <div className="hidden sm:block flex-1">
            </div>
            <div className="flex-0 w-full flex justify-center sm:justify-start">
              <Button>
                <a className="font-mono"
                  href="/"
                  >
                    ← Declaration</a>
              </Button>
            </div>
          </div>
        <h2 className="mt-20 text-4xl font-title w-full font-bold px-20 text-center">
          About
        </h2>
        <div
          className="mt-10 
            font-body 
            text-lg 
            text-left 
            space-y-3
            text-opacity-75 
            max-w-4xl 
            px-5
            md:px-10"
        >

          <h2 className="pt-10 font-bold text-2xl text-title"> 1. The Story </h2>
          
          <p>
          Our Declaration is a reaction and rebuttal to Facebook’s recent rebranding as Meta, 
          and it directly “forks” John Perry Barlow’s 1996 {" "}
          <a href="https://www.eff.org/cyberspace-independence" className="underline"> 
            Declaration for the Independence of Cyberspace. 
          </a>
          </p>

          <p>
            The original Declaration quickly became part of the internet’s canon. 
            It was a response to a particular moment; the United States government had just passed into law the Telecommunications Act of 1996, 
            which was the first time that the internet was included in broadcasting and spectrum allotment. 
            The declaration captures much of what originally drew people to the internet, but we found it insufficient for several reasons.
          </p> 
          
          <p>The original highly emphasizes freedom of speech; we believe that these freedoms are insufficient if not accompanied with the ability 
            to build and own our own desired paths. The original takes a highly individualistic framing; we believe in the power of the individual 
            along with the importance of mutualism, reciprocity, and collective ownership. 
            The original rejects embodiment; we recognize our digital identities and commitments to be interwoven with existing communities, societies, and relationships in the physical and material world. 
            The original was authored individually; this text was collaboratively written with dozens of people contributing prose and feedback, and will always be open for signing. 
          </p>
          
          <p>
            In short, we want independence, yes, but also <em> interdependence</em>. 
          </p>

          <p>
          We’d like to honor the history of the term “pluriverse,” which substantially inspired and informed this vision. 
          Postcolonial thinkers and activists have conceived of the pluriverse as a counternarrative to the hegemonic universalization of Western values. 
          Citing anthropologist Arturo Escobar, the pluriverse is “not [merely] about ‘expanding the range of choices’ (liberal freedom) but is intended to transform the kinds of beings we desire to be.”  
          In physics, meanwhile, the pluriverse describes a world as a plural collection of things, somewhat connected and somewhat not. 
          The shared kernel among these definitions is that the 'pluriverse' stands in favour of a multiplicity of worlds and cultures 
          -- an ethic that we hope to extend, but not limit, to the expanding digital realm. 
          </p>

          {/* CHANGE */}
          <p>
          Similar to the original document, our document is situated in a particular time. We are responding to a particular moment of potentially devastating collective action problems, increasing atomization, and an inflection point in the future history of a more interoperable, open internet. We recognize that this document is limited in many ways, even as a collectively written document, and have built infrastructure  with this project that we hope is useful for alternative verses to be authored now and into the future.
          </p>

          <h2 className="pt-10 font-bold text-2xl text-title"> 2. The Pattern </h2>

          <p> The ontology of this object, and how other related objects can be generated related to it, reflects the ethos of our Declaration.
            The text itself was collaboratively written, with dozens of people contributing prose and feedback. </p>
          
          <p>
            The Declaration was entered into the permaweb on Oct 31, 2021 via <a className="underline" href="https://viewblock.io/arweave/tx/pB-rlYjCZJcLK7205sjHzeci6DEsX4PU0xG00GYpahE"> Arweave </a>, 
            in honour of the anniversary of the publication of the Bitcoin whitepaper. 
            Unlike other blockchains,  Arweave does not require significant expenditure of electricity to maintain its integrity. 
            Instead, Arweave block verifiers are incentivized to store & maintain valuable data on the permaweb. 
            In this context, block verifiers are more like librarians, stewards of a sustainable and transparent storage system for our pluriverse.
          </p>

          <p>
            Anyone can show their support for our Declaration by signing with their cryptographic wallet, a completely free transaction. 
            We chose to handle the hosting and blockweave transaction fees on behalf of the readers, signers, and writers of the Declaration. 
            While we wish we could have implemented this with complete decentralization, 
            we realized that a much the more complicated onboarding process would have precluded many from participating as signers & writers. 
          </p>

          <p>
            If readers have revisions, additions, or challenges to the declaration, they are encouraged to articulate their own revisions 
            by <a href="https://scribehow.com/shared/How-to-Fork__vnAD_3nRSuuH-63evHL24w"> creating a fork </a>. 
            For example, the language in the declaration employs the terms you and yours in conflict with us and ours; 
            a fork of this Declaration to change the pronouns and language has already been suggested and is an example of the type 
            of rhetorical work and contestation that we want to support with the forking feature. 
          </p>

          <p>
          The Pluriverse is one that allows the coexistence of many worlds and value systems; in the same spirit, all forks will be linked below the Declaration on our site. 
          Forks of the Declaration are automatically uploaded to Arweave upon creation; thus, our site is only one way among many possible ways to interface with that data. 
          Each document, its signatures, and its forks are committed to a permanent, immutable, and decentralized historical archive that anyone is able to view.
          </p>

          <p> The diff from the original Declaration is available <a className="underline" href="https://www.interdependence.online/diff/e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4"> here. </a> </p>

          <p> There are also a few other hidden Easter Eggs in the design decisions ✨ </p>

        
          <h2 className="pt-10 font-bold text-2xl text-title"> 3. The Process </h2>

          <p>
          How we define who contributed to the project depends so heavily on how we conceptualize the borders of our selfhood and how we relate to each other, so we thought it was worth elaborating upon here. </p>

          <p>
          Contributions came in a multitude of ways. People wrote, edited, and gave feedback. 
          People provided technical guidance; others implemented this site you’re currently visiting. 
          Some people came and simply expressed their care and encouragement. 
          </p>
          
          <p> 
          We also owe debts to communities that we are part of, mentors who have taught us, ancestors who have written important texts that have shaped our ways of viewing the world.          </p>

          <p>
          We chose to leave the canonical text authorless because it is a gift, and authored in the spiritual sense by so many more people than we could feasibly name. Everyone who chooses to leave their name here is both offering their support and claiming a work that is in actuality already theirs.          </p>
         
         <p>
         Thank you for reading this. This artifact represents a story, a pattern, and a process; it symbolizes for us the intentional practice of interdependence, and hopefully invites and enables you to join us in co-creating a cyberspace that enables a web of relations that is more sustainable than the one enforced by the one we currently inhabit.           </p>

        </div>
      </div>
    
    </div>
    <footer className="hideen py-10 font-mono text-center text-small text-gray-600"> 
       <a 
        href={"/declaration"}
        className="px-2 border-purple-2004 border-2 rounded-xl"> 
          Planted on the Permaweb. Oct 31, 2021. 
       </a>
      </footer>
    </>
  );
}
