import View from '../components/View';
import React, { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <View />
        </Suspense>
    )
}
