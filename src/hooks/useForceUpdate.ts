import React, { useState } from 'react';

const useForceUpdate = () => {
    const [force, setForce] = useState(0);
    return () => setForce(force + 1);
}

export default useForceUpdate;
