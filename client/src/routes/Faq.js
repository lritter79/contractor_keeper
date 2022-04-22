import React from 'react';
import Faqs from '../data/Faqs'

const Faq = () => {
    return ( <div>
        <h3>
            FAQs
        </h3>
        {Faqs.map((faq, i) => {
            return <div key={i}>
                <h1>{faq.q}</h1>
                <p>{faq.a}</p>
            </div>
        })}
    </div> );
}
 
export default Faq;