import * as React from 'react';
const Header = React.lazy(() => import('header/header'));

const Host = () => (
    <div>
        <React.Suspense fallback="Loading...">
            <div>
                <Header />
            </div>
        </React.Suspense>
    </div>
);

export default Host;