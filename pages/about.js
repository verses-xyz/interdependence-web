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
            Our Declaration is a revision of John Perry Barlow’s 1996 {" "}
          <a href="https://www.eff.org/cyberspace-independence" className="underline"> 
            Declaration for the Independence of Cyberspace</a> (view the diff <a className="underline" href="https://www.interdependence.online/diff/e-bw-AGkYsZFYqmAe2771A6hi9ZMIkWrkBNtHIF1hF4"> here</a>).
            It is also a reaction to Facebook’s recent rebranding as Meta, and to the dominance of large, centralized companies on today’s Internet,
            those we refer to in the document as the "Closed Fiefdoms of the platform world".
          </p>


          <p style={{'text-indent': '2rem'}}>
            Barlow’s Declaration quickly became part of the cyberpunk canon.<sup>1 </sup> 
            Today we sit at another inflection point in the trajectory of the internet. 
            Facebook’s rebranding has made clear that they aim to control the contours of the online world. Barlow’s 
            Declaration once captured dreams for a freer cyberspace, but today we find his document insufficient. 

          </p>

          <p style={{'text-indent': '2rem'}}>
            Barlow pits existing institutions against the internet; we see the key conflict not as old versus new, but as monopoly versus pluralism. 
            That is, while Barlow’s “you” refers to the government, our “you” refers to corporate and political hegemonies of all kinds. 
            Barlow emphasizes freedom of speech; we believe that this freedom must be accompanied with the freedom to design, govern, and own the environments that speech lives within. 
            Barlow takes a highly individualistic framing; we believe in individual agency alongside mutualism, reciprocity, and collective creation. 
            Barlow rejects embodiment; we recognize our digital identities and commitments to be interwoven with communities, societies, 
            and relationships in the material world. 
            Finally, Barlow’s Declaration was authored individually; this text was collaboratively written with dozens of people contributing prose and feedback, 
            and will always be open for signing. 
          </p>

            
          <p className="py-3" style={{'text-indent': '2rem'}}>
            In short, we want independence, yes, but also <em> interdependence</em>. 
          </p>

          <p style={{'text-indent': '2rem'}}>
           In the spirit of the pluriverse, we recognize that our document represents a singular vision, even as a collectively written artifact. 
           As such, we’ve built the infrastructure for others to author alternative verses now and into the future.<sup>2</sup>         
          </p>

          <h2 className="pt-10 font-bold text-2xl text-title"> 2. The Pattern </h2>

          <p style={{'text-indent': '2rem'}}> 
             The ontology of this object, and how other related objects can be generated related to it, also reflects the ethos of our Declaration.
          </p>

          <p style={{'text-indent': '2rem'}}>
           The text itself was collaboratively written, and entered into the permaweb on Oct 31, 2021, via <a className="underline" href="https://viewblock.io/arweave/tx/pB-rlYjCZJcLK7205sjHzeci6DEsX4PU0xG00GYpahE"> Arweave</a>.<sup>3</sup>
           </p>

          <p style={{'text-indent': '2rem'}}>
           The Pluriverse allows for the coexistence of many worlds and value systems; in the same spirit, 
           all forks of the Declaration will be linked below the text on our site. 
           Each document, its signatures, and its forks are committed to an
           immutable, and decentralized historical archive that anyone can explore. 
           Our site is one among many possible ways to interface with the texts created here.
           Soon after our public launch, we will be open-sourcing the code for this website. 
          </p>
          
          <p style={{'text-indent': '2rem'}}>
            Building towards the pluriverse means building with an ethos of interdependence, in a way that is open, interoperable, and supports the commons. 
           It means not reifying moats, including data moats, that restrict the freedom of all peoples to choose, individually or collectively, any web of relations, 
           but paving existing desire paths that others can freely choose to traverse, shape, and use.<sup>4</sup>
          </p>

          <p style={{'text-indent': '2rem'}}>
            Anyone can show their support for our Declaration by signing with their cryptographic wallet, a completely free transaction. 
            A volunteer-run server is used to handle the hosting and forking transaction costs on behalf of the readers, signers, and writers of the Declaration.<sup>5</sup>
          </p>

          <p style={{'text-indent': '2rem'}}>
            If you have additions or challenges to the declaration, you are encouraged to articulate your own revisions 
            by <a href="https://scribehow.com/shared/How-to-Fork__vnAD_3nRSuuH-63evHL22w"> creating a fork </a>. 
            For example, the language in the declaration employs the terms <em> you </em> and <em> yours </em> in conflict with us and ours; 
            a fork of this Declaration to change the pronouns and language has already been suggested and is an example of the type 
            of rhetorical work and contestation that we want to support with the forking feature. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            The Pluriverse allows for the coexistence of many worlds and value systems; in the same spirit, all forks will be linked below the Declaration on our site. 
            Each document, its signatures, and its forks are committed to a permanent, immutable, and decentralized historical archive that anyone can view. 
            Forks of the Declaration are automatically uploaded to Arweave upon creation; thus, our site is only one way among many possible ways to interface with that data. 
            Upon our public launch, we will be open-sourcing the software for this website.<sup>6</sup>
          </p>

          {/* <p style={{'text-indent': '2rem'}}> 
            We believe that to build towards the pluriverse means building in a way that is open, interoperable, and supports the commons. 
            It means building with an ethos of interdependence. It means not building moats, including data moats, that restrict the freedom of “all peoples to choose, 
            individually or collectively, [any] relations”, but paving existing desire paths and tools that others can freely choose to traverse, shape, and use. 
          </p> */}
        
          <h2 className="pt-10 font-bold text-2xl text-title"> 3. The Process </h2>

          <p style={{'text-indent': '2rem'}}>
            Contributions came in a multitude of ways. People wrote, edited, and gave feedback. 
            People provided technical guidance; others implemented this site you’re currently visiting. 
            Some people came and simply expressed their care and encouragement. 
          </p>

          <p style={{'text-indent': '2rem'}}>
            This work is authorless because it is authored in the spiritual sense by so many more people than we could feasibly name.<sup>7 </sup> 
          </p>
          <p style={{'text-indent': '2rem'}}>
            We owe debts to communities that we are part of, teachers who have guided us, and ancestors in various lineages that we now steward. 
            This work is thus a gift from many to many.         
          </p>
          
          <p style={{'text-indent': '2rem'}}>
            This work is a story, a pattern, and a process of interdependence. 
            By choosing to sign this document, you offer your support for the spirit of this work, and become part of the ongoing process of interdependence. 
            We hope that this invites you to join the broader effort to co-create a more sustainable web of relations online.
          </p>

        </div>
      </div>
    
    </div>
    <footer className="py-10 font-mono text-center text-sm text-gray-600 items-center"> 
       <a 
        href={"/declaration"}
        className="px-2 border-purple-2004 border-b-2 rounded-xl"> 
          (Planted on the Permaweb. ☘️. Oct 31, 2021.)
       </a>
      <div className="mt-10 
        px-20
        flex flex-col items-center 
        font-body text-sm text-gray-600 content-center">

        <div className="md:max-w-3xl space-y-3">
              <p className="text-left">
                <sup> 1 </sup>
                  Barlow was responding to a particular historical moment: the United States passing the Telecommunications Act of 1996, which was the first telecommunications 
                  law to include the internet, 
                  and which censored the broadcasting of “indecent” and “offensive” speech. 
                  The same day the Declaration was published, the Electronic Frontier Foundation launched the successful “Great Web Blackout” protest against online censorship.
              </p>
              <p className="text-left">
               <sup> 2 </sup> 
                We’d like to honor the history of the term “pluriverse,” which inspired and informed our vision. 
                After substantial research and consideration, we felt that the pluriverse better captured the expansiveness of our spirit than Neal Stephenson’s 
                virtual-first “metaverse.” 
                Postcolonial thinkers and activists have conceived of the pluriverse as a counternarrative to the Western tendency to universalize values. 
                The shared kernel among these definitions is that the pluriverse stands in favour of a multiplicity of worlds and cultures: an ethic that we hope to extend, 
                but not limit, to the expanding digital realm. In a subsequent work, we plan elaborate more fully on the term pluriverse, its history, and what future it proposes.
               </p>
              <p className="text-left"> 
                <sup> 3 </sup> Unlike other blockchains,  Arweave does not require a significant expenditure of electricity to maintain its integrity, 
                and is focused on preserving information. On the Arweave, block verifiers are akin to librarians, 
                stewards of a sustainable and transparent storage system for our pluriverse.
              </p>
              <p className="text-left">
              <sup> 4</sup> Some have already suggested a fork of this Declaration to change this confrontational language, which would be a valuable addition to the conversation. 
              For example, the language in the declaration employs the terms you and yours as in conflict with us and ours. A fork focused on the economic implications is also underway. 
            </p>
            <p className="text-left">
              <sup> 5 </sup> In urban studies, desire paths are described as “[...] tracks made over time by the feet of walkers, especially those paths that run contrary to existing design or planning”.
            </p>
            <p className="text-left"> 
            <sup> 6 </sup> We hope to reimplement this with complete decentralization. If you'd like to help, join the Discord server <a href="https://discord.gg/FPqr9JDA" className="underline"> here</a>. If you'd like to support in other ways, here's our <a href="https://etherscan.io/address/0x938A59F111FcB46E7534B01FE53dD774480594Bc"> multisig </a>.
            </p>

           <p className="text-left">
            <sup> 7 </sup> 
            Those of us who consciously contributed to this project through writing, coding, 
              feedback or support are created and influenced by many others: the communities that we are part of, 
              people who have taught us, and all the texts and stories that have shaped our worldviews.  
              The meaning of authorship depends heavily on how we draw the boundaries of our selfhood.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
