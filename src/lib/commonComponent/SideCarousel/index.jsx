import { Row, Col, Carousel, Typography } from 'antd';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import slideImg1 from '../../../assets/imgs/CarouselSlider1.svg';
import slideImg2 from '../../../assets/imgs/CarouselSlider2.svg';
import slideImg3 from '../../../assets/imgs/CarouselSlider3.svg';

export const CustomCarouselRow = styled(Row)`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

export const CustomCarouselCol = styled(Col)`
height: 80vh;
width: 42rem;
display: flex;
justify-content: center;
borde-radius: 9px;
background: linear-gradient(268deg, rgba(92, 225, 230, 0.10) 0%, rgba(237, 81, 12, 0.07) 100%);
box-shadow: 0px 0px 94px 0px rgba(234, 137, 51, 0.13) inset;
backdrop-filter: blur(3px);
margin-top:7rem;
`;

export const CustomCarouselBg = styled(Row)`
    width: 100%;
    flex-grow: 1;
    height: 100vh;
    display:'flex';
    alignItems:'center';
    justifyContent:'center;
`;

export const CustomTitleText = styled(Typography.Text)`
color: #2C2C2C;
font-size: 24px;
font-style: normal;
font-weight: 700;   
line-height: 111.1%;
`;

export const CustomText = styled(Typography.Text)`
color: #2C2C2C;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 170%; 
letter-spacing: 0.4px;
`;

const onChange = (currentSlide) => {
    // console.log(currentSlide);
};

const contentStyle = {
    display: 'flex',
    width: '241px',
    padding: '10px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '4px',
    marginTop:'50px',
};

const contentStyleCard1= {
    backgroundImage: `url('${slideImg1?.src}')`,
    width:"227px",
    height:"402px"
};
const contentStyleCard2= {
    backgroundImage: `url('${slideImg2?.src}')`,
    width:"227px",
    height:"402px"
};
const contentStyleCard3= {
    backgroundImage: `url('${slideImg3?.src}')`,
    width:"227px",
    height:"402px"
};

const CustomCarousel = () => {
    return (
        <>  
            <CustomCarouselRow>
                <CustomCarouselCol >
                    <Carousel autoplay style={{width:'18rem' }} afterChange={onChange}>
                        <div>
                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                                <Col style={contentStyle}>
                                    <CustomTitleText>Multiple vendors </CustomTitleText>
                                    <CustomText>Multiple vendors</CustomText>
                                </Col>
                                <Col style={contentStyleCard1} >
                                </Col>
                            </Row>
                        </div>
                        <div>
                            {/* <h3 style={contentStyle2}>Bizzz</h3> */}
                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                                <Col style={contentStyle}>
                                    <CustomTitleText>Avail Services </CustomTitleText>
                                    <CustomText>Multiple Services</CustomText>
                                </Col>
                                <Col style={contentStyleCard2}></Col>
                            </Row>
                        </div>
                        <div>
                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                                <Col style={contentStyle}>
                                    <CustomTitleText>Easy Calendar view</CustomTitleText>
                                    <CustomText>Multiple slots to choose </CustomText>
                                </Col>
                                <Col style={contentStyleCard3}></Col>
                            </Row>
                        </div>
                    </Carousel>
                </CustomCarouselCol>
            </CustomCarouselRow>
        </>
    )
}

export default CustomCarousel;