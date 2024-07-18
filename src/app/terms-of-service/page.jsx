"use client"
export const dynamic = 'force-dynamic';
import { Fragment } from 'react';
import { CiBellOn} from "react-icons/ci";
import { LuBookMarked } from "react-icons/lu";
import { TbRefresh, TbBook2 , TbDownload } from "react-icons/tb";
import { LiaSearchLocationSolid } from "react-icons/lia";
import { MdOutlineSecurityUpdateWarning, MdOutlineSell } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { GrUserManager } from "react-icons/gr";
import { FaLaptopCode } from "react-icons/fa";
import { UserOutlined, MailOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import './style.css'
const Index = () => {
    return (
        <Fragment>
            <div className="biz-policy">
                <div className="biz-container">
                    <h2 className="biz-top-heading">Terms of Service</h2>
                </div>
            </div>
            <div className="biz-container about-section">
                <p>The Services (as defined herein) and Terms of Use are provided by Bookablebiz.
            ANY USERS WHO DO NOT AGREE WITH THESE TERMS OF USE SHOULD NOT USE THE SERVICES. THIS 
            AGREEMENT CONTAINS, AMONG OTHER THINGS, AN ARBITRATION CONTAINING A CLASS ACTION 
            WAIVER.</p>
            <section>
                <h2 className="first_toffle">Part 1 – Definitions, Agreement to be Bound</h2>
                <details>
                    <summary>1.1 Definitions.</summary>
                    <ul>
                        <li> References to the “Booking Services” or “Services” mean those appointment-scheduling services made available by us through the Bookablebiz Platform.
                        </li>
                        <li> References to the “Bookablebiz Platform” mean any mobile, web, or software platform related to the Services designed, developed, and/or made available by us online and/or available through, as and when available, the iTunes and Google Play stores as well as other third-party services as applicable.
                        </li>
                        <li> References to the “Bookablebiz Site” mean the Web site bearing the URL  https://www.bookablebiz.com and all affiliated websites owned and operated by Bookablebiz, our subsidiaries, and related companies.
                        </li>
                        <li> References to the “Commercial Content” mean content which advertises or promotes a commercial product or service.
                        </li>
                        <li> Reference to “Payment Services” mean all services handled by our payment processor that we 
                        partner to handle and process all payments for “Services” including User payment of subscriptions, 
                        booked services, prepayment for booked services or appointments, processing of cancellation 
                        refunds, funds deposit to applicable User and Bookablebiz accounts, including charges to user credit 
                        cards and all other payment processing and refund handling matters.
                        </li>
                        <li> References to a “Customer” mean any person or entity who uses the Bookablebiz Platform Bookablebiz Site, or a Third-Party Platform as defined in Section 3.8 to schedule an appointment, manage appointments, browse bookable services and related content and services, and/or pay for services rendered, whether said individual registers directly for the use of the Bookablebiz Platformor is added by a Vendor through whom Customer obtains services.
                        </li>
                        <li> References to “Dispute” mean any claim, conflict, controversy, or disagreement between the Parties arising out of, or related in any way to, these Terms (or any Terms, supplement or amendment contemplated by these Terms,) including, without limitation, any action in tort, contract, or otherwise, at equity or at law, or any alleged breach, including, without limitation any matter with respect to the meaning, effect, validity, performance, termination, interpretation, or enforcement of these Terms or any terms contemplated by the Terms.
                        </li>
                        <li> References to “Material Breach” mean any breach of these Terms upon the occurrence of which a reasonable person in the position of the non-breaching party would wish to immediately terminate these Terms because of that breach.
                        </li>

                        <li> References to the “Services” mean, collectively, any and all services offered by us, including but not limited to (1) the Bookablebiz Site, (2) the Bookablebiz Platform, (3) the Payment Services, (4) and any other services or features made available by Bookablebiz through the Bookablebiz Site, Payment Services, or Bookablebiz Platform.
                        </li>

                        <li> References to a “Vendor” mean a small or medium business and seller of goods, services, or products who use the Services to allow Customers to book, manage, view, and cancel appointments.
                        </li>

                        <li> References to the “Terms”, “Terms of Use” and/or “Agreement,” mean these terms as set forth herein.
                        </li>

                        <li> References to “us,” “we,” “our,” and/or “Bookablebiz,” refer to Bookablebiz Pte Ltd, business  registration UEN ________________, at registered business address 8 Temasek Boulevard, Suntec Tower 3, #42-01, Singapore 038968, and all its designated agents, employees, and subsidiaries
                        </li>
                        <li> References to “you,” and/or “User” mean the User of the Services, whether as a Vendor or Customer.
                        </li>
                    </ul>
                </details>
                <details>
                    <summary>1.2. Agreement to be Bound.</summary>
                        <ul>
                            <li> The following Terms of Use, together with the relevant information set out on the Services, including any features and services available, are subject to the Terms of Use set forth below. Please read them carefully as any use of the Services, whether directly through us or via a Third- Party Platform, constitutes an agreement, without acceptance, to be bound thereby by the User.  
                            </li>
                            <li> By accessing or using the Services or clicking “accept” or “agree” to this Agreement, you represent (1) that you are at least eighteen (18) years old (and in some jurisdictions twenty-one (21) years old), (2) are not prohibited by law from accessing or using the Services, (3) you have read, understand, and agree to be bound by this Agreement, and (4) you have authority to register a Vendor and act on its behalf.
                            </li>
                            <li> These Terms of Use are subject to the Privacy Policy, which also governs your use of the Services. Our Privacy Policy is available here: https://Bookablebiz.com/privacy. In addition, each Vendor and ThirdParty Platform shall have his, her, or its own Terms of Use, which bind all Customer/Vendor transactions.
                            </li>
                            <li> The Parties acknowledge and agree that each Vendor, Customer, Third-Party Platform, subsidiary, parent, and affiliate of us shall be a third-party beneficiary to the Terms of Use and that such other persons and/or companies shall be entitled to directly enforce and rely upon any provision of these Terms of Use which confers a benefit upon them. No other parties shall be third party beneficiaries to these Terms of Use.
                            </li>
                        </ul>
                </details>
                <h2>Part II – General Provisions.</h2>
                <details>
                    <summary> 2.1. About Us; Bookablebiz not Vendor; No Endorsement. </summary>
                    <ul>
                        <li> At its core, Bookablebiz acts as a software as a service to allow its Users to book, manage, view, and cancel appointments. In addition, the Bookablebiz Platform and all related Bookablebiz Services allow Users to browse, view, and review content and potential service providers for various bookable services and appointments offered by Vendors. 
                        </li>

                        <li> Bookablebiz does NOT have control over (1) the quality, safety, morality or legality of any aspect of any Services offered by Vendors using our Services, (2) the truth or accuracy of the listings or directory information provided to us by Vendors, (3) the timeliness or accuracy of any Vendor appointment calendar, (4) the ability of Vendors to provide Services booked, (5) the identity of any Vendor or Customer, or (6) the ability of Customers to pay for Services.  
                        </li>

                        <li> We do NOT and CANNOT ensure that a Vendor or Customer will actually complete a transaction. If you rely on any of the information provided by or on the Services, you do so solely at your own risk.
                        </li>

                        <li> You acknowledge and agree that we as Bookablebiz do not sell or purchase, offer to sell or purchase, invite to sell or purchase, or make or solicit any offers. IN ALL INSTANCES EXCEPT WHERE NOTED, ALL SALES AND SERVICES ARE ADVERTISED, SOLICITED, OFFERED, ACCEPTED, MADE, AND DELIVERED BY VENDORS WITH WHOM A CUSTOMER DIRECTLY CONTRACTS. AT NO TIME WILL A CUSTOMER/MERCHANT RELATIONSHIP EXIST BETWEEN BOOKABLEBIZ EXCEPT AS EXPLICITLY NOTED.
                        </li>

                        <li> In all instances, any solicitation, invitation, offer, advertisement or communication is void where prohibited by law.
                        </li>
                    </ul>
                </details>

                <details>
                    <summary>2.2. Accuracy, Completeness, and Timeliness of Information.</summary>
                    <ul>
                        <li> WE ARE NOT RESPONSIBLE IF INFORMATION MADE AVAILABLE ON THE SERVICES IS NOT ACCURATE, COMPLETE, OR CURRENT, INCLUDING BUT NOT LIMITED TO THE CORPORATE INFORMATION OF A VENDOR, CALENDAR AVAILABILITY, AND BOOKINGS MADE.
                        </li>
                    </ul>
                </details>

                <details>
                    <summary>2.3. Errors in the Services.</summary>

                    <ul>
                        <li> If you encounter any error in the service, let us know at Vendorhelp@Bookablebiz.com (if you are Vendor) or Support@Bookablebiz.com (if you are CUSTOMER). We do not warrant that any errors in the Services will be corrected.
                        </li>
                    </ul>
                </details>

                <details>
                    <summary>2.4. Modifications and Changes to Terms of Use.</summary>
                    <ul>
                        <li>Bookablebiz may update or revise this Agreement (including any Bookablebiz Policies) from time to time at its sole discretion and without limitation upon notice of the same via posting to the Services and/or the emailing of a notice to our registered Users. </li>

                        <li>You agree that you will review this Agreement periodically. You are free to decide whether or not to accept a modified version of this Agreement, but accepting this Agreement, as modified, is required for you to continue using the Services. You may have to click “accept” or “agree” to show your acceptance of any modified version of this Agreement. If you do not agree to the terms of this Agreement or any modified version of this Agreement, your sole recourse is to terminate your use of the Services, in which case you will no longer have access to your Account or Vendor Account (as defined below). Except as otherwise expressly stated by Bookablebiz, any use of the Services (e.g., the use of the Booking Services or the Payment Services) is subject to the version of this Agreement in effect at the time of use.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.5. Modifications and Changes to the Services.</summary>

                    <ul>
                        <li>We may modify, add to, suspend, or delete any aspect of the Services, in whole or in part, at our sole discretion at any time, with such modifications, additions, or deletions being immediately effective. Such modifications, additions, or deletions may include but are not limited to content offered, hours of availability, and equipment needed for access or use. If you do not agree to such modifications to the Services, your sole recourse is to terminate your use of the Services, in which case you will no longer have access to your Account or Vendor Account (as defined below). Except as otherwise expressly stated by Bookablebiz, any use of the Services (e.g., the use of the Booking Services or the Payment Services) is subject to the version of this Agreement in effect at the time of use.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.6. Access to Web site or the Services.</summary>
                    <ul>
                    <li>Though we try to make the Services available twenty-four (24) hours a day, seven (7) days a week, except for planned down-time for maintenance, we do not warrant that the Services will be at all times available</li>

                    <li>Use of the Services requires Internet access through your computer, mobile device, tablet or other internet-accessible device as allowed by Bookablebiz. You are responsible for all mobile carrier charges resulting from your use of the Services, including from any notifications provided by the Services. Bookablebiz does not guarantee that the Services will be compatible with all devices or will be supported by all mobile carriers. You may be required to have JavaScript (or similar technologies) enabled to use the Bookablebiz Site, and some features and portions of the Services (including, but not limited to, making, modifying, or cancelling appointments) may not be accessible with JavaScript disabled.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.7. Right of Refusal, Limitation, Discontinuation, and Termination.</summary>
                    <ul>
                        <li>We reserve the right to refuse to provide access to the Services for any reason at any time in our sole and exclusive discretion. We may, in our sole and exclusive discretion, limit or cancel an Account or a Vendor Account (as defined below) for any reason whatsoever. </li>

                        <li>In the event that we make a change to or cancel an Account or a Vendor Account (as defined below,) we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time your Account or Vendor Account (as defined below) was created; however, the failure to do so shall not result in any liability, including liability for lost data deleted as a result of the Account or Vendor Account (as defined below) termination.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.8. Prohibited Uses of the Services.</summary>
                    <ul>
                        <li>In addition to the other restrictions on use set forth herein, you agree and acknowledge that you shall not use the Services: </li>

                        <li>(a) for any unlawful purpose; (b) to solicit Users to perform or participate in any unlawful acts or to engage in acts that are unrelated to the purpose(s) of the Services; (c) to violate any international or governmental regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Services; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; (k) to interfere with or circumvent the security features of the Services; (l) take any action that imposes or may impose (in Bookablebiz’ sole determination) an unreasonable or disproportionately large load on the Services or Bookablebiz’ infrastructure; (m) rent, lease, copy, provide access to or sublicense any portion of the Services or Bookablebiz Materials (as defined below) to a third party; (n) use any portion of the Services or Bookablebiz Materials (as defined below) to provide, or incorporate any portion of the Services or Bookablebiz Materials (as defined below) into, any product or service provided to a third party; (o) reverse engineer, decompile, disassemble, or otherwise seek to obtain the source code or non-public APIs to theServices, except to the extent expressly permitted by applicable law (and then only upon advance notice to Bookablebiz); (p) modify any Services or Bookablebiz Materials (as defined below) or create any derivative product from any of the foregoing; (q) remove or obscure any proprietary or other notices contained in the Services or Bookablebiz Materials (as defined below); or (r) publicly disseminate information regarding the performance of the Services or Bookablebiz Materials (as defined below) or access or use the Services or Bookablebiz Materials (as defined below) for competitive analysis or benchmarking purposes. </li>

                        <li>We reserve the right to terminate your use of the Services for violating any of the prohibited uses or for any other reason in our sole and exclusive decision.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.9. Communications Systems and Authorization to Contact You; Pop- out Information; Recording Calls; Analysing Your Messages and other Content.</summary>
                    <ul>
                        <li>The Bookablebiz Platform may use GPS locator capabilities to identify your current location. If you decide to provide a mobile phone number and you check the relevant consent box when logged in to your Customer account, you hereby represent that you are aware that you will receive and you expressly consent to receive communication that includes SMS text messages, phone calls, emails, push notifications, in- app communications, and Web-based browser technology containing Commercial Content, such as Web beacons and or other chatbot Platforms from Bookablebiz regarding the Services and as otherwise described in our Privacy Policy as applicable. You may be charged for such communications pursuant to your carrier contract. Additionally, by providing your contact information and/or connecting related accounts, you provide access and consent for Bookablebiz to communicate with you via voice assistants as and when available, such as Siri, Alexa, and Google home or any other similar voice services.</li>

                        <li>If you do not wish to receive communications as specified above, you may change your communications preference (including withdrawal of your consent to obtain said communications) at any time, including through the communications preferences section of your account. </li>

                        <li>Bookablebiz may, without further notice or warning and in its sole discretion, monitor or record telephone conversations you or anyone acting on your behalf has with Bookablebiz or its agents for quality control and training purposes, or for its own protection.</li>

                        <li>When available, Bookablebiz automated systems may scan and analyse the contents of every message sent through its messages platform, including messages between users, to detect and prevent fraudulent activity or violations of Bookablebiz User Agreement, including the incorporated terms, notices, rules, and policies. This scanning and analysis may occur before, during, or after the message is sent, or while in storage, and may result in your message being delayed or withheld. Bookablebiz may store message contents, including to conduct this scanning and analysis.</li>

                        <li>Any personal information provided by you to Bookablebiz or collected by Bookablebiz and referred to above will be stored and processed by Bookablebiz in accordance with our Privacy Policy.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.10. Privacy of Others; Marketing.</summary>
                    <ul>
                        <li>If it is legally necessary for Bookablebiz to provide you with information about another User, whether Customer or Vendor, you absolutely agree that you will use the information only for the purposes that it is provided to you. You may not disclose, sell, rent, or distribute a User's information to a third party for purposes unrelated to the Services. Additionally, you may not use User information for marketing purposes, via electronic or other means, unless you obtain the consent of the specific User to do so.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.11. Government End Users.</summary>
                    <ul>
                        <li>If you are a Government End User, please consult with your relevant legal department prior to use to confirm your use is compliant with the standards and policies under the code of conduct for all government end users. </li>
                    </ul>
                </details>

                <details>
                    <summary>2.12. Export Control.</summary>
                    <ul>
                        <li>You may not use, export, or re-export any Bookablebiz Platform, Bookablebiz Site or other aspects of the Services (or any copy or adaptation of the foregoing) in violation of applicable laws of Singapore and laws of countries where Bookablebiz is established as an operating entity.</li>
                    </ul>
                </details>

                <details>
                    <summary>2.13. Fraudulent Actions of Users.</summary>
                    <ul>
                        <li>Bookablebiz is not liable for any losses relating to chargebacks, fraudulent charges, or other actions by any User that are deceptive, fraudulent, or otherwise invalid ("Fraudulent Actions"). By using the Services, you hereby release Bookablebiz from any liability arising from Fraudulent Actions. You willalso use best efforts to promptly notify us of any Fraudulent Actions which may affect the Services. </li>

                        <li>Bookablebiz reserves the right, in its sole discretion, to terminate the account of any User that engages in, or enables any other User to engage in, Fraudulent Actions.</li>
                    </ul>
                </details>
                <h2> Part III – Customer Accounts.</h2>
                <details>
                    <summary>3.1 Online Accounts.</summary>
                    <ul>
                        <li>Customers shall be given the opportunity to register via an online or mobile registration form to create a Customer account, (hereinafter your “My Account,”) that will allow you to receive information from us and/or to participate in certain features of the Services. </li>

                        <li>We will use the information you provide in accordance with our Privacy Policy. By registering with us, you represent and warrant that all information you provide on the registration form is current, complete, and accurate to the best of your knowledge. You agree to maintain and promptly update your registration information so that it remains current, complete, and accurate. During the registration process, you may be required to choose a password. You acknowledge and agree that we may rely on this password to identify you. You are responsible for all use of your Account, regardless of whether you authorized such access or use, and for ensuring that all use of your Account complies fully with the provisions of these Terms of Service. </li>

                        <li>Customer accounts may be cancelled online via My Account or via Support@Bookablebiz.com.</li>

                        <li>Vendor Accounts may only be cancelled via Vendorhelp@bookablebiz.com and only after verification that Vendor has fulfilled all its obligations with no outstanding liabilities to Customers and Bookablebiz.</li>

                    </ul>
                </details>
                <details>
                    <summary>3.2. Transfer Prohibited.</summary>
                    <ul>
                        <li>You agree that you shall not sell, trade, or transfer your Account to any other person or entity.</li>
                    </ul>
                </details>
                <details>
                    <summary>3.3. My Account Guidelines.</summary>
                    <ul>
                        <li>The Service may, as and when available, contain the ability to communicate with Vendors, other Users, Bookablebiz Support, Bookablebiz Vendorhelp , on booking forms, comments sections, discussion forums, Bookablebiz Site landing pages, and/or other available interactive features when available, (hereinafter "Interactive Areas,”) in which all parties may communicate. By participating in Interactive Areas, you agree and acknowledge that you:</li>

                        <li>(a) Shall not upload, distribute, or otherwise publish to the Services any libelous, defamatory, obscene, pornographic, abusive, or otherwise illegal material; and</li>

                        <li>(b) Shall not threaten or verbally abuse other Users, use defamatory language, or deliberately disrupt discussions with repetitive messages, meaningless messages or "spam”; and</li>

                        <li>(c) Shall not to use language that abuses or discriminates on the basis of race, religion, nationality, gender, sexual preference, age, region, disability, etc. Hate speech of any kind is grounds for immediate and permanent suspension of use of the Services; and</li>

                        <li>(d) Shall not personally attack another User or Vendors. Personal attacks are a direct violation of these Terms of Use and are grounds for immediate and permanent suspension of use of the Services; and</li>

                        <li>(e) Shall not use the Interactive Areas to distribute or otherwise publish any material containing any solicitation of funds, advertising or solicitation for goods or services except for the sale of goods or services in the scope envisioned by the express purpose of the Services; and</li>

                        <li>(f) Shall not upload, post or otherwise transmit any content that violates any law or engage in activity that would constitute a criminal offense or give rise to civil liability; and</li>

                        <li>(g) Shall not post unauthorized commercial communications (such as spam); and</li>

                        <li>(h) Shall not upload, post, or otherwise transmit any content that advocates or provides instruction on illegal activity or discuss illegal activities with the intent to commit them; and</li>

                        <li>(i) Shall not upload, post, or otherwise transmit content that does not generally pertain to the designated topic or theme of any Interactive Area; and</li>

                        <li>(j) Shall not impersonate any person or entity, including, but not limited to, any of our employees, or falsely state or otherwise misrepresent your affiliation with any person or entity; and</li>

                        <li>(k) Shall not interfere with any other User's right to privacy, including by harvesting or collecting personally identifiable information about other Users of our Interactive Areas or posting private information about a third party; and</li>

                        <li>(l) Shall not engage in unlawful multi-level marketing, such as a pyramid scheme; and</li>

                        <li>(m) Shall not upload, post or otherwise transmit any content, software or other materials which contain a virus or other harmful or disruptive component; and</li>

                        <li>(n) Shall not interfere with or disrupt the Services or the Interactive Areas or the servers or networks connected to the same, or disobey any requirements, procedures, policies, or regulations of networks connected to the Services and/or the Interactive Areas; and</li>

                        <li>(o) Shall not facilitate or encourage any violations of these Terms of Use or any other Bookablebiz policies; and</li>

                        <li>(p) Shall not upload, post or otherwise publish any information (in a form of link or otherwise) on entities providing competitive services to Bookablebiz.</li>

                        <li>Users agree and acknowledge that any profile they create may be edited, removed, modified, published, transmitted, and displayed by us, and they waive any rights they may have in having the material altered or changed in a manner not agreeable to them.</li>
                    </ul>
                </details>
                <details>
                    <summary>3.4. Rights in Submissions.</summary>
                    <ul>
                        <li>Should you submit, display, publish or otherwise post any content to an Interactive Area, (hereinafter “Submissions,”) you agree to grant to us and our partners and affiliates a limited, non-exclusive, sublicensable, worldwide, fully-paid, royalty free license to use, modify, publicly perform, publicly display, reproduce, and distribute such Submissions in any and all media now known or hereinafter developed for hosting, indexing, caching, distributing, tagging, marketing, and for all other lawful purposes without the requirement to make payment to or seek permission from you or to any third party.</li>

                        <li>You represent and warrant that you own or have a valid license to use any and all Submissions and otherwise have the right to grant the license set forth herein, and the displaying, publishing or posting of any Submissions does not and will not violate the privacy rights, publicity rights, copyrights, trademark rights, patents, contract rights or any other intellectual property rights or other rights of any person or entity. </li>
                    </ul>
                </details>
                <details>
                    <summary>3.5. Right to Monitor.</summary>
                    <ul>
                        <li>We shall have the right to monitor your My Account in our sole and exclusive discretion.</li>
                    </ul>
                </details>
                <details>
                    <summary>3.6. Verification of Users.</summary>
                    <ul>
                        <li>Users wishing to participate in the Services may, for security reasons, be asked to provide a valid mobile phone number through the Bookablebiz Platform and verify such number as instructed by us. To verify your mobile phone number, we will send you a code via text message to the mobile phone number you provided, and you must enter that code as instructed in the Bookablebiz Platform. If you change your mobile phone number, you must promptly provide and verify your new mobile phone number.</li>

                        <li>When you provide your mobile phone number, you expressly consent to receive direct dial calls, including autodialled and prerecorded message calls, and text messages at that number. Users wishing to participate in the Services may also be required to verify their identities, especially in the case of Payment Services. This may include but is not limited to providing proof of identity (such as via a passport or other photo-bearing piece of identification) and residence (such as via a current utility bill.) Bookablebiz does not bear any responsibility and cannot be held liable for the verification or non- verification of a User’s identity.</li>

                        <li>Any personal information provided by you to Bookablebiz and referred to above will be stored and processed by Bookablebiz in accordance with our Privacy Policy</li>
                    </ul>
                </details>
                <details>
                    <summary>3.7. My Account Settings.</summary>
                    <ul>
                        <li>You may establish certain default settings for your use of the Payment Services through the Bookablebiz Platform, such as your preferred payment card account. You may change these settings through the Bookablebiz Platform.</li>
                    </ul>
                </details>
                <details>
                    <summary>3.8. Use of the Booking Services via Third-Party Platforms.</summary>
                    <ul>
                        <li>Bookablebiz may, from time to time, work with third-party websites, platforms, and services (each a “Third-Party Platform,”) through whom our Booking Services and Payment Services may be facilitated. In accordance with our Privacy Policy, unless a Customer opt-outs by contacting us at Support@Bookablebiz.com, we may contact such Customers who access or otherwise use our Booking Services and/or Payment Services via such Third-Party Platforms (such as a vendor who has been authorised to embed the Bookablebiz booking engine) at the email address or phone number provided to such Third-Party Platform by Customer.</li>
                    </ul>
                </details>
                <details>
                    <summary>3.9 Customer Reviews of Vendors.</summary>
                    <ul>
                        <li>Customers who book services with a Vendor through Bookablebiz may have the opportunity to leave a review (“Review”) for the Vendor. In addition to complying with all requirements for reviews as may be set forth by law, the rules for publishing and removing Reviews are as follows:</li>
                        
                        <li>(a) Bookablebiz is not responsible for the content of any Review published by a Customer;</li>

                        <li>(b) the Customer is allowed to provide a Review only in relation to the appointment that took place. Vendor may request to remove the Review only if the Vendor marks the appointment as a no-show within 24 hours from the scheduled appointment;</li>

                        <li>(c) the Review shall relate only to the professional activities provided by Vendor and be based solely on the personal experience of the Customer;</li>

                        <li>(d) the Customer shall not publish Reviews that: (i) are false or intentionally misleading, (ii) contain harmful, defamatory or unethical content or violate the law, personal rights, in particular, they shall not contain vulgar or offensive expressions, refer to private and family life or call for violence or hatred, including racial, religious or ethnic hatred or against sexual minorities;</li>

                        <li>(e) we may refuse to publish a Review or to remove an already published Review if, in Bookablebiz's sole and exclusive opinion, it violates the Terms of Use or the provisions of law. However, Bookablebiz does not settle disputes between Vendor and the Customer and does not verify the veracity of Reviews;</li>

                        <li>(f) removal of the Review is irreversible;</li>

                        <li>(g) Customers shall be given the opportunity to provide their opinions about performed services of Vendors; therefore, requests for blocking the possibility of providing Reviews or deletion Reviews posted by Customers will not be considered unless the Review otherwise violates these Terms.</li>
                        <li>Reviews submitted by Customers who have used the services of a given Vendor via a booking made in the Bookablebiz Platformare marked with the tag 'Verified User by Bookablebiz.'Regarding these reviews, Bookablebiz ensures that they originate solely from Customer accounts who have utilized the services of the specific Vendor. Only after the Vendor's Service has been fulfilled do Customers gain the ability to publish reviews. As for reviewsthat do not possess the 'Verified User by Bookablebiz' tag, Bookablebiz does not guarantee that such opinions come from Customers who have used the services of the specific Vendor.</li>

                    </ul>
                </details>
                <h2>Part IV –Terms of Sale for Booking Services, Payment Services, and Vendor Rankings in Search Results.</h2>

                <details>
                    <summary>4.1. Appointment & Booking Services </summary>
                    <ul>
                        <li>Bookablebiz provides the Booking Services to Users for the purpose of assisting Customers in discovering and booking appointments with variety of participating Vendors and of assisting Vendors in more efficiently managing their calendars and increasing their customer base. </li>

                        <li>In response to a Customer’s online request for a Vendor appointment through the Bookablebiz Site or Bookablebiz Platform, the availability of appointments or bookable services is determined at the Can this “Verified User By Bookablebiz” be implemented?time of User’s query and is provided solely by information uploaded and submitted by the Vendor on the Bookablebiz Platform. </li>

                        <li>Users understand and agree that Bookablebiz does not independently verify the availability of any Vendor and cannot be held liable for errors in a Vendor’s calendar, such as double-booking or bookings that are not honoured by the Vendor. Once an appointment is made by a Customer through the Bookablebiz Site or Bookablebiz Platform, Bookablebiz will provide confirmation of the appointment to both the Customer and Vendor by email to the email address provided by said User upon registration. </li>

                        <li>By using the Booking Services, Users agree to receive appointment confirmations and reminders by email, SMS, push notifications, and/or any communication technology with which Bookablebiz may engage from time to time. Users agree that it is their sole responsibility to block their calendars and set their own reminders concerning their appointments or booked services. Bookablebiz shall not be held liable in the event an appointment confirmation or reminder is not sent to or received by a User for whatever reason.</li>
                    </ul>
                </details>
                <details>
                    <summary>4.2. Appointment No-Show & Cancellation Policy.</summary>
                    <ul>
                        <li>Bookablebiz is committed to providing quality services to Customers and Vendors. To assist us in maintaining a consistently high level of service for Vendors and their patrons, Customers must make every reasonable effort to cancel any appointments they cannot honour in advance of the appointment booking date and time. Customers may cancel their bookings or appointment via the Bookablebiz Site or Bookablebiz Platform. Appointments should not be cancelled by calling the Vendor directly. </li>

                        <li>Some Vendors may require a debit or credit card number to finalize your booking of a service or appointment and place a hold on the Vendor’s calendar. In such instances, you as a Customer must provide a valid debit or credit card information and a specific amount would be prepaid to the Vendor Account. </li>

                        <li>Any cancellation after booking has been made must be in accordance with the Vendor’s stated cancellation and refund policy, which will be disclosed at the time the appointment or booking is made. </li>

                        <li>Please note that a cancellation fee may be charged only if the Customer has self-cancelled the appointment through the processes described above or the Vendor has recorded a no-show. Be advised that you may be charged the cancellation fee indicated during the booking process or lose the amount prepaid, if you cancel late or no-show, thus committing a breach of a stated cancellation policy of the Vendor. </li>

                        <li>In case it is not otherwise specified, the refund of any amount prepaid rests solely with the Vendor. Bookablebiz shall have no liability for refunding such amounts to the Customers, nor is Bookablebiz responsible for verifying whether the Customer has provided valid debit or credit card information or has sufficient funds in Customer’s bank account to complete a transaction.</li>

                        <li>Customers who cancel or fail to show up for multiple bookings may have their respective My Account terminated at the sole discretion of Bookablebiz when such account activity is deemed detrimental to orderly Booking Services with Vendors and members of the Bookablebiz community.</li>
                    </ul>
                </details>
                <details>
                    <summary>4.3 Cancellation & Refund Processing Fee</summary>
                    <ul>
                        <li>To cover the cost of administratively processing a refund of the prepaid payment for a booked service or appointment including the cancellation cost incurred by our Bookablebiz and Vendors payment processing partner, Stripe, all Users agree that any applicable refunds, per the Vendor’s terms and conditions of service, shall deduct a reasonable cancellationrefund processing fee as highlighted in the agreed terms of service for a prepaid bookable service or appointment. </li>

                    </ul>
                </details>
                <details>
                    <summary>4.4. Usage Guidelines.</summary>
                    <ul>
                        <li>User agrees to use the Booking Services only to book appointments for Vendor services selected, make required prepayments as applicable, and then honour those appointments/bookings by arriving at Vendors on date and time specified.</li>

                        <li>Resale or attempted resale of appointments is prohibited and is grounds for, among other things, cancellation of your appointments or termination of your access to the Services.</li>
                    </ul>
                </details>
                <details>
                    <summary>4.5. Bookablebiz Payment Services - General.</summary>
                    <ul>
                        <li>Bookablebiz may offer third-party payment services (the “Payment Services”) in order to allow Customers to pay for bookable services at participating Vendors through the Bookablebiz Platform. Specifically, Bookablebiz Platform collects and processes payments on behalf of Vendor through our payment processor partner Stripe, Inc., a recognized global professional payments processor. </li>

                        <li>To use the Payment Services at a participating Vendor, Customers must: (1) make a booking for the Vendor through the Bookablebiz Platform; (2) provide valid payment information through the Bookablebiz Platform as further described below; and (3) have a Bookablebiz “My Account” in good standing. </li>

                        <li>Customer’s mobile carrier’s standard text message and data charges may apply when completing the payment online through a mobile device and Customers are responsible for any fees charged by their mobile or internet carrier in connection with your use of the Payment Services associated withBookablebiz Platform.</li>
                    </ul>
                </details>
                <details>
                    <summary>4.6. Published Prices.</summary>
                    <ul>
                        <li>The prices and the terms of payment for Vendor services are displayed at the time of booking via the Bookablebiz Platform or Bookablebiz Site, however, Vendors may modify or change these fees at any time, as is their sole discretion. </li>

                        <li>The published prices shown on Bookablebiz Site and Bookablebiz Platform shall by default include all applicable local goods and services taxes. At check-out the amount payable shown will have the notation “Amount payable inclusive of GST”</li>
                    </ul>
                </details>
                <details>
                    <summary>4.7. Payment Card Information.</summary>
                    <ul>
                        <li>To use the Payment Services as provided by our payment processing partner, Stripe, Inc., Customers must provide account information for at least one valid debit or credit card through the Bookablebiz Platform and Stripe uses this account information as described in our Privacy Policy to complete the payment transaction. Customers may add, delete, and edit the debit or credit card account information provided from time to time through the Bookablebiz Platform payment processing system. If you provide account information for more than one valid debit or credit card, you must select which debit or credit card you primarily want to use to pay for prepaid appointments and bookable services</li>

                        <li>To confirm that the payment card information you have provided is accurate, our payment processor Stripe may, depending on your local bank credit card issuer, place a temporary $1.00 authorization hold on your debit or credit card at the time you provide your payment card information through the Bookablebiz Platform. After verification that your payment card information is accurate, usually within a few days, the $1.00 hold will be removed. </li>

                        <li>To the extent permitted by applicable law and subject to our Privacy Policy, Users acknowledge and agree that we may use certain third-party Vendors and service providers (such as payment processors) to process payments and manage debit and credit card information with your local bank issued credit or debit cards.</li>

                        <li>By providing debit or credit card account information through the Bookablebiz Platform payment processor Stripe, User represent, warrant, and covenant that: (1) you are legally authorized to provide such information to us; (2) you are legally authorized to perform payments from the debit or credit card account(s); and (3) such action does not violate the terms and conditions applicable to your use of such debit or credit card account(s) or applicable law. </li>

                        <li>When you authorize a payment using a debit or credit card account via the Bookablebiz Platformpayment processor Stripe, you represent, warrant, and covenant that there are sufficient funds or credit available to complete a payment using the debit or credit card account. By using Booking Services, you acknowledge and accept the binding agreement to bear full financial responsibility for all Booking Services that you book using Bookablebiz or information contained on Bookablebiz.</li>
                    </ul>
                </details>
                <details>
                    <summary>4.8. Payment Authorization and Settlement.</summary>
                    <ul>
                        <li>When you indicate through the Bookablebiz Platform that you intend to pay for your bookings/appointments using the Payment Services, you authorize Bookablebiz payment processorStripe to charge your debit or credit card for the full amount of the services to be rendered, including any cancellation and refund fees that you may incur at any time prior to or after the appointment time and date. You are responsible for timely payment of all amounts owed by you to Bookablebiz and Vendors.</li>
                    </ul>
                </details>
                <details>
                    <summary>4.9. Receipts and Transaction History.</summary>
                    <ul>
                        <li>All the receipts and history of transactions connected with the Payment Services are visible in your My Account (for Customers) and Vendor Account (for Vendors) in the Bookablebiz Platform and/or Bookablebiz Site. Users shall also receive email notifications of transactions including booking confirmation, changes, cancellation and refunds. </li>
                    </ul>
                </details>
                <details>
                    <summary>4.10. Incomplete Payments.</summary>
                    <ul><li>Bookablebiz is not liable for any payments that the Payment Services do not complete because: </li>

                    <li>(a) User debit or credit card account does not contain sufficient funds to complete the transaction, or the transaction would exceed the credit limit or overdraft protection of the debit or credit card account;</li>

                    <li>(b) User has not provided us with correct payment account information;</li>

                    <li>(c) User debit or credit card has expired; or</li>

                    <li>(d) circumstances beyond our control (such as, but not limited to, power outages, interruptions of cellular service, or any other interference from an outside force) prevent the execution of the transaction. </li>

                    <li>To the extent that any amounts owed cannot be collected from User debit, or credit card account through the Payment Services, User will be solely responsible for paying the applicable Vendor(s) by other means, such as cash, as required for the full value of the services booked and/or delivered.</li></ul>
                </details>
                <details>
                    <summary>4.11. Payment Processing Processor.</summary>
                    <ul>
                        <li>Bookablebiz works with the recognized global professional payments processor, Stripe, Inc., and uses the Stripe Standard Connect solution which is integrated with the Bookablebiz Platform. Bookablebiz is guided by Stripe, Inc. terms and conditions governing users and vendors under its Stripe Standard Connect solution including technical and customer support and resolution of payment processing issues arising. See Stripe Standard Connect information. </li>

                        <li>Under the Stripe Standard Connect solution, each vendor is required to have their own Stripe Account, abide by Stripe’s implementation and payment handling processes. Stripe will charge the Vendor their published local transaction and processing fees applicable for the country where the vendor is located for each transaction.</li>

                        <li>Payments by Users will be processed by Stripe and paid directly to the Vendor, less deductions for Stripe charges and commissions payable by Vendors to Bookablebiz. Refund amounts, per the Vendors Refund Cancellation Terms & Conditions, and authorised by the Vendor to the User will be processed by Stripe less refund processing fees chargeable. See Stripe Customer Refund</li>
                    </ul>
                </details>
                <details>
                    <summary>4.12. Vendor Rankings, Display and Search Results</summary>
                    <ul>
                        <li>In the case of a Customer searching for services or Vendor(s), the Customer is presented with Vendorinformation that match all the search criteria specified by the Customer. The Customer can use filters under "categories" and/or “labels” and “location” to narrow down the search results. </li>

                        <li>The main parameters determining the positioning of Vendor rankings in the Customer's search results are as follows:</li>

                        <li>(a) city/town - the Customer is presented with Vendors that meet the location criteria specified by the Customer or the location provided by the Customer through GPS;</li>

                        <li>(b) distance - the Customer is presented with Vendors located closest to the Customer;</li>

                        <li>(c) availability - the Customer is presented with Vendors that have an available time slot for the service of interest to the Customer;</li>

                        <li>(d) services category - a Vendor may specify whether a particular service belongs to their primary or additional business service category. If the Customer searches for a specific service, the Vendors that have defined the searched service as their primary service category are presented to the customer first;</li>

                        <li>(e) service type - a Vendor may specify the type of a particular service if offers. If the Customer searches for a specific service by selecting its type, Vendors that have designated the same service type are presented to the Customer first;</li>

                        <li>(f) ratings - the Customer may be presented with Vendors that have the highest ratings based on reviews from other Customers;</li>

                        <li>(g) gender - the Customer may be presented with Vendor tailored to the gender specified by the Customer: male, female, all.</li>

                        <li>(h) promotions - the Customer may be presented with Vendors that offer the prevailingpromotions at the time of the search;</li>

                        <li>Vendors who subscribe to additional features and functionalities from Bookablebiz aimed at supporting the Vendors in acquiring new Customers may be displayed on the front page of the Site under “Featured Services”. Displaying such Vendors who have subscribed for additional paid promotions on the Bookablebiz Platform or Bookablebiz Site is at the sole discretion of Bookablebiz.</li>

                        <li>Vendors who are better rated by their Customers may also be displayed under “Popular Services” on the front page of site. This is to conveniently assist Customers in their search for more popularconsumer rated Vendors.</li>
                    </ul>
                </details>
                <h2>Part V – Removal of Services and Addition of Services</h2>

                <details>
                    <summary>In addition to Booking Services currently made available, Bookablebiz reserves the right and has sole discretion to remove or add services as it deems necessary.</summary>

                    <ul>
                        <li>5.1 Bookablebiz may remove and/or delete services offered by Vendors after its determination that a Vendor service offered or content about its services/products may not be legally allowed, may cause undue public/community concern, may not be viably delivered professionally, may cause a health risk, or due to unauthorised business, business practices and content.</li>

                        <li>5.2 Bookablebiz may add other or new products, services or bookable services or category of services it solely deems appropriate for its commercial purposes, stakeholders’ interest and/or community benefit, the addition of which may be carried out as and when required from time to time.</li>
                    </ul>
                </details>
                <h2>Part VI –Vendor Terms of Use.</h2>
                <p>In addition to the other terms contained in these Terms of Service, the following Vendor Terms of Use shall be applicable to all Vendors.</p>
                <details>
                    <summary>6.1. Unauthorized Business & Content.</summary>
                    <li>In addition to the forgoing prohibited uses, our Bookablebiz Platform and the Bookablebiz Site may not be used by a Vendor to: publish, distribute, offer, sell or cause us to do so on his, her or its behalf, any of the content, products or services, being or related directly or indirectly to: (hereinafter “Unauthorized Business” and “Unauthorized Content”):</li>

                    <li>(a) illegal or contrary to good morals or principles of social intercourse;</li>

                    <li>(b) drugs, tobacco, alcohol, other stimulants and tools intended for the production of the foregoing;</li>

                    <li>(c) pornographic, sexual (including escort or tantra), sexually suggestive, aiming to promote a particular service or product through a content of a sexual, ambiguous or unethical nature;</li>

                    <li>(d) adult entertainment oriented; and internet/mail order/telephone order of age-restricted products</li>

                    <li>(e) sales of firearms, ammunition, or weapons and other devices designed to cause physical injury;</li>

                    <li>(f) betting, including lottery tickets, sports related gambling, casinos;</li>

                    <li>(g) insurance or other financial merchandise; money transfers; independent financial adviser services or securities; pyramid selling or multi-level marketing;</li>

                    <li>(h) counterfeit or infringing on third party intellectual property rights (illegal software or downloads included);</li>

                    <li>(i) pharmacies or pharmacy referral services any other sales of products or services in highlyregulated industries;</li>

                    <li>(j) hate or harmful, invoking or supporting discrimination, violence or terrorism.</li>

                    <li>Violations of this requirement may result in and at the sole discretion of Bookablebiz and without the need for any further notice (hereinafter called “Corrective Action” : </li>

                    <li>(i) block or deletion of any of the Unwanted Content,(ii) temporary or permanent block of a given features or Services used by you, (iii) temporary or permanent block of your Vendor Account, (iv) Vendor Account termination. The commencement of any corrective action by Bookablebiz, including Vendor Account termination, shall not relieve Vendor from the obligation to pay the charges accrued for Bookablebiz Services prior to a given Corrective Action.</li>
                </details>
                <details>
                    <summary>6.2. Vendor Accounts</summary>
                    <ul>
                        <li>In order to use and benefit from our Services as a Vendor, each Vendor must create and register a Account through the Bookablebiz Site or Bookablebiz Platform (“Vendor Account”). By opening your Vendor Account, you agree to comply with the Terms of Use, Privacy Policy and agree to provide Users with the services they booked with you in accordance with the Terms of Use. In addition, those terms and restrictions set forth in Sections 3.2 through 3.6 of these Terms for Customer Accounts shall apply equally to Vendor Accounts.</li>

                        <li>When registering a Vendor Account, you represent that you are authorized to act on behalf of the Vendor and must provide true, accurate, current, and complete data about the Vendor being registered. Such data may include data as required by our payment processing processor</li>

                        <li>Be advised that our payment processor, Stripe, may reject any Vendor if it fails Stripe’s internal duediligence procedures. For more information, see the terms and conditions available at https://www.stripe.com . </li>

                        <li>Vendor also must agree to promptly update your Vendor Account to keep it accurate, current, and complete. Asa Vendor, you are solely responsible for maintaining the confidentiality of your VendorAccount and the information in your Vendor Account, and, except as otherwise required by applicable law, you are solely responsible for all use of your Vendor Account, whether or not authorized by you. You agree to immediately notify Bookablebiz and Stripe of any unauthorized use of your Vendor Account or any other breach of security related to your use of the Services.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.3. Subscription, Service Fees.</summary>
                    <ul>    
                        <li>Subscription of a Vendor Account may or may not be free of charge, depending on Vendor’s choice of their preferred Subscription Plan. </li>
                        
                        <li>Except for the free Starter Subscription Plan offered at the sole discretion of Bookablebiz, a Vendorhas to pay a monthly or annual subscription fee to register your Vendor Account (“Subscription Fee”). The exact amount of Subscription Fee will depend on Subscription Type type: “Premium” or “Professional” or any other payable Subscription Plan category that Bookablebiz may include from time to time as applicable. </li>

                        <li>Vendors may further opt to subscribe for additional features that may include the “Appointments” module: which allows a Vendor on any Subscription Plan to collect payments from Users at their own point of sale or service delivery location. </li>

                        <li>Bookablebiz reserves the right to change from time to time and with its full discretion, the types of Vendor Subscription Plans or reduce or waive Subscription Fees as it deems necessary for commercial reasons or otherwise.</li>

                        <li>In addition to the fee payable based on the selected Subscription Plan, you as a Vendor agree that the specified fee will be deducted monthly or annually, depending on your choice of Subscription Plan and payment arrangement with Bookablebiz via Stripe payment processing.</li>

                        <li>Bookablebiz reserves the sole right to waive or reduce Vendor Subscription Fees for a certain period in its sole discretion, such as in the event of a free trial or promotional period. After such period, Vendor/s will be presented with a Subscription Plan offer and the applicable fees will be charged to the Vendor’s Stripe account based on the agreed terms and conditions at Subscription Plan sign-up. Bookablebiz reserves the right to block or delete the accounts of Vendors who do not pay up therequired fees</li>

                    </ul>
                </details>
                <details>
                    <summary>6.4. Cancellation of a Vendor Account.</summary>
                    <ul>
                        <li>Any Vendor can cancel their Vendor Account by sending us an email on vendorhelp@Bookablebiz.com giving a minimum of 21 days notice of cancellation. </li>

                        <li>On receiving the notice of cancellation, Bookablebiz will immediately suspend and disallow any further bookings to be made for Vendor services and appointments. </li>

                        <li>During this suspension period, Bookablebiz will work with Vendor to try fulfil all of Vendor's obligations to its customers who have not yet availed themselves to the prepaid services or appointments. Failing which, Bookablebiz reserves the right to legally comply Vendor to completely fulfil its obligations and/or refund all prepayments made to affected customers who have yet to get fulfilment of prepaid booked services/appointments.</li>

                        <li>Important notice: Vendors please be aware that upon cancellation of Vendor Account, Bookablebiz will NOT refund Vendor for the Subscription Plan period already past and paid for, regardless of whether Vendor has not accessed their Vendor Account during that period, or received no bookings, or no Vendor services was created and listed on the Site</li>

                        <li>In case of a cancellation of a Vendor Account, we reserve the right to delete your Vendor Account from our Services and in accordance with our Privacy Policy.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.5 . Compliance with all Terms of Sale.</summary>
                    <ul>
                        <li>All sales and accepted bookings shall be binding. Vendor agrees and acknowledges that he, she, or it, and not Bookablebiz, shall be solely responsible for delivery of any and all purchased services to Customers and that a contract for sale arises at the point where a Customer utilizes the Booking Services to book a service. Every sale shall be subject to the laws applicable, but there shall not be implied any right that is not a legal right and that is not set down in these Terms.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.6. Vendor Warranties; Restrictions.</summary>
                    <ul>
                        <li>In addition to the Unauthorized Business and prohibited use of the Services set forth in these Terms, Vendor warrants that any and all services (a) are not: illegal, obscene, abusive, threatening, defamatory, invasive of privacy, infringing of intellectual property rights, or otherwise injurious to any System needs to be programmed to execute these actions in event Vendor Account is to be cancelledthird party; (b) have not been identified by the authorities and any other regulations set forth as hazardous to consumers and, therefore, are not services subject to a recall; (c) are not counterfeit; (d) do not offend against the law of any country whose citizens might purchase or receive the services; and (e) do not violate the local laws, rules and regulations, </li>

                        <li>Vendor warrants further that he, she, or it owns all copyrights, trademarks and other intellectual property related to any Vendor Account information provided to us or that Vendor has the permission of the intellectual property rights holder (a) to place the Product(s) into the stream of commerce; (b) to receive the net proceeds of such sales as arise; and (c) to defend the intellectual property in the Product(s). </li>

                        <li>Finally, Vendor warrants and represents that he, she, or it has all licenses and authorisations required for performance of these Terms. Upon our request, Vendor shall provide us with sufficient documentary evidence of such authorisation or waiver. We are not obliged to require such documentary evidence, and the fact that we have not requested such documentary evidence shall not be deemed in any way as a statement as to whether or not such authorisation or waiver is required.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.7. Listing Description.</summary>
                    <ul>
                        <li>By listing services available for booking via the Booking Services, Vendor must accurately describe the services it provides and all terms of sale. Vendor’s listings may only include text descriptions, and other content relevant to the sale of that service and must be listed in an appropriate category with appropriate labels or tags.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.8. Maintenance of Calendar</summary>
                    <ul>
                        <li>The Vendor is responsible for the accurate maintenance and updating of its calendar to show current, correct availability for the Booking Services. In no event shall Bookablebiz be held liable for double-bookings or other schedule-related errors.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.9. Ethical Selling Tactics Required; Communication with Customers.</summary>
                    <ul>
                        <li>Vendors shall utilize ethical selling tactics when promoting any and all services including refraining from the making of false and/or misleading statements regarding the services and/or Vendor. Vendors expressly agree to conduct themselves at all times in an ethical, moral, and lawful manner. </li>

                        <li>In order to assist with the same, Bookablebiz may from time to time in its sole and exclusive discretion place limits on the types of communications that Vendors may send to Customers, including but not limited to mass targeted marketing campaigns via SMS text, email, or push notification when Customer complaints arise about unreasonable Vendor promotional practices or marketing efforts that are against local laws. </li>

                        <li>In addition to the forgoing, Vendors shall not abuse any communication system made available via the Bookablebiz Platform or the Bookablebiz Site.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.10. Compliance with Law.</summary>
                    <ul>
                        <li>In addition to the other requirements to comply with laws, regulations, and terms set forth herein, Vendors agree to obey any and all national, state, and local regulations and laws regarding solicitation and sales.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.11. Freedom of Promotional Methods.</summary>
                    <ul>
                        <li>Notwithstanding the forgoing, Vendors shall be free to choose on which social media platforms and through such other mediums and sales channels they promote their services and use of the Services, including the ability to choose his, her, or its own operation means, methods, locations, and hours.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.12. Right of Refusal.</summary>
                    <ul>
                        <li>A Vendor may refuse to accept a booking made via the Booking Services for any or no reason whatsoever so long as such a refusal does not violate national, state, or local laws, or any other rule or regulation.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.13. Policies, Terms of Sale Required</summary>
                    <ul>
                        <li>Vendors must have in place via their service listing the following policies before they shall be permitted to conduct any transaction via the Bookablebiz services: </li>

                        <li>(a) pre-payment policies, </li>

                        <li>(b) cancellation policies, refund policies, and</li>

                        <li>(c) payment policies in addition to such other policies as a Vendor wishes to set forth. </li>

                        <li>Vendors must create reasonable policies in good faith and must abide by such policies. In the event a policy fails to comply with these Terms of Use and/or is unreasonable in any way Bookablebiz may, atits sole and exclusive discretion, require Vendor to revise said policy.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.14. Processing Fees for Vendors.</summary>
                    <ul>
                        <li>Vendors who wish to use Bookablebiz Payment Services via our payment processor Stripe for online prepayment transactions shall be charged a fee for processing payments according to the Vendor Terms of Service, which is visible in the Bookablebiz Platform (the “Processing Fee”). For details, contact vendorhelp@Bookablebiz.com. Such Processing Fee shall be subject to change without notice in our sole and exclusive discretion. Such Processing Fee is not refundable for any reason whatsoever, including in the situation where the Vendor has to refund a purchase to a Customer</li>
                    </ul>
                </details>
                <details>
                    <summary>6.15. Chargebacks and Revocations.</summary>
                    <ul>
                        <li>If a Customer is not the authorized user of the payment method or otherwise contests the transaction, the amount of a transaction may be reversed or charged back provided that the transaction: (a) is disputed, (b) is reversed for any reason by Bookablebiz payment processingprocessor, or the Customer or its financial institution, (c) was not authorized, or Bookablebiz or its payment processor has any reason to believe that the transaction was not authorized, or (d) is allegedly unlawful, suspicious, or in violation of these Terms. </li>

                        <li>When a bank affiliated card network like Visa or Mastercard notifies Stripe of a chargeback, the entire purchase amount plus a S$15 fee are withdrawn from the Vendor Standard Connect vendor account balance, and returned to the card company. The Standard Connect vendor account has the opportunity to respond to the dispute by submitting evidence via the Stripe Dashboard. If the Standard Connect account wins the dispute, the prepayment price will be returned to their Stripe balance. However, the S$15 fee will not be returned regardless of the dispute outcome. See https://stripe.com/docs/disputes .</li>

                        <li>If you have pending chargebacks, the payment processor may delay payments, and if it is reasonably believed that a chargeback is likely with respect to any transaction, the payment processor may withhold the amount of the potential chargeback from payments otherwise due to you until such time that: (a) a chargeback is assessed due to a Customer complaint, (b) the period of time under applicable law or regulation by which your customer may dispute that the transaction has expired; or (c) it has been determined that a chargeback on the transaction will not occur. If payment processor is unable to recover funds related to a chargeback for which Vendor is liable, you as Vendor agree topay the full amount of the chargeback immediately upon demand. You as Vendor agree to pay all costs and expenses, including attorneys’ fees and other legal expenses, incurred by payment processor for the collection of all amounts unpaid by you.</li>

                        <li>If our payment processor believes you might incur, or you are incurring, an excessive amount of chargebacks, payment processor may establish additional conditions governing your account, including (a) establishing new processing fees, (b) creating a reserve in an amount reasonably determined by payment processor to cover anticipated chargebacks and related fees, (c) delaying payouts, or (d) terminating or suspending the Payment Services. See more details: https://support.stripe.com/questions/reserves-frequently-asked-questions .</li>
                    </ul>
                </details>
                <details>
                    <summary>6.16. Withholding of Funds.</summary>
                    <ul>
                        <li>Where, in our reasonable opinion, we are required to do so by law, we and/or our payment processor reserve the right to withhold funds for services that we reasonably deem suspicious with regard to money laundering, Unauthorized Business, fraud, or other illegal activities or in case of any other chargebacks or revocations.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.17. Payouts.</summary>
                    <ul>
                        <li>Once you create your Vendor Account with our payment processor Stripe, you will have the opportunity to designate your bank deposit account into which you wish to be paid out. Once funds for the Payment Services have been completed and are settled, they shall be available for withdrawal. Payouts shall automatically be transferred to your vendor deposit account less any fees as per the payment processor and Bookablebiz commission terms and conditions and generally made to your Vendor designated deposit account less any fees within the stipulated number of business days. See: https://stripe.com/docs/payouts .</li>

                        <li>Except as required by law, you shall remain solely and exclusively responsible for retaining permanent records of all transactions processed via your Vendor Account Settings.</li>

                        <li>Bookablebiz is not responsible and accept no liability for any delay of payout by payment processor Stripe. To inquire about a payout schedule for any particular transaction please review your Stripe Dashboard or Payment Report or contact Stripe at https://support.stripe.com/questions/contactstripe-support .</li>

                        <li>In the event your payout account becomes negative, Vendor will not be able to process any refunds until their balance goes positive again. Vendor can restore their balance back to positive by either accepting new payments, or adding funds from their bank account.</li>

                        <li>You, as Vendor, also agree that the payment processor has the right to offset any incoming payments against the negative balance. Should you fail to bring your account to positive, the payment processor may block you from accepting further payments and institute legal proceedings for collection. See https://support.stripe.com/questions/handling-negative-balances-in-your-stripeaccount</li>
                    </ul>
                </details>
                <details>
                    <summary>6.18. Responsibility for Accurate Pay Out Information.</summary>
                    <ul>
                        <li>You agree to provide current, complete, and accurate deposit account information for payout. You agree to promptly update your Vendor Account and other information, including your address, email address and bank account information, so that we can complete your transactions and contact you as needed.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.19. Deposits & Stripe payment processing.</summary>
                    <ul>
                        <li>Stripe Vendor accounts are able to leave funds in their Stripe account balance for up to 90 days after the payment if they want to. This money can be used for refunds or chargebacks. If any Stripe vendor account has a high rate of disputes, Stripe may automatically create a reserve for that account. The account owner would be notified via email if this happens. Stripe would temporarily hold a certain percentage of sales volume, which could be used for future refunds or chargebacks. Information on reserves can be found here: https://support.stripe.com/questions/reservesfrequently-asked-questions</li>
                    </ul>
                </details>
                <details>
                    <summary>6.20. Processing Errors.</summary>
                    <ul>
                        <li>If the error resulted in your receipt of fewer funds (after deductions for payment processing fees and commissions) than you were entitled, then Vendor would need to contact the customer and charge them again for the remaining amount.</li>

                        <li>If Vendor receives took too much of the prepaid fees (less processing fee and commissions) and need to send more money back to Bookablebiz and/or Customer, then Vendor can do a Reverse Transfer to Bookablebiz and/or Customer. </li>
                    </ul>
                </details>
                <details>
                    <summary>6.21. Refunds.</summary>
                    <ul>
                        <li>By accepting card transactions through the Payment Services, you agree to process returns of, and provide refunds and adjustments for your goods or services in accordance with these Terms. You are obliged to disclose your refund or cancellation policy to Customers at the time of purchase and/or booking, as applicable, and can refund transactions up to thirty (30) calendar days following the date of said transaction. </li>

                        <li>The amount of the refund/adjustment must include any associated taxes required to be refunded and cannot exceed the amount shown as the total on the original sales data. If your refund policy prohibits returns or is unsatisfactory to the Customer, you may still receive a chargeback relating to such sales.</li>

                        <li>Bookablebiz system will automatically process refunds on your behalf based on your refund and cancellation policies input into the system, and shall not be liable for refunds made in error or in violation of your own policies. </li>

                        <li>If your available balance or deposit amount is insufficient to cover the refunds then your payout account becomes negative, Vendor will not be able to process any refunds until their balance goes positive again. Vendor can restore their balance back to positive by either accepting new payments, or adding funds from their bank account.</li>

                        <li>Bookablebiz has no obligation to accept any returns of any of your goods or services on your behalf pursuant to the applicable Network Rules (as defined below.) By using the Payment Services, you agree to comply with all applicable bylaws, rules, and regulations set forth by the payment processor and related payment card networks. </li>

                        <li>Please note that the various payment processing card networks amend their rules and regulations from time to time. Bookablebiz payment processor may be required to change these terms in connection with amendments to the card Network Rules. Significant portions of the card Network Rules are available to the public at https://visa.com , https://www.mastercard.com, and https://www.americanexpress.com/merchantopguide. In the event of inconsistency between a Network Rule and these terms, and except as otherwise agreed between Bookablebiz payment processor and the payment processing card networks, the Network Rules shall apply</li>
                    </ul>
                </details>
                <details>
                    <summary>6.22. Handling of Liens; Right to Set-Off; Collection Rights.</summary>
                    <ul>
                        <li>Bookablebiz and its payment processor Stripe are entitled to set-off any and all claims against amounts payable to Bookablebiz by Vendor. In addition, to the maximum extent provided by law, we may collect any and all obligations due and owing by you to us by deducting them from your pending transactions in the deposit account.</li>

                        <li>Fees shall be assessed at the time of transaction processing and will be deducted from the funds received. Your failure to pay all amounts due and owning shall be deemed an immediate breach of this Agreement for which you will be liable. You further agree to pay all fees and costs, including but not limited to attorneys’ fees and costs, incurred by or on our behalf arising from or related to the collection of any unpaid obligations by you.</li>

                        <li>In addition to any other fees set forth in these Terms, Bookablebiz may also charge a Vendor, at Bookablebiz’s standard rates, for research, including, but not limited to, (i) research required to respond to any third party or government subpoena, levy or garnishment on a Vendor account, and (2) research and activities necessary to verify and execute any payee change, whether pursuant to a court order</li>

                        <li>You also understand that, as provided by law, we may be required, upon receipt of a notice of assignment and payment direction from your secured party (for example, lender), to pay all or a portion of your fees as directed by your secured party. If we receive such a notice and direction, we will, after deducting our fees and expenses of compliance as provided above, make payments to your secured party as so directed without prior notice to you.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.23. Payment of Taxes.</summary>
                    <ul>
                        <li>User is responsible for determining any and all taxes assessed, incurred, or required to be collected, paid, or withheld for any reason for your use of the Payment Services (“Taxes”). You also are solely responsible for collecting, withholding, reporting, and remitting correct Taxes to the appropriate tax authority. We are not obligated to, nor will we determine whether Taxes apply, or calculate, collect, report, or remit any Taxes to any tax authority arising from any transaction.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.24. Additional Products and Services.</summary>
                    <ul>
                        <li>Bookablebiz may, from time to time, offer additional products and services for purchase by Vendors, such as additional messaging features, or payment processing hardware and technical support, and lead generation. Such additional products and services shall be subject to additional service fees, which shall be set out clearly and subject to change at our sole and exclusive discretion and set forth in a separate agreement between the Vendor and Bookablebiz or a Bookablebiz affiliate or thirdparty partner offering such products and services. In the event that such additional services include lead generation, Vendor shall in a separate agreement, commit that it will be responsible for the payment of applicable commission in the said separate agreement to Bookablebiz for incremental customers or business generated who utilize the Booking Services as a result of the lead generation endeavour.</li>
                    </ul>
                </details>
                <details>
                    <summary>6.25. Transaction History.</summary>
                    <ul>
                        <li>As a Vendor you may, at any time, access your transaction history via your Vendor Account settings. Such history may include the ability to track commissions and inventory and otherwise receive statistics and reports on the performance of your Vendor. While we endeavor to keep all such information complete, timely, and accurate, we do not warrant that all transaction history shall be error-free. As Vendor, you agree to maintain your own transaction history and financial information and to verify the same with your own corporate accountant. By using the Bookablebiz Platform and Bookablebiz Site you acknowledge that your reliance on any such information provided by Bookablebiz is at your own risk. Bookablebiz shall not be held liable in the event such information is inaccurate or incomplete</li>
                    </ul>
                </details>
                <h2>Part VII – Intellectual Property; Privacy.</h2>
                <details>
                    <summary>7.1 Intellectual Property Rights Not Waived.</summary>

                    <ul>
                        <li>This is an Agreement for access to and use of the Services, and you are not granted a license to any software or intellectual property by these Terms of Use. Services are protected by Singapore and and, where applicable, international intellectual property laws. The Services belong to us and are the property of us or our licensors (if any). We retain all ownership rights in the Services.</li>

                        <li>Furthermore, all material displayed or transmitted on the Services, including but not limited to text, photographs, images, illustrations, video clips, audio clips, and graphics, (hereinafter “Materials,”) are owned by us and are protected by Singapore and international copyright, trademarks, service marks, and other proprietary rights, laws, and treaties.</li>

                        <li>Except as provided, you may not copy, reproduce, publish, transmit, transfer, sell, rent, modify, create derivative works from, distribute, repost, perform, display, or in any way commercially exploit the Materials carried on the Services, nor may you infringe upon any of the copyrights or other intellectual property rights contained in the Materials. You may not remove or alter, nor cause to be removed or altered, any copyright, trademark, or other proprietary notices or visual marks and logos from the Materials.</li>

                        <li>ou may make a single print copy of any Materials provided by us on the Services for personal, noncommercial use only, provided that you do not remove or cause to be removed any copyright, trademarks, or other proprietary notices or visual marks or logos from the Materials. You may not archive or retain any of the Materials accessed on this Services without our express written permission. All requests for archiving, republication or retention of any part of the Materials must be in writing to us and must clearly state the purpose and manner in which the Material will be used. Requests for permission to archive, retain, or republish any part of the Materials may be submitted to Support@Bookablebiz.com or Vendorhelp@bookablebiz.com . </li>

                        <li>You acquire no rights or licenses whatsoever in the Materials other than the limited rights to use the Services in accordance with these Terms of Use. Any of the Materials accessed or downloaded from this site must be accessed or downloaded in accordance with the Terms of Use specified in this Agreement. We reserve any rights not expressly granted under these Terms of Use.</li>
                    </ul>
                </details>
                <details>
                    <summary>7.2 Feedback.</summary>
                    <ul>
                        <li>User may have the opportunity to provide reviews, suggestions, ideas, and feedback, (hereinafter, collectively, “Feedback.”) Should you so provide such Feedback you grant us sole ownership of the same, which includes, without limitation, the right for us or any third party we designate, to use, copy, transmit, excerpt, publish, distribute, publicly display, publicly perform, create derivative works of, host, index, cache, tag, encode, modify and adapt (including without limitation the right to adapt to streaming, downloading, broadcast, mobile, digital, thumbnail, scanning or other technologies) in any form or media now known or hereinafter developed. All such Feedback shall be treated as nonconfidential.</li>

                        <li>If it is determined that you retain moral rights (including rights of attribution or integrity) in the content submitted by you, you hereby declare that (a) you do not require that any personallyidentifying information be used in connection with the content, or any derivative works of or upgrades or updates thereto; (b) you have no objection to the publication, use, modification, deletion and exploitation of the content by us or our licensees, successors and assigns; (c) you forever waive and agree not to claim or assert any entitlement to any and all moral rights of an author in any of the content; and (d) you forever release us, and our licensees, successors and assigns, from any claims that you could otherwise assert against us by virtue of any such moral rights. You also permit any other User to access, view, store or reproduce the content for that User's personal use.</li>

                        <li>Notwithstanding the foregoing, you acknowledge that your Feedback may contain concepts, ideas, materials, proposals, suggestions, and the like relating to Bookablebiz or its initiatives, (hereinafter your “Ideas.”) With respect to your Ideas you acknowledge that: (a) we receive numerous submissions from many parties and/or may have independently-developed and/or considered ideas similar to your Ideas, and that our review of your Ideas is not an admission of novelty, priority, or originality; and (b) our use of any ideas similar to your Ideas, whether based on your Feedback or Submissions, provided to us by third parties, or independently-developed or considered by us, shall be without obligation to you.</li>
                    </ul>
                </details>
                <details>
                    <summary>7.3 Grant of License by User.</summary>
                    <ul>
                        <li>You agree to grant us a non-exclusive, worldwide, perpetual, irrevocable, royalty-free, sub- licensable (through multiple tiers) right to exercise the copyright, publicity, and database rights (but no other rights) you have in any content contained in any service listing or profile. You agree to allow Bookablebiz to store or re-format your content and display your content in any way as we so choose. Bookablebiz will only use personal information in accordance with our Privacy Policy.</li>
                    </ul>
                </details>
                <details>
                    <summary>7.4 Confidential Information of Customers.</summary>
                    <ul>
                        <li>As part of a transaction made via the Bookablebiz Platform or Site, Vendors may obtain personal information, including payment information, a telephone number, and an email address, from a Customer/User. The precise scope of personal information collected by Bookablebiz is described in our Privacy Policy.</li>

                        <li>This personal information shall only be used for that transaction or for Bookablebiz-related communications and shall be held in strict confidence in accordance with our Privacy Policy. For more details on how the personal information is stored, processed and for which purposes is used by Bookablebiz please refer to our Privacy Policy.</li>

                        <li>We have not granted you a license to use the information for unsolicited commercial messages. Without limiting the foregoing, without express consent from the Customer, Vendors are not licensed to add any Customer to an email or physical mailing list. For more information, see our Privacy Policy. This provision shall not apply to instances where a Vendor adds its own Customers to the Bookablebiz Platform or Bookablebiz Site or otherwise obtains consent from a Customer to contact said Customer for purposes outside of the transaction and Bookablebiz-related communications.</li>
                    </ul>
                </details>
                <details>
                    <summary>7.5. Platform & Site License by Bookablebiz.</summary>
                    <ul>
                        <li>Subject to the terms and conditions of this Agreement, Bookablebiz grants User a non-exclusive, non- transferable, revocable license to use the Bookablebiz Platform or Bookablebiz Site, in object code form only, on User’s compatible devices including but not limited to mobile devices, solely to support User’s permitted use of the Services.</li>
                    </ul>
                </details>
                <details>
                    <summary>7.6. Notice of Infringement.</summary>
                    <ul>
                        <li>If you believe any of the Services violate your copyright, notify our copyright agent in writing. The contact information for our copyright agent is at the bottom of this Section 7.6.In order for us to take action, you must do the following in your notice:(a) provide your physical or electronic signature;(b) identify the copyrighted work that you believe is being infringed;(c) identify the item that you think is infringing your work and include sufficient information about where the material is located so that we can find it;(d) provide us with a way to contact you, such as your address, telephone number, or email;(e) provide a statement that you believe in good faith that the item you have identified as infringing is not authorized by the copyright owner, its agent, or the law to be used in connection with the Services; and (f) provide a statement that the information you provide in your notice is accurate, and that (under penalty of perjury) you are authorized to act on behalf of the copyright owner whose work is being infringed.</li>
                    </ul>
                </details>

                <h2>Part VIII – Third-Party Advertisements, Promotions, Platforms, and Links.</h2>
                <details>
                    <summary>8.1. Third Party Advertisements and Promotions.</summary>

                    <ul>
                        <li>Bookablebiz may, from time to time, run advertisements and promotions from third parties on the Services. Your dealings or correspondence with, or participation in promotions of advertisers other than us, and any terms, conditions, warranties, or representations associated with such dealings, are solely between you and such third party. We do not endorse and are not responsible or liable for any loss or damage of any sort incurred as the result of any such dealings or as the result of the presence of third-party advertisers on the Services.</li>
                    </ul>
                </details>
                <details>
                    <summary>8.2. Use of Third-Party Tools and Platforms.</summary>
                    <ul>
                        <li>If and when available, we may provide you with access to third-party tools and Third-Party Platform integrations over which we neither monitor nor have any control nor input. Information shall be shared with such third parties as set forth in our Privacy Policy.</li>

                        <li>You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations, or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools and Third-Party Platforms.</li>

                        <li>Any use by you of optional tools offered through the Services is entirely at your own risk and discretion, and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s).</li>

                        <li>We may also, in the future, offer new services and/or features through the Services, including but not limited to the release of new tools. Such new features and/or services shall also be subject to these Terms of Use including additional usage fees as applicable.</li>
                    </ul>
                </details>
                <details>
                    <summary>8.3. Third-Party Links.</summary>
                    <ul>
                        <li>Certain content, products, and services put up either by us or our Vendors via our Services may include materials from third- parties.</li>

                        <li>Third-party links on the Services may direct you to third-party Web sites and/or services that are not affiliated with us. Bookablebiz is not responsible for examining or evaluating the content or accuracy, and we do not warrant and will not have any liability or responsibility for any third-party materials or Web sites and/or services, or for any other materials, products, or services of such third-parties.</li>

                        <li>Bookablebiz is also not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party with whom you connect via links on the Services. Please review carefully all third-party’s policies and practices and ensure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be solely directed to the third-partyconcerned.</li>
                    </ul>
                </details>
                <h2>Part IX: Disclaimers; Limitations Of Liability; Indemnification</h2>
                <details>
                    <summary>9.1. Disclaimer Of Warranty; Limitation Of Liability.</summary>
                    <ul>
                        <li>As User, you agree that use of the Services is at your sole risk. Neither us nor our affiliates nor any respective employees, agents, third-party content providers or licensors warrant that the use of the Services shall be uninterrupted or error free; nor do we make any warranty as to the results that may be obtained from the use of the Services or as to the accuracy, reliability, or content of any information provided.</li>

                        <li>Any downloadable software, products, or other materials, without limitation, is provided on an "as is" basis without warranties of any kind, either express or implied, including, but not limited to any warranty of merchantability, fitness for a particular purpose, title, or non-infringement, or any warranty arising from a course of dealing, performance, or trade usage, other than those warranties which are implied by and incapable of exclusion, restriction, or modification under the laws applicable to these Terms of Use. Bookablebiz does not warrant that your use of the Services will be uninterrupted or error-free, that Bookablebiz will review the information or materials made available through the Services for accuracy or that it will preserve or maintain any such information or materials without loss. Bookablebiz shall not be liable for delays, interruptions, service failures, or other problems inherent in use of the internet and electronic communications or other systems outside the reasonable control of Bookablebiz. The foregoing disclaimers apply to the maximum extent permitted by law. You may have other statutory rights. However, the duration of statutorily required warranties, if any, shall be limited to the maximum extent permitted by law.</li>

                        <li>Although all information and materials carried on Services are believed to be reliable, we make no representations, neither expressly nor impliedly, as to the accuracy, completeness, timeliness, or reliability of the Services.</li>
                        <li>To the maximum extent permitted by law, in no event shall we, our employees, subsidiaries, parents, agents, partners, third-party content providers, affiliates, Vendors, and/or our or their respective directors and officers be liable for any injuries, losses, claims, or direct damages or any special, exemplary, punitive, incidental, or consequential damages of any kind, whether based in contract, tort, or otherwise, including but not limited to loss of profits, personal injury or death, property damage, reputational harm, or loss of information or data, and even if advised of the possibility of such damages, which arise out of or are any way connected with or relate to (1) this Agreement, (2) any use of the Services, hardware or accessories, materials, or the user content, (3) any failure or delay (including, but not limited to, the use or inability to use any component of the booking services or payment services), or (4) your visit to any Vendor or the performance, non- performance, conduct, or policies of any Vendor or Customer in connection with the Services. In addition, you specifically understand and agree that any third party directing you to the Bookablebiz site by referral, link, or any other means is not liable to user for any reason whatsoever, including, but not limited to, damages or loss associated with the use of the Services. Bookablebiz is neither an agent of nor otherwise associated with any Vendor for which a Customer has made a reservation or paid a bill using the Payment Services</li>

                        <li>We disclaim any and all liability of any kind for any unauthorized access to or use of your personally identifiable information. By utilizing the Services, you acknowledge and agree to our disclaimer of any such liability. If you do not agree, you should not access or otherwise utilize the Services. Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages, so some of the above limitations may not apply to certain Users.</li>

                        <li>The above limitations shall survive these Terms and inure to the benefit of us and our affiliates and respective directors, officers, employees, and agents. You and Bookablebiz understand and agree that the disclaimers, exclusions, and limitations in this Section 9.1 are essential elements of this Agreement and that they represent a reasonable allocation of risk. In particular, you understand that Bookablebiz would be unable to make the Services available to you except on these terms and agree that this Agreement will survive and apply even if any limited remedy specified in this Agreement is found to have failed of its essential purpose.</li>
                    </ul>
                </details>
                <details>
                    <summary>9.2. Indemnification.</summary>
                    <ul>
                        <li>You agree to defend, indemnify and hold us harmless, as well as our affiliates and Vendors and respective directors, officers, users, and agents, from and against all claims, suits, and expenses, including attorneys' fees, arising out of or related to (a) your use of the Bookablebiz Site and/or the Mobile Bookablebiz Platform; (b) your noncompliance with or breach of this agreement; (c) your use of third-party services, platforms, products, links, advertisements, and/or tools; (d) your violations of any third-party rights, including third-party intellectual property rights in submissions and feedback;(e) the unauthorized use of the Services by any other person using your information; (f) your failure to comply with the network rules or pci-dss security standards, including the compromise of any payment information</li>
                    </ul>
                </details>
                <details>
                    <summary>9.3. Release.</summary>
                    <ul>
                        <li>As User, you fully understand that Vendors and Customers are solely responsible for their interactions between each other and any and all claims, injuries, illnesses, damages, liabilities, and costs (“Claims”) suffered by you, your Vendor as a result of your (or such recipient’s) interaction with a User or visit to any Vendor or from any product or service of any Vendor. You hereby release the Bookablebiz from any and all such Claims. You hereby expressly waive and relinquish all rights and benefits under that section and any law of any jurisdiction of similar effect with respect to the release of any unknown or unsuspected claims you may have against the Bookablebiz pertaining to the subject matter of this Section 9.3.</li>
                    </ul>
                </details>
                <h2>Part X - Governing Law & Arbitration.</h2>
                <details>
                    <summary>10.1. Governing Law.</summary>
                    <li>This Agreement is made under and shall be governed by and construed in accordance with the laws of the Singapore for those Users who enter into this Agreement with Bookablebiz Pte Ltd. </li>
                </details>
                <details>
                    <summary>10.2. Arbitration.</summary>
                    <ul>
                        <li>Any dispute arising out of or in connection with this contract, including any question regarding its existence, validity or termination, shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre (SIAC) in accordance with the Arbitration Rules of the Singapore International Arbitration Centre (SIAC Rules) for the time being in force, which rules are deemed to be incorporated by reference in this clause.</li>

                        <li>The seat of the arbitration shall be Singapore and the language of the arbitration shall be in English.</li>

                        <li>In respect of any court proceedings in Singapore commenced under the International Arbitration Act 1994 in relation to the arbitration, the parties agree (a) to commence such proceedings before the Singapore International Commercial Court (the SICC); and (b) in any event, that such proceedings shall be heard and adjudicated by the SICC.</li>
                    </ul>
                </details>

                <h2>Part XI – Miscellaneous.</h2>
                <details>
                    <summary>11.1. Customer Service.</summary>

                    <li>Should you have any questions, comments or concerns regarding the Services, customer service may be contacted at any time at: Support@bookablebiz.com for customers or Vendorhelp@bookablebiz.com for Vendors.</li>
                </details>
                <details>
                    <summary>11.2. Affiliate Disclosure.</summary>
                    <ul>
                        <li>Bookablebiz may from time to time have an affiliate relationship with third-parties and other affiliates to whose products and/or services we link and promote through the Services. Because of this relationship, we may earn a commission on products purchased by a User from a third-party affiliate or partnership. Such affiliate relationship with third-parties will be at the sole and exclusivediscretion of Bookablebiz.</li>
                    </ul>
                </details>
                <details>
                    <summary>11.3. Authority</summary>
                    <ul>
                        <li>Each Party represents and warrants to the other that it has full power and authority to enter into this Agreement and that it is binding upon such Party and enforceable in accordance with its Terms.</li>
                    </ul>
                </details>
                <details>
                    <summary>11.4. Waiver.</summary>
                    <ul>
                        <li>Any waiver of any rights under these Terms of Use shall only be effective if agreed or declared in writing. A delay in exercising a right or the non-exercise of a right shall not be deemed a waiver and shall not prevent a party from exercising that right in the future. The rights and remedies herein provided are cumulative and not exclusive of any rights and remedies provided by applicable law</li>
                    </ul>
                </details>
                <details>
                    <summary>11.5. Force Majeure.</summary>
                    <ul>
                        <li>We shall not be bound to meet any obligation if prevented from doing so as a consequence of acts of God or force majeure, including but not limited to measures taken or imposed by any government or public authority or in case of any other event beyond the control of us, including but not limited to natural disasters (such as a storm, hurricane, fire, flood, earthquake), war, civil unrest, terrorist activities, states of emergency, government sanctions, embargos, nationalizations, strikes and breakdowns of public utilities (such as electricity or telecommunication services). We shall use all reasonable efforts to notify you of the circumstances causing the delay and to resume performance as soon as possible, both without undue delay.</li>
                    </ul>
                </details>
                <details>
                    <summary>11.6. Assignment.</summary>
                    <ul>
                        <li>This Agreement and the rights granted, and obligations undertaken hereunder may not be transferred, assigned, or delegated in any manner by User, but may be freely transferred, assigned, or delegated by Bookablebiz</li>
                    </ul>
                </details>
                <details>
                    <summary>11.7. Rights of Third Parties.</summary>
                    <ul>
                        <li>These Terms do not give any right to any third party unless explicitly stated herein.</li>
                    </ul>
                </details>
                <details>
                    <summary>11.8. Relationship of the Parties.</summary>
                    <ul>
                        <li>The parties are independent contractors under these Terms, and nothing herein shall be construed to create a partnership, joint venture, or agency relationship between them. Neither party has authority to enter into terms of any kind in the name of the other party or of any third- party that may have a right pursuant to these Terms.</li>
                    </ul>
                </details>
                <details>
                    <summary>11.9. Severability.</summary>
                    <ul>
                        <li>If any part of this Agreement is determined to be invalid or unenforceable by applicable law, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that most closely matches the intent of the original provision and the remainder of this Agreement will continue in effect.</li>
                    </ul>
                </details>
                <details>
                    <summary>11.10. Notices.</summary>
                    <ul>
                        <li>Except as explicitly stated otherwise, any notices shall be given by postal mail to Bookablebiz Pte Ltdat registered address: 8 Temasek Boulevard, Suntec Tower 3, #42-01, Singapore 038968, and in the case of any User, to the email address you provide to us (either during the registration process or when your email address changes).</li>

                        <li>Notice shall be deemed given twenty-four (24) hours after email is sent, unless the sending party is notified that the email address is invalid. Alternatively, we may give you notice by certified mail, postage prepaid and return receipt requested, to the address provided to us upon Account registration. In such case, notice shall be deemed given three (3) calendar days after the date of mailing.</li>
                    </ul>
                </details>
                <details>
                    <summary>11.11. Effective Date.</summary>
                    <ul>
                        <li>From time to time, we may update these Terms of Use by prominently posting a notice of update to the Web site, by pushing a notice to registered Users of our Bookablebiz Platform, and/or by contacting you at the email you provided upon registration, so we encourage you to review them often.</li>
                    </ul>
                </details>
            </section>
            </div>
        </Fragment>
    );
};
export default Index;