// import { Image } from "antd";
import Image from 'next/image';
import { CustomHeader } from "./styledComponent";
import BookableBizLogo from '../../../assets/imgs/logo.png'
import { useState } from 'react';
import { useRouter , usePathname} from 'next/navigation';
import Router from "next/router";


const VendorHeader = () => {
    const router = useRouter();
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <CustomHeader>
                <div style={{height:'90%', display:'flex', alignItems:'center', padding:"0px 10px"}} >
                    <Image
                        src={BookableBizLogo}
                        onClick={() => router.push('/')}
                        alt={'Brand Logo'}
                        preview={"false"}
                        style={{ height: '100%', width:"230px", cursor:'pointer' }}
                    />
                </div>
            </CustomHeader>
        </>
    )
}

export default VendorHeader;