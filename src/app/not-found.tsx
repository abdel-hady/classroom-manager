'use client';

import LinkStandardBtn from '@/components/LinkStandardBtn';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
    return (
        <div className="min-h-[250px] md:min-h-[500px] bg-white border-2 border-gray-200 rounded-lg grid items-center justify-center">
            <div className="w-[250px] md:w-[400px] mx-auto text-center">
                <Image
                    src="/assets/images/404.svg"
                    width="1000"
                    height="1000"
                    alt="no data"
                    className="w-full"
                />
                <h3 className="text-4xl mt-5 text-secondaryColor">
                    {'not_found'}
                </h3>
                <div className="mt-4">
                    <LinkStandardBtn text={'Home'} href={'/'} />
                </div>
            </div>
        </div>
    );
}
