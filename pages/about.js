import Head from "next/head";

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="flex flex-col items-center justify-center w-full flex-1 
                      px-10
                      lg:px-40
                      xl:px-60
                      py-20 
                      text-center 
                      md:px-20 sm:px-5 xs:px-5"
      >
        <h1 className="text-6xl font-body text-bold px-20 text-center">
          About
        </h1>
        <div
          className="mt-10 
        font-body 
        text-lg 
        text-left 
        space-y-12
        text-opacity-75 
        max-w-4xl 
        px-10
        sm:px-10
        md:px-10"
        >
          <ol className="list-decimal">
            <li className="font-bold">
              <h2 className="ml-8">
                Backstory of how this document came to be{" "}
              </h2>
            </li>
            <p>
              <br />
              &emsp;&emsp;This document was pulled together over three days in
              an entirely grassroots fashion. On Oct 28, 2021, Facebook
              announced that it was rebranding itself to Meta, alongside a
              keynote announcing that it was becoming a metaverse company.
              <br />
              <br />
              <ol className="list-disc">
                <li className="ml-4 pl-4">
                  Acknowledge Gareth as coining the idea
                </li>
                <li className="ml-4 pl-4">
                  Brief context around the term pluriverse
                </li>
              </ol>
              <br />
              &emsp;&emsp;The original{" "}
              <a
                href="https://www.eff.org/cyberspace-independence"
                target="_blank"
              >
                Declaration of the Interdependence of Cyberspace{" "}
              </a>{" "}
              is an important part of the internet’s canon. It was a response to
              a particular moment; the telecoms industry was attempting to
              regulate the early internet. It captures much of what originally
              drew people to the internet, but we found it insufficient for
              several reasons. The original highly emphasizes freedom of speech
              and individual choice; we believe that these freedoms are
              insufficient if not accompanied with the ability to build and own
              our own desired paths. The original takes a highly individualistic
              framing; we believe that power lies in collectivity. The original
              rejects government; we believe that interdependence is possible
              between governments and technologists. The original rejects
              embodiment; we recognize our digital identities and commitments to
              be interwoven with existing communities, societies, and
              relationships in the physical and material world.
              <br />
              <br />
              &emsp;&emsp;In short, we want independence, yes, but also{" "}
              <i>interdependence.</i>
              <br />
              <br />
              <ul className="list-disc">
                <li className="ml-8">
                  True interoperability and the resulting ability to pave our
                  own desire paths
                </li>
                <li className="ml-8">
                  Hard and soft norms of mutualism, reciprocity, and collective
                  ownership
                </li>
              </ul>
              <br />
              <br />
            </p>
            <li className="font-bold">
              <h2 className="ml-8">Software</h2>
            </li>
            The medium is the message / the poetics of infrastructure. The tools
            we used (look to @cryptowanderer’s talk on this & the importance of
            tools) Ability to fork easily / build a different UI on top of the
            same blocks that we use Signing There are also a few other hidden
            Easter eggs in the design decisions - let us know if you discover
            them.
            <li className="font-bold">
              <h2 className="ml-8">Authorship</h2>
            </li>
            This work was in some ways a microcosm of the difficulty of
            collective, plural work - recognition is difficult especially given
            Shapley values and the multidimensional nature of contribution. We
            collapse all these things in an attempt to create some legible rank
            ordering of authorship. Recognition is difficult because it is
            multidimensional Writing, editing (the latter especially is
            ephemeral) Intellectual / thought partnership. We owe intellectual
            debts, for example, to @cryptowanderer. Organizing / PM Engineering
            Diff temporal commitments (e.g. hint at larger body of written /
            software work that is to come here)
          </ol>
        </div>
      </div>
    </div>
  );
}
