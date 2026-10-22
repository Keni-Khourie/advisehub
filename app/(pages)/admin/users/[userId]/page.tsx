
import UpdateUserContent from './UpdateUserContent';
interface Props {
  params: Promise<{
    userId: string;
  }>;
}
const SpecificUserPage = async({params}:Props) => {
    const {userId} = await params
  return (
    <div>
        <UpdateUserContent userId={parseInt(userId)}/>
    </div>
  )
}

export default SpecificUserPage