import React from 'react';
import { assets } from '../../assets/assets'
const OurPolicy = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gxs:grid-cols-2 xxs:grid-cols-2 ap-12 sm:gap-4 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div>
                <img
                    src={assets.changeproduct}
                    className='w-8 sm:w-10 md:w-12 m-auto mb-3 sm:mb-4 md:mb-5' // Responsive classes for width and margin
                    alt="Easy Exchange Policy Icon"
                />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer hassle-free exchange policy</p>
            </div>
            <div>
                <img
                    src={assets.quanlity}
                    className='w-8 sm:w-10 md:w-12 m-auto mb-3 sm:mb-4 md:mb-5'
                    alt="7 Days Return Policy Icon"
                />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>We offer 7 days free return policy</p>
            </div>
            <div>
                <img
                    src={assets.fastship}
                    className='w-8 sm:w-10 md:w-12 m-auto mb-3 sm:mb-4 md:mb-5'
                    alt="Best Customer Support Icon"
                />
                <p className='font-semibold'>Delivery to your door</p>
                <p className='text-gray-400'>In 63 provinces and cities</p>
            </div>
            <div>
                <img
                    src={assets.highbrand}
                    className='w-8 sm:w-10 md:w-12 m-auto mb-3 sm:mb-4 md:mb-5'
                    alt="Easy Exchange Policy Icon"
                />
                <p className='font-semibold'>Quality products</p>
                <p className='text-gray-400'>Guaranteed compatibility and high durability</p>
            </div>
        </div>
    );
}

export default OurPolicy;
