import View from '../components/View';
import React, { Suspense } from 'react';
import Provider from '@/components/Provider';

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Provider />
        </Suspense>
    )
}
