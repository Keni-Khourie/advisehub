import Image from 'next/image';
import Link from 'next/link';


const AdviseHubLogo = () => {
  return (
    <div>
        <Link href={"/dashboard"} className="cursor-pointer">
        <Image src="/advisehub-logo.png" alt="advisehub logo" width={500} height={500} className="w-12 cursor-pointer"/>
        </Link>
    </div>
  )
}

export default AdviseHubLogo