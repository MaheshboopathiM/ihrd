import React, { useState } from 'react'

function Loader({ loader }) {
    // const [height, setHeight] = useState(window.innerHeight);
    return (
        <>
            {loader &&
                <div style={{ height: '100%', width: '100%', position:'fixed', background: 'none', display: "flex", justifyContent: 'center', flexDirection: 'column-reverse', alignItems: 'center', zIndex: '9999999999' }}>
                    <div class="loader">
                        <div class="loader-circle"></div>
                        <span class="loader-text">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Loader;