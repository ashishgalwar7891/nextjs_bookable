import { Row, Col, Carousel, Typography } from 'antd';
import CardImage from '../../../assets/imgs/Cards_Img.svg';
import { STORAGE_URL } from '@/Services/vendorService.services';

const onChange = (currentSlide) => {
    // console.log(currentSlide);
};

const CardsCarousel = ({ galleries }) => {
    // console.log("Card carousel Images ==>>", galleries);
    const imageUrl = galleries?.[0];
    // console.log("Card carousel Images ==>>", imageUrl);
    return (
      
             
      <Row> 
       
      <div style={{display: 'block', width: '100%', height: 500}}>
     
          <Carousel>

          <>
            <div>
                <Row style={{display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                    <Col style={{ backgroundImage: `url('${STORAGE_URL+'/images/'+imageUrl}')`, objectFit:'cover', minHeight:'600px', width:'100%', backgroundSize:"cover", backgroundRepeat:'no-repeat' }} ></Col>
                </Row>
             </div>
           </>


         </Carousel>

       </div>

     </Row> 



    )
}

export default CardsCarousel;