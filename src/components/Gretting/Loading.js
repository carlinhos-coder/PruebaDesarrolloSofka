import React from 'react';
import { Spinner } from 'reactstrap';

export const Loading = () => {
    return <div>
        <div className='fatherLoading'>
            <div className='sonLoading'>
                <Spinner color="primary" className='spinner' />
            </div>
        </div>
    </div>;
};
