import Head from "next/head";
import HeadComponent from "../components/Head";

import Button from '../components/core/Button';

export default function About() {
  return (
    <div>
      <HeadComponent/>
      <div
        className="flex flex-col items-center flex-1
                      px-48
                      lg:px-40
                      xl:px-60
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
        px-10
        sm:px-10
        md:px-10"
        >

          <h2 className="pt-10 font-bold text-2xl text-title"> 1. The Story </h2>
          <p>
          This project was pulled together over four days in an entirely grassroots fashion. 
	        The original Declaration of the Independence of Cyberspace was published in 1996 and quickly became part of the internet’s canon. It was a response to a particular moment; the United States government had just passed into law the Telecommunications Act, which was the first time that the Internet was included in broadcasting and spectrum allotment. The declaration captures much of what originally drew people to the internet, but we found it insufficient for several reasons. The original highly emphasizes freedom of speech and individual choice; we believe that these freedoms are insufficient if not accompanied with the ability to build and own our own desired paths. The original takes a highly individualistic framing; we believe in the power of the individual along with the importance of mutualism, reciprocity, and collective ownership. The original rejects government; we believe that interdependence is possible between governments and technologists. The original rejects embodiment; we recognize our digital identities and commitments to be interwoven with existing communities, societies, and relationships in the physical and material world.
          </p>

          <p>
          In short, we want independence, yes, but also <em> interdependence </em>. 
          </p>

          <p>
          The term pluriverse has been employed by various disciplines. 
          From literary studies, the pluriverse was posed as a counternarrative to a singular, hegemonic universalization of Western values: it stood in favour of a multiplicity of possible worlds. 
          From physics, the pluriverse describes a world as a plural collection of things, somewhat connected and somewhat not. 
          The shared kernel between these different fields is that the term ‘pluriverse’, more than anything else, signifies a world that allows for the expression of different value systems. 
          More to come in a follow-up essay, but for now, a reminder from Escobar that “it is not [merely] about ‘expanding the range of choices’ (liberal freedom) but is intended to transform the kinds of beings we desire to be”. 
          </p>

          <h2 className="pt-10 font-bold text-2xl text-title"> 2. The Pattern </h2>

          <p> The ontology of this object, and how other related objects can be generated related to it, reflects the ethos of our Declaration. </p>

          <p> The Declaration was entered into the permaweb on Oct 31, 2021 via Arweave, in honour of the anniversary of the publication of the Bitcoin whitepaper. The document, its signatures, and its forks are committed to a permanent, immutable, and decentralized historical archive. 
              Anyone can show their support for our Declaration by signing with their Metamask wallet. Signing is free; we thought it was important that backing this document did not require ownership of any cryptocurrency.
          </p>

          <p>
            If readers have revisions, additions, or challenges are encouraged to articulate their own visions by creating and committing a fork. 
            For example, we recognize that the language in the declaration employs the terms you and yours in conflict with us and ours in a way close to condemnation; the Pluriverse is built upon the coexistence of many worlds and value systems; as such, all forks will be linked below the Declaration on our site. Forks of the Declaration are automatically uploaded to Arweave upon creation; thus, our site is only one way among many possible ways to interface with that data.
            The diff from the original Declaration is available here. 
          </p>

          <p>
            There are also a few other hidden Easter eggs in the design decisions ✨
          </p>
        
          <h2 className="pt-10 font-bold text-2xl text-title"> 3. The Process </h2>

          <p>
          How we define who contributed to the project depends so heavily on how we conceptualize the borders of our selfhood and how we relate to each other, so we thought it was worth elaborating upon here          </p>

          <p>
          Contributions came in a multitude of ways. People wrote, edited, and gave feedback. People provided technical guidance; others implemented this site you’re currently visiting. Some people came and simply expressed their care and encouragement. It was too difficult to collapse all these things in an attempt to create some legible rank ordering of authorship, which we initially attempted, as you can see on our Arweave version here.
          </p>
          
          <p> 
          We also owe debts to communities that we are part of, mentors who have taught us, ancestors who have written important texts that have shaped our ways of viewing the world.          </p>

          <p>
          We chose to leave the canonical text authorless because it is a gift, and authored in the spiritual sense by so many more people than we could feasibly name. Everyone who chooses to leave their name here is both offering their support and claiming a work that is in actuality already theirs.          </p>
         
         <p>
           Thank you for reading this. This artifact represents a story, a pattern, and a process; it symbolizes for us the intentional practice of interdependence, and hopefully invites and enables you to join us.         </p>

        </div>
      </div>
    </div>
  );
}
