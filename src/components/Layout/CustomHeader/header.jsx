// import { Image } from "antd";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CustomHeader } from "./styledComponent";
import BookableBizLogo from '../../../assets/imgs/logo.png'

const Header = () => {
    const router = useRouter();

    const handleImageClick = () => {
        router.push('/');
    }

    return (
        <>
        <CustomHeader>
        <div className='testing' style={{height:'100%', display:'flex', alignItems:'center' }} >
            <Image
                src={BookableBizLogo}
                alt={'Brand Logo'}
                preview={"false"}
                style={{ height: '100%', cursor:'pointer' }}
                onClick={handleImageClick}
            />
        </div>
        </CustomHeader>
        </>
    )
}

export default Header;