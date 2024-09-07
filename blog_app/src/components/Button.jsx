import React from 'react'
// import '../styles/auth.css'

const Button = ({ onClick = () => { }, type = 'button', className = 'text-capitalize', loading = false, variant = 'default', text = 'button', size = 'md', ripple = 'ripple ripple-surface ripple-surface', rippleColor = 'light' }) => {
    return (
        <>

            <button onClick={onClick} type={type} data-mdb-init data-mdb-ripple-color="#fff" className={`${ripple}-${rippleColor} btn btn-${variant} btn-${size ?? 'md'} ` + className}>
                {loading &&
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                }
                {text}
            </button>
        </>
    )
}
export default Button;
