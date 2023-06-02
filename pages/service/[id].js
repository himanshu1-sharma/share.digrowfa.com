import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import styles from '../../styles/ShareProductService.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar } from "swiper";
import Accordion from 'react-bootstrap/Accordion';
import { NextSeo } from 'next-seo'
import fetch from 'isomorphic-unfetch'
import Navigation from '../Includes/Navigation/Navigation'
import DownloadButton from "../Includes/DownloadButton/DownloadButton"

export default function Product({ data }) {
    const [cardData, setCardData] = useState(data.data)
    console.log("cardData", cardData)
    const title = cardData?.title;
    const description = cardData?.description;
    const pageURL = `https://www.share.digrowfa.com/product/${cardData?._id}`
    const imgUrl = cardData?.image1?.location;
    const like = cardData?.likes.length
    const comment = cardData?.comments.length
    return (
        <>
            <NextSeo
                title={title}
                description={`${like} Likes ${comment} Comments - ${description}`}
                canonical={pageURL}
                openGraph={{
                    url: pageURL,
                    title: `${title}`,
                    description: `${like} Likes ${comment} Comments - ${description}`,
                    images: [
                        {
                            url: `${imgUrl}`,
                            width: 800,
                            height: 600,
                            alt: title,
                            type: 'image/jpeg',
                        },
                        {
                            url: `${imgUrl}`,
                            width: 900,
                            height: 800,
                            alt: title,
                            type: 'image/jpeg',
                        },
                        { url: `${imgUrl}` },
                        { url: `${imgUrl}` },
                    ],
                    siteName: 'share.digrowfa.com',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'Product',
                }}
            />
            <div className='shareNav'>
                <Navigation />
            </div>
            <section className='container-fluid p-0'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-xl-6 col-lg-6'>
                            <div className='shareMobileHide'>
                                <div class="userCard">
                                    <div class="userCardProfile">
                                        <img src={cardData?.user?.profilepic} alt={cardData?.brandName} className="img-fluid" />
                                    </div>
                                    <div class="userCardName">
                                        <h1>{cardData?.user?.name}</h1>
                                        <p>{cardData?.user?.username}</p>
                                    </div>
                                </div>
                                <div class="bmcProfileView">View Profile Only on Digrowfa Mobile App</div>
                                <div className='bmcFooter'>
                                    <h4>Download For iOS &amp; Android</h4>
                                </div>
                                <DownloadButton />
                            </div>
                        </div>
                        <div className='col-xl-6 col-lg-6'>
                            <div className={styles.shareBoxBg}>
                                <div className={styles.shareBox}>
                                    <div className={styles.shareBoxProfileBox}>
                                        <div className={styles.shareBoxProfile}>
                                            <div className={styles.shareBoxProfileImg}>
                                                <img src={cardData?.user?.profilepic} alt={cardData?.brandName} className="img-fluid" />
                                            </div>
                                            <div className={styles.shareBoxProfileContent}>
                                                <h4>{cardData?.user?.name}</h4>
                                                <p>{cardData?.user?.username}</p>
                                            </div>
                                        </div>
                                        <div className={styles.shareBoxProfileFollow}>
                                            <a href="#">follow</a>
                                        </div>
                                    </div>
                                    <div className='sharePageProductSlider service'>
                                        <Swiper
                                            slidesPerView={"auto"}
                                            spaceBetween={10}
                                            className="sharePageProductImgSlider"
                                            scrollbar={true}
                                            modules={[Pagination, Scrollbar]}
                                        >
                                            {cardData?.image1 ?

                                                <SwiperSlide>
                                                    <div className={`${`${styles.sharePageProductImgBox} ${styles.service}`} ${styles.service}`} style={{ backgroundImage: `url(${cardData?.image1?.location})` }}></div>
                                                </SwiperSlide>

                                                :

                                                ""

                                            }
                                            {cardData?.image2 ?

                                                <SwiperSlide>
                                                    <div className={`${styles.sharePageProductImgBox} ${styles.service}`} style={{ backgroundImage: `url(${cardData?.image2?.location})` }}></div>
                                                </SwiperSlide>

                                                :

                                                ""

                                            }
                                            {cardData?.image3 ?

                                                <SwiperSlide>
                                                    <div className={`${styles.sharePageProductImgBox} ${styles.service}`} style={{ backgroundImage: `url(${cardData?.image3?.location})` }}></div>
                                                </SwiperSlide>

                                                :

                                                ""

                                            }
                                            {cardData?.image4 ?

                                                <SwiperSlide>
                                                    <div className={`${styles.sharePageProductImgBox} ${styles.service}`} style={{ backgroundImage: `url(${cardData?.image4?.location})` }}></div>
                                                </SwiperSlide>

                                                :

                                                ""

                                            }
                                            {cardData?.image5 ?

                                                <SwiperSlide>
                                                    <div className={`${styles.sharePageProductImgBox} ${styles.service}`} style={{ backgroundImage: `url(${cardData?.image5?.location})` }}></div>
                                                </SwiperSlide>

                                                :

                                                ""

                                            }
                                        </Swiper>
                                    </div>
                                    <div className={styles.shareBoxContent}>
                                        <div className={styles.shareProductAction}>
                                            <ul>
                                                <a href="#">
                                                    <li>
                                                        <img src="/image/icons/like.png" alt="like" className='img-fluid' />
                                                        Like
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        <img src="/image/icons/shareIcon.png" alt="shareIcon" className='img-fluid' />
                                                        share
                                                    </li>
                                                </a>
                                                <a href="#">
                                                    <li>
                                                        <img src="/image/icons/save.png" alt="save" className='img-fluid' />
                                                        save
                                                    </li>
                                                </a>
                                            </ul>
                                        </div>
                                        <div className={styles.productImgSliderTitle}>
                                            {cardData?.title}
                                        </div>
                                        <div className='productImgSliderPrice white'>
                                            <ul>
                                                <li><span>₹{cardData?.price}</span></li>
                                                <li>
                                                    <a href="#">
                                                        <img src={cardData?.user?.profilepic} alt={cardData?.user?.name} className="img-fluid" />
                                                        <Image src="/image/icons/nextblue.png" alt="next" width={16} height={10} className="img-fluid" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='shareBoxContent productImgSliderDetail'>
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Description</Accordion.Header>
                                                    <Accordion.Body>
                                                        {cardData?.description}
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>Serice Details</Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            {cardData?.detail && cardData?.detail.map((curPoint) => {
                                                                if (curPoint.length >= 1) {
                                                                    return (
                                                                        <>
                                                                            <li>{curPoint}</li>
                                                                        </>
                                                                    )
                                                                }
                                                            })}
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
};


export async function getServerSideProps(context) {
    const id = context.query.id;
    console.log("id", id)
    const res = await fetch(`https://www.groonli.online/api/products/${id}`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}