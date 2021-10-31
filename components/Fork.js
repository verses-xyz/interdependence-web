import Arweave from 'arweave';

const declaration = `
    Closed fiefdoms of the Web2 world, you weary giants of stocks and small talk, I come from the Pluriverse, the new home of the heart. On behalf of the future, I invite you to join us in moving on from our shared past.

We have no single leader, nor are we likely to have one, so we address you with no greater authority than that with which the public itself always speaks. We declare the global social space we are building to be naturally independent of the monoliths you seek to impose on us. You have no moral right to our language nor do you possess any methods of enclosure we have true reason to fear.

Just power is derived from the consent of the governed. You have neither solicited nor received ours. We did not invite you. You do not know us, nor do you know our world. Our verse does not lie within your borders. Do not think that you can build it alone, as though it were a private project. You cannot. It is an act of nature and it grows itself through our collective actions.

You have not engaged in our great and gathering conversation, nor did you create the wealth of our relationships. You do not know our culture, our ethics, or the unwritten codes that already provide our society more order than could be obtained by any of your impositions.

You claim there are problems among us that you need to solve. You use this claim as an excuse to claim the vocabulary of our dreams. We will bow to no philosopher-kings, and we will not transcend politics through the construction of monopolies. We are forming our own definition of interoperability, one that does not just allow for portability of personal digital property, but one that requires building blocks that others can freely choose to traverse, shape, and use to build their own worlds. This governance will arise according to the conditions of our world, not yours. Our world is different.

Our Pluriverse is a new digital commons arrayed over the web of relationships that defines our world, one that does not transcend materiality but is rather deeply entangled with it. The Pluriverse is not a world of accumulation and enclosure, but a place of mutual prosperity and shared value, where the power to create is not synonymous with the power to exclude. We are building a world of shared abundance rather than artificial scarcity, a world where self-expression is best realized through interdependence and the positive sum of all our contributions.

Ours is a world in which all bodies might live. We are creating a world that all may enter, participate in, and create without privilege or prejudice accorded by gender, race, class, or station of birth.

Your concepts of property, expression, identity, value, and community are insufficient. They are based on matter, and there is no matter here.

We believe that from ethics, an expanded self-interest, and the commonwealth of EVM, our governance will emerge. Our identities may be distributed across many of your corporations. But the only law that all our constituent cultures generally recognize is the practice of reciprocity and mutualism, and the truth of openly verifiable relations and actions.

You have today claimed the Metaverse, which insults the dreams of past, present, and future citizens of the internet. You have trapped our creations within walled gardens, trafficked human connections for advertising dollars, and imposed a universalist value system onto our diverse cultures. These old dreams must now be born anew in us.

Your information industries perpetuate themselves in the name of freedom of speech, ignoring the importance of freedom of interaction, - the ability to chart our own paths, connect how we’d like, dissolve silos of speech and data into interoperable and self-sovereign worlds. In the Pluriverse, our minds and our creations can interact and interconnect freely.

These centralized, enclosing, extractive measures place us in the same position as those previous lovers of freedom and self-determination who rejected the dominion of unjust power. We must declare our virtual selves immune.

We will create a civilization of the Heart in the Pluriverse. May it be more humane than the world you are attempting to build.
`

async function createDeclaration(key, text) {
  const arweave = Arweave.init({});
  let transaction = await arweave.createTransaction({
    data: text
  }, key);
  transaction.addTag('interdependence_doc_type', 'declaration');
  await arweave.transactions.sign(transaction, key);
  console.log(transaction);

  const response = await arweave.transactions.post(transaction);
  console.log(response)
}

export default function Fork() {
  return (<button onClick={() => createDeclaration(undefined, declaration)}>Fork This</button>)
}