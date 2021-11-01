import Head from 'next/head'
import Image from 'next/image'
import Fork from "../components/Fork";

export default function About({ data, sigs, txId, status }) {

return (
    <Fork text={data} txId={txId} walletKey={""} />
)
}

