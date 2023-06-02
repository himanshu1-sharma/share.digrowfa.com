import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image';
import styles from '../../../styles/BMC.module.css'
import Accordion from 'react-bootstrap/Accordion';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Scrollbar } from "swiper";
import ReactPlayer from 'react-player'
import { NextSeo } from 'next-seo'
import fetch from 'isomorphic-unfetch'
import NoSSR from 'react-no-ssr';




function Usercard({ data }) {

    const [cardData, setCardData] = useState(data.data)
    const [active, setActive] = useState(false);
    const [isActive, setIsActive] = useState("false")
    const [productActive, setProductActive] = useState(false)
    const [selectProduct, setSelectProduct] = useState()
    const [serviceActive, setServiceActive] = useState(false)
    const [selectService, setSelectService] = useState()
    const handleModal = () => {
        setIsActive(!isActive)
    }
    const handleProduct = (e) => {
        setSelectProduct(e)
        setProductActive(true)
    }
    const closeProductSlide = () => {
        setProductActive(false)
    }

    const handleService = (e) => {
        setSelectService(e)
        setServiceActive(true)
    }
    const closeServiceSlide = () => {
        setServiceActive(false)
    }

    const [copied, setCopied] = useState(false);
    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }


    console.log("cardData", cardData)
    const title = cardData?.user?.name;
    const description = cardData?.user?.about;
    const pageURL = `https://www.groonli.online/BMC/usercard/${cardData?.user?._id}`
    console.log("title", title)
    const imgUrl = cardData?.user?.profilepic;

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={pageURL}
                openGraph={{
                    url: pageURL,
                    title: `${title}`,
                    description: `${description}`,
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
                    siteName: 'bizsapp.co.in',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'BMC',
                }}
            />


            {/* <Head>
                <title>{cardData?.user.name}</title>
                <meta name="title" content={cardData?.user.name} />
                <meta name="description" content={cardData?.user.about} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageURL} />
                <meta property="og:title" content={cardData?.user.name} />
                <meta property="og:description" content={cardData?.user.about} />
                <meta property="og:image" content={cardData?.user.profilepic} />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={pageURL} />
                <meta property="twitter:title" content={cardData?.user.name} />
                <meta property="twitter:description" content={cardData?.user.about} />
                <meta property="twitter:image" content={cardData?.user.profilepic} />
            </Head> */}
            <NoSSR>
                <div className='container' rehydrateOnClient={false}>
                    <div className='row'>
                        <div className='col-xl-6 col-lg-6'>

                        </div>
                        <div className='col-xl-6 col-lg-6'>
                            <div className={styles.bmc_box} key={cardData._id}>
                                <div className={styles.flip_card}>
                                    <div className={active ? `${styles.cardBox} ${styles.active}` : `${styles.cardBox}`}>
                                        <div className={`${styles.card__face} ${styles.card__face_front}`} style={{ backgroundImage: `linear-gradient(to top, #${cardData?.theme?.dark} , #${cardData?.theme?.light})` }}>
                                            <div className={styles.cardFrontContent}>
                                                <div className={styles.cardName}>
                                                    Business Management Card
                                                    {/* <div className={styles.cardShareBtn}>
                                                        <Image src="/image/BMC/share.png" alt="share" width={30} height={30} className='img-fluid' data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" />
                                                    </div> */}
                                                </div>
                                                <div className={styles.forntProfileBox}>
                                                    <div className={styles.companyLogo}>
                                                        <img src={cardData?.user?.profilepic} alt={cardData?.user?.name} className="img-fluid" />
                                                    </div>
                                                    <div className={styles.companyName}>
                                                        <h1>{cardData?.user?.name}</h1>
                                                    </div>
                                                    <div className={styles.designationName}>
                                                        <p>({cardData?.user?.title})</p>
                                                    </div>
                                                </div>
                                                <div className="catalogBox">
                                                    <Accordion defaultActiveKey="1">
                                                        {cardData?.about ?
                                                            <Accordion.Item eventKey="0">
                                                                <Accordion.Header>About</Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className={`${styles.dateTimeContent} ${styles.aboutUser}`}>
                                                                        {cardData?.user?.about}
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            :
                                                            ""
                                                        }
                                                        {cardData?.products ?
                                                            <Accordion.Item eventKey="1">
                                                                <Accordion.Header>Our Products</Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className="productSlider">
                                                                        <Swiper
                                                                            slidesPerView={"auto"}
                                                                            spaceBetween={20}
                                                                            className="productSlider"
                                                                        >
                                                                            {cardData?.products && cardData?.products?.map((curElt) => {
                                                                                return (
                                                                                    <>
                                                                                        <SwiperSlide>
                                                                                            <div className="prouctSliderBox" >
                                                                                                <div className="productImg">
                                                                                                    {curElt.image1 ?
                                                                                                        (
                                                                                                            <div className="productImgBox" style={{ backgroundImage: `url(${curElt.image1?.location})` }} onClick={() => handleProduct(curElt)}></div>
                                                                                                        )
                                                                                                        :
                                                                                                        ""

                                                                                                    }
                                                                                                </div>
                                                                                                <div className="productPrice">
                                                                                                    <p>₹{curElt?.price}</p>
                                                                                                </div>
                                                                                                <div className="productName">
                                                                                                    <p>{curElt.title}</p>
                                                                                                </div>

                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    </>
                                                                                )
                                                                            })}
                                                                        </Swiper>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            : ""}

                                                        {cardData?.services ?
                                                            <Accordion.Item eventKey="2">
                                                                <Accordion.Header>Our Services</Accordion.Header>
                                                                <Accordion.Body>
                                                                    <div className='productSlider'>
                                                                        <Swiper
                                                                            slidesPerView={"auto"}
                                                                            spaceBetween={20}
                                                                            className="serviceSlider"
                                                                        >
                                                                            {cardData?.services && cardData?.services?.map((curElt) => {
                                                                                return (
                                                                                    <>
                                                                                        <SwiperSlide>
                                                                                            <div className="prouctSliderBox service" >
                                                                                                <div className="productImg">
                                                                                                    {curElt?.image1 ?

                                                                                                        <div className='productImgBox' style={{ backgroundImage: `url(${curElt?.image1.location})` }} onClick={() => handleService(curElt)}></div>

                                                                                                        :

                                                                                                        ""

                                                                                                    }

                                                                                                </div>

                                                                                                <div className="productName">
                                                                                                    <p>I will design beautiful logo, blog header I will design beautiful logo, blog header</p>
                                                                                                </div>
                                                                                                <div className='productPrice'>
                                                                                                    <p><span>From</span> ₹{curElt?.price}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </SwiperSlide>
                                                                                    </>
                                                                                )
                                                                            })}
                                                                        </Swiper>
                                                                    </div>
                                                                </Accordion.Body>
                                                            </Accordion.Item>
                                                            : ""}
                                                    </Accordion>
                                                </div>

                                                <div className={styles.bottomButtonBox}>
                                                    <ul>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <a href={`https://wa.me/${cardData?.contacts[1]?.contactNumber}?text=Hello ${cardData?.brandName}`}>
                                                                    <Image src="/image/BMC/whatsapp.png" alt="whatsapp" width={16} height={15} className='img-fluid' />
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <a href={`tel:${cardData?.contacts[0]?.contactNumber}`}>
                                                                    <Image src="/image/BMC/phone.png" alt="phone" width={16} height={15} className='img-fluid' />
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <Image src="/image/BMC/link.png" alt="link" width={16} height={15} className='img-fluid' />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <a href={``}>
                                                                    <Image src="/image/BMC/bizsicon.png" alt="bizsicon" width={16} height={15} className='img-fluid' />
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox} onClick={() => setActive(!active)}>
                                                                <Image src="/image/BMC/next.png" alt="next" width={10} height={17} className='img-fluid' />
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className={!isActive ? "shareModalBoxOpen" : "null"}>
                                                <div className={`${styles.iconBox} openShareModal`} onClick={handleModal}>
                                                    <Image src="/image/BMC/link.png" alt="link" width={16} height={16} className='img-fluid' />
                                                    <Image src="/image/BMC/close.png" alt="close" width={16} height={16} className='img-fluid' />
                                                </div>
                                                <div className="shareModalBox">
                                                    <ul>
                                                        <li>
                                                            <a href="#">

                                                                <Image src="/image/BMC/bizsicon.png" alt="arow" width={24} height={24} className='img-fluid' />

                                                            </a>
                                                        </li>
                                                        {cardData?.socialLinks && cardData?.socialLinks?.map((curElt) => {
                                                            return (
                                                                <>
                                                                    {curElt.socialLinkType === "Facebook" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>
                                                                                <Image src="/image/BMC/Facebook.png" alt="Facebook" width={24} height={24} className='img-fluid' />
                                                                                Facebook
                                                                            </a>
                                                                        </li>

                                                                    }
                                                                    {curElt.socialLinkType === "Instagram" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>

                                                                                <Image src="/image/BMC/Instagram.png" alt="Instagram" width={24} height={24} className='img-fluid' />
                                                                                Instagram

                                                                            </a>
                                                                        </li>
                                                                    }
                                                                    {curElt.socialLinkType === "Youtube" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>

                                                                                <Image src="/image/BMC/Youtube.png" alt="Youtube" width={24} height={24} className='img-fluid' />
                                                                                YouTube

                                                                            </a>
                                                                        </li>
                                                                    }
                                                                    {curElt.socialLinkType === "LinkedIn" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>

                                                                                <Image src="/image/BMC/LinkedIn.png" alt="LinkedIn" width={24} height={24} className='img-fluid' />
                                                                                Linkedin

                                                                            </a>
                                                                        </li>

                                                                    }
                                                                    {curElt.socialLinkType === "Twitter" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>
                                                                                <Image src="/image/BMC/Twitter.png" alt="Twitter" width={24} height={24} className='img-fluid' />
                                                                                Twitter
                                                                            </a>
                                                                        </li>
                                                                    }
                                                                </>
                                                            )
                                                        })}
                                                        {cardData?.websiteLink &&

                                                            <li>
                                                                <a href={cardData?.websiteLink}>
                                                                    <Image src="/image/BMC/Web.png" alt="Web" width={24} height={24} className='img-fluid' />
                                                                    Website
                                                                </a>
                                                            </li>

                                                        }
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={`${styles.card__face} ${styles.card__face_back}`} style={{ backgroundImage: `linear-gradient(to top, #${cardData?.theme?.dark} , #${cardData?.theme?.light})` }}>
                                            <div className={styles.cardBackContent}>
                                                <div className={styles.cardName}>
                                                    Business Management Card
                                                </div>
                                                <div className={styles.cardVideoBox}>
                                                    <div className="cardVideo">
                                                        <ReactPlayer
                                                            url={cardData?.brandVideo?.link}
                                                            controls
                                                            config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                                            onContextMenu={(e) => e.preventDefault()}

                                                        />

                                                        <div className={styles.cardVideoTitle}>
                                                            {cardData?.brandVideo?.videoTitle}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.cardDateTimeBox}>
                                                    <div className={styles.cardDataTime}>
                                                        <h2>Day & Time</h2>
                                                        <div className={styles.dateTimeContent}>
                                                            <h4>{cardData?.businessTiming}</h4>
                                                            <ul>
                                                                {cardData?.businessDays.includes('monday') ?

                                                                    (
                                                                        <>
                                                                            <li><p>MO</p></li>
                                                                        </>
                                                                    )

                                                                    :

                                                                    (
                                                                        <>
                                                                            <li className={styles.disable}><p>MO</p></li>
                                                                        </>
                                                                    )

                                                                }

                                                                {cardData?.businessDays.includes('tuesday') ?

                                                                    (
                                                                        <>
                                                                            <li><p>TU</p></li>
                                                                        </>
                                                                    )

                                                                    :

                                                                    (
                                                                        <>
                                                                            <li className={styles.disable}><p>TU</p></li>
                                                                        </>
                                                                    )

                                                                }

                                                                {cardData?.businessDays.includes('wednesday') ?

                                                                    (
                                                                        <>
                                                                            <li><p>WE</p></li>
                                                                        </>
                                                                    )

                                                                    :

                                                                    (
                                                                        <>
                                                                            <li className={styles.disable}><p>WE</p></li>
                                                                        </>
                                                                    )

                                                                }


                                                                {cardData?.businessDays.includes('thursday') ?

                                                                    (
                                                                        <>
                                                                            <li><p>TH</p></li>
                                                                        </>
                                                                    )

                                                                    :

                                                                    (
                                                                        <>
                                                                            <li className={styles.disable}><p>TH</p></li>
                                                                        </>
                                                                    )

                                                                }

                                                                {cardData?.businessDays.includes('friday') ?

                                                                    (
                                                                        <>
                                                                            <li><p>FR</p></li>
                                                                        </>
                                                                    )

                                                                    :

                                                                    (
                                                                        <>
                                                                            <li className={styles.disable}><p>FR</p></li>
                                                                        </>
                                                                    )

                                                                }

                                                                {cardData?.businessDays.includes('saturday') ?

                                                                    (
                                                                        <>
                                                                            <li><p>SA</p></li>
                                                                        </>
                                                                    )

                                                                    :

                                                                    (
                                                                        <>
                                                                            <li className={styles.disable}><p>SA</p></li>
                                                                        </>
                                                                    )

                                                                }

                                                                {cardData?.businessDays.includes('sunday') ?

                                                                    (
                                                                        <>
                                                                            <li><p>SU</p></li>
                                                                        </>
                                                                    )

                                                                    :

                                                                    (
                                                                        <>
                                                                            <li className={styles.disable}><p>SU</p></li>
                                                                        </>
                                                                    )

                                                                }

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.cardAddress}>
                                                    <div className={styles.cardDataTime}>
                                                        <h2>Address</h2>
                                                        <div className={styles.dateTimeContent}>
                                                            <p>{cardData?.address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.bottomButtonBox}>
                                                    <ul>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <a href={`https://wa.me/${cardData?.contacts[1]?.contactNumber}?text=Hello ${cardData?.brandName}`}>
                                                                    <Image src="/image/BMC/whatsapp.png" alt="whatsapp" width={16} height={15} className='img-fluid' />
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <a href={`tel:${cardData?.contacts[0]?.contactNumber}`}>
                                                                    <Image src="/image/BMC/phone.png" alt="phone" width={16} height={15} className='img-fluid' />
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <Image src="/image/BMC/link.png" alt="link" width={16} height={15} className='img-fluid' />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox}>
                                                                <a href={``}>
                                                                    <Image src="/image/BMC/bizsicon.png" alt="bizsicon" width={16} height={15} className='img-fluid' />
                                                                </a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className={styles.iconBox} onClick={() => setActive(!active)}>
                                                                <Image src="/image/BMC/back.png" alt="back" width={10} height={17} className='img-fluid' />
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className={!isActive ? "shareModalBoxOpen" : "null"}>
                                                <div className={`${styles.iconBox} openShareModal`} onClick={handleModal}>
                                                    <Image src="/image/BMC/link.png" alt="link" width={16} height={16} className='img-fluid' />
                                                    <Image src="/image/BMC/close.png" alt="close" width={16} height={16} className='img-fluid' />
                                                </div>
                                                <div className="shareModalBox">
                                                    <ul>
                                                        <li>
                                                            <a href="#">

                                                                <Image src="/image/BMC/bizsicon.png" alt="arow" width={24} height={24} className='img-fluid' />

                                                            </a>
                                                        </li>
                                                        {cardData?.socialLinks && cardData?.socialLinks?.map((curElt) => {
                                                            return (
                                                                <>
                                                                    {curElt.socialLinkType === "Facebook" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>
                                                                                <Image src="/image/BMC/Facebook.png" alt="Facebook" width={24} height={24} className='img-fluid' />
                                                                                Facebook
                                                                            </a>
                                                                        </li>

                                                                    }
                                                                    {curElt.socialLinkType === "Instagram" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>

                                                                                <Image src="/image/BMC/Instagram.png" alt="Instagram" width={24} height={24} className='img-fluid' />
                                                                                Instagram

                                                                            </a>
                                                                        </li>
                                                                    }
                                                                    {curElt.socialLinkType === "Youtube" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>

                                                                                <Image src="/image/BMC/Youtube.png" alt="Youtube" width={24} height={24} className='img-fluid' />
                                                                                YouTube

                                                                            </a>
                                                                        </li>
                                                                    }
                                                                    {curElt.socialLinkType === "LinkedIn" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>

                                                                                <Image src="/image/BMC/LinkedIn.png" alt="LinkedIn" width={24} height={24} className='img-fluid' />
                                                                                Linkedin

                                                                            </a>
                                                                        </li>

                                                                    }
                                                                    {curElt.socialLinkType === "Twitter" &&
                                                                        <li key={curElt._id}>
                                                                            <a href={curElt.link}>
                                                                                <Image src="/image/BMC/Twitter.png" alt="Twitter" width={24} height={24} className='img-fluid' />
                                                                                Twitter
                                                                            </a>
                                                                        </li>
                                                                    }
                                                                </>
                                                            )
                                                        })}
                                                        {cardData?.websiteLink &&

                                                            <li>
                                                                <a href={cardData?.websiteLink}>
                                                                    <Image src="/image/BMC/Web.png" alt="Web" width={24} height={24} className='img-fluid' />
                                                                    Website
                                                                </a>
                                                            </li>

                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='card_share_modal'>
                                        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel" style={{ backgroundImage: `linear-gradient(to top, #${cardData?.theme?.dark} , #${cardData?.theme?.light})` }} >

                                            <div className="offcanvas-body small">
                                                <div className="share_card_content">
                                                    <h2>Share Via</h2>

                                                    <div className="share_media">
                                                        <ul>
                                                            <li>
                                                                <a onClick={copy}>
                                                                    <Image src="/image/BMC/shareIcon/copy.png" alt="copy_to_clipboard" width={35} height={35} />
                                                                    <div className="icon_name">{!copied ? "Copy to clipboard" : "Copied!"}</div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${pageURL}${cardData?.user?._id}`}>
                                                                    <Image src="/image/BMC/shareIcon/facebook.png" alt="facebook" width={35} height={35} />
                                                                    <div className="icon_name">
                                                                        Facebook
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href={`whatsapp://send?text=${pageURL}${cardData?.user?._id}`}>
                                                                    <Image src="/image/BMC/shareIcon/whatsapp.png" alt="whatsapp" width={35} height={35} />
                                                                    <div className="icon_name">
                                                                        Whatsapp
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href={`https://twitter.com/intent/tweet?url=${pageURL}${cardData?.user?._id}`}>
                                                                    <Image src="/image/BMC/shareIcon/twitter.png" alt="twitter" width={35} height={35} />
                                                                    <div className="icon_name">
                                                                        Twitter
                                                                    </div>
                                                                </a>
                                                            </li>

                                                            <li>
                                                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageURL}${cardData?.user?._id}`}>
                                                                    <Image src="/image/BMC/shareIcon/linkedin.png" alt="linkedin" width={35} height={35} />
                                                                    <div className="icon_name">
                                                                        Linkedin
                                                                    </div>
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href={`https://telegram.me/share/url?url=${pageURL}${cardData?.user?._id}`}>
                                                                    <Image src="/image/BMC/shareIcon/telegram.png" alt="telegram" width={35} height={35} />
                                                                    <div className="icon_name">
                                                                        Telegram
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='productDetailSlide'>
                                        <div className={productActive ? "productSlideBg active" : "productSlideBg"}>
                                            <div className='productSlideClose'>
                                                <Image src="/image/BMC/closeWhite.png" alt="closeIcon" width={22} height={22} className='img-fluid' onClick={closeProductSlide} />
                                            </div>
                                            <div className='productSlider productImgSlider'>

                                                <Swiper
                                                    slidesPerView={"auto"}
                                                    spaceBetween={10}
                                                    className="productImgSlider"
                                                    scrollbar={true}
                                                    modules={[Pagination, Scrollbar]}
                                                >
                                                    {selectProduct?.image1 ?

                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectProduct?.image1?.location})` }}></div>
                                                        </SwiperSlide>

                                                        :

                                                        ""
                                                    }

                                                    {selectProduct?.image2 ?

                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectProduct?.image2?.location})` }}></div>
                                                        </SwiperSlide>

                                                        :

                                                        ""
                                                    }

                                                    {selectProduct?.image3 ?

                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectProduct?.image3?.location})` }}></div>
                                                        </SwiperSlide>

                                                        :

                                                        ""
                                                    }

                                                    {selectProduct?.image4 ?

                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectProduct?.image4?.location})` }}></div>
                                                        </SwiperSlide>

                                                        :

                                                        ""
                                                    }

                                                    {selectProduct?.image5 ?

                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectProduct?.image5?.location})` }}></div>
                                                        </SwiperSlide>

                                                        :

                                                        ""
                                                    }
                                                </Swiper>
                                            </div>
                                            <div className='productImgSliderTitle'>
                                                {selectProduct?.title}
                                            </div>
                                            <div className='productImgSliderPrice'>
                                                <ul>
                                                    <li><span>₹{selectProduct?.price}</span></li>
                                                    <li>
                                                        <a href="#">
                                                            <img src={cardData?.brandLogo} alt={cardData?.brandName} className="img-fluid" />
                                                            <Image src="/image/icons/nextblue.png" alt="next" width={26} height={16} className="img-fluid" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className='productImgSliderDetail'>
                                                <Accordion>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Description</Accordion.Header>
                                                        <Accordion.Body>
                                                            {selectProduct?.description}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                    <Accordion.Item eventKey="1">
                                                        <Accordion.Header>Product details</Accordion.Header>
                                                        <Accordion.Body>
                                                            <ul>
                                                                {selectProduct?.detail && selectProduct?.detail.map((curPoint) => {
                                                                    return (
                                                                        <>
                                                                            <li>{curPoint}</li>
                                                                        </>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='serviceDetailSlide'>
                                        <div className={serviceActive ? "serviceSlideBg active" : "serviceSlideBg"}>
                                            <div className='productSlideClose'>
                                                <Image src="/image/BMC/closeWhite.png" alt="closeIcon" width={22} height={22} className='img-fluid' onClick={closeServiceSlide} />
                                            </div>
                                            <div className='productSlider serviceImgSlider'>
                                                <Swiper
                                                    slidesPerView={"auto"}
                                                    spaceBetween={10}
                                                    className="productImgSlider"
                                                    scrollbar={true}
                                                    modules={[Pagination, Scrollbar]}
                                                >
                                                    {selectService?.image1 ?
                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectService?.image1?.location})` }}></div>
                                                        </SwiperSlide>
                                                        :
                                                        ""
                                                    }

                                                    {selectService?.image2 ?
                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectService?.image2?.location})` }}></div>
                                                        </SwiperSlide>
                                                        :
                                                        ""
                                                    }

                                                    {selectService?.image3 ?
                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectService?.image3?.location})` }}></div>
                                                        </SwiperSlide>
                                                        :
                                                        ""
                                                    }

                                                    {selectService?.image4 ?
                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectService?.image4?.location})` }}></div>
                                                        </SwiperSlide>
                                                        :
                                                        ""
                                                    }

                                                    {selectService?.image5 ?
                                                        <SwiperSlide>
                                                            <div className="productSliderBox" style={{ backgroundImage: `url(${selectService?.image5?.location})` }}></div>
                                                        </SwiperSlide>
                                                        :
                                                        ""
                                                    }
                                                </Swiper>
                                            </div>
                                            <div className='productImgSliderTitle'>
                                                {selectService?.title}
                                            </div>
                                            <div className='productImgSliderDetail'>
                                                <Accordion>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Description</Accordion.Header>
                                                        <Accordion.Body>
                                                            {selectService?.description}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                            <div className='productImgSliderPrice mt-4'>
                                                <ul>
                                                    <li><small>From</small><span>₹{selectService?.price}</span></li>
                                                    <li>
                                                        <a href="#">
                                                            <img src={cardData?.brandLogo} alt={cardData?.brandName} className="img-fluid" />
                                                            <Image src="/image/icons/nextblue.png" alt="next" width={16} height={10} className="img-fluid" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </NoSSR>

        </>
    )
};





// export async function getServerSideProps({ params }) {
//     console.log(params.id)
//     const res = await fetch(`https://www.groonli.online/api/business/card/${params.id}`);
//     const data = await res.json();

//     return { props: { data } };


// }

export async function getServerSideProps(context) {
    const id = context.query.id;
    const res = await fetch(`https://www.groonli.online/api/business/card/${id}`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}


export default Usercard;