import React from "react";

const components = (props) => (
    <div>
        <div>
            <img 
                style={{
                    opacity: props.isCurrentArme ? "1" : "0.5",
                    cursor:"pointer"
                }}
                src={props.imageArme}
                alt={props.children}
                onClick={props.clic}
            />
        </div>
        <div>
            {props.children}
        </div>
    </div>
);

export default components;